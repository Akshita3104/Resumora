const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const { Groq } = require('groq-sdk');
require('dotenv').config();

const { buildPrompt } = require('./prompt');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Store file in memory instead of writing to disk
const upload = multer({ storage: multer.memoryStorage() });

// GROQ client
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

if (!process.env.GROQ_API_KEY) {
  console.error('❌ GROQ_API_KEY is not set in .env');
  process.exit(1);
}

app.post('/analyze-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text.trim();

    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text could not be extracted' });
    }

    const prompt = buildPrompt(resumeText);

    const completion = await client.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4096,
      temperature: 0.5
    });

    const content = completion.choices[0].message.content.trim();

    // === Utility extractors ===
    const extractScore = () => {
      const match = content.match(/(\d{2,3})\s*\/\s*100/i);
      return match ? parseInt(match[1]) : 60;
    };

    const extractList = (label) => {
      const match = content.match(new RegExp(`${label}[:\\-]?\\s*([\\s\\S]*?)(\\n\\n|$)`, 'i'));
      if (!match) return [];
      return match[1]
        .split(/[-•]/)
        .map(line => line.trim())
        .filter(line => line.length > 2);
    };

    const extractKeywords = (label) => {
      const match = content.match(new RegExp(`${label}[:\\-]?\\s*(.*?)\\n`, 'i'));
      if (!match) return [];
      return match[1]
        .split(/,|\n/)
        .map(k => k.trim())
        .filter(k => k.length > 0);
    };

    // === Extracted Output ===
    const score = extractScore();
    const suggestions = extractList('Suggestions');
    const keywords = extractKeywords('Found Keywords');
    const missingKeywords = extractKeywords('Missing But Expected Keywords');

    res.json({
      score,
      suggestions: suggestions.slice(0, 8),
      keywords: keywords.slice(0, 10),
      missing_keywords: missingKeywords.slice(0, 10),
      full_feedback: content
    });
  } catch (err) {
    console.error('❌ Error analyzing resume:', err.message);
    res.status(500).json({ error: 'Failed to analyze resume', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
