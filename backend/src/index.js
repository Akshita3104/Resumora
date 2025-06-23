const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const cors = require('cors');
const { Groq } = require('groq-sdk');
require('dotenv').config();
const crypto = require('crypto');
const { buildPrompt } = require('./prompt');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory cache (persistent until server restart)
const cache = new Map();

// Multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF or DOCX allowed.'));
    }
  },
});

// GROQ client
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

if (!process.env.GROQ_API_KEY) {
  console.error('GROQ_API_KEY not set');
  process.exit(1);
}

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '1mb' }));

app.post('/analyze-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    // Extract text based on file type
    let resumeText = '';
    if (req.file.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(req.file.buffer);
      resumeText = pdfData.text.trim();
    } else {
      const { value } = await mammoth.extractRawText({ buffer: req.file.buffer });
      resumeText = value.trim();
    }

    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text could not be extracted' });
    }

    // Get job description (optional)
    const jobDescription = req.body.jobDescription || '';

    // Cache key
    const cacheKey = crypto
      .createHash('sha256')
      .update(resumeText + jobDescription)
      .digest('hex');
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const prompt = buildPrompt(resumeText, jobDescription);

    const completion = await client.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 8192,
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const content = JSON.parse(completion.choices[0].message.content.trim());

    // Structure response for frontend
    const response = {
      score: content.final_score?.score || 0,
      suggestions: content.overall_suggestions || [],
      keywords: content.keywords_analysis?.found_keywords?.split(',').map(k => k.trim()) || [],
      missing_keywords: content.keywords_analysis?.missing_keywords?.split(',').map(k => k.trim()) || [],
      full_feedback: JSON.stringify(content, null, 2),
      sub_domain: content.summary_metrics?.detected_sub_domain || 'Unknown',
      metrics: content.summary_metrics || {},
      section_scores: {
        format: content.section_tabs?.resume_format?.score || 0,
        contact: content.section_tabs?.contact_information?.score || 0,
        skills: content.section_tabs?.skills?.score || 0,
        experience: content.section_tabs?.work_experience?.score || 0,
        achievements: content.section_tabs?.quantifiable_achievements?.score || 0,
        education: content.section_tabs?.education?.present ? 85 : 0,
        certifications: content.section_tabs?.certifications?.present ? 85 : 0,
        projects: content.section_tabs?.projects?.score || 0,
        extracurriculars: content.section_tabs?.extracurriculars?.score || 0,
        formatting: content.section_tabs?.formatting_visual_design?.score || 0,
      },
    };

    // Store in cache (no expiration)
    cache.set(cacheKey, response);

    res.json(response);
  } catch (err) {
    console.error(`Error analyzing resume: ${err.message}`);
    res.status(500).json({ error: 'Failed to analyze resume', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});