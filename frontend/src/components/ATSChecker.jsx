import { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Target, Save, History, Trash2, ChevronDown } from 'lucide-react';

export const ATSChecker = ({ resumeData, onScoreUpdate }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [savedResults, setSavedResults] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [isCollapsed, setIsCollapsed] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedScores = localStorage.getItem('atsResults');
    if (savedScores) {
      try {
        const parsedResults = JSON.parse(savedScores);
        setSavedResults(parsedResults);
      } catch (error) {
        console.error('Error loading saved ATS results:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('atsResults', JSON.stringify(savedResults));
  }, [savedResults]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.type;
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(fileType)) {
      alert('Please upload a PDF or DOCX document (.pdf, .docx)');
      return;
    }

    setUploadedFile(file);
    setCurrentResult(null);
  };

  const analyzeResume = async () => {
    if (!uploadedFile) {
      alert('Please upload a resume file first.');
      return;
    }

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append('resume', uploadedFile);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }

    try {
      const response = await fetch('http://localhost:5000/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze resume');
      }

      const data = await response.json();
      const result = {
        id: Date.now().toString(),
        fileName: uploadedFile.name,
        score: data.score || 0,
        date: new Date().toLocaleDateString(),
        suggestions: data.suggestions || [],
        keywords: data.keywords || [],
        missingKeywords: data.missing_keywords || [],
        subDomain: data.sub_domain || 'Unknown',
        metrics: data.metrics || {},
        sectionScores: data.section_scores || {},
        fullFeedback: data.full_feedback || '{}',
      };

      setCurrentResult(result);
      onScoreUpdate(result.score);
    } catch (error) {
      console.error('Error analyzing resume:', error.message);
      alert(`Failed to analyze resume: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveResult = () => {
    if (currentResult) {
      setSavedResults((prev) => [currentResult, ...prev]);
      alert('ATS score saved successfully!');
    }
  };

  const deleteResult = (id) => {
    setSavedResults((prev) => prev.filter((result) => result.id !== id));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const toggleCollapse = (section) => {
    setIsCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Function to convert asterisk bullets to numbered bullets
  const formatFeedback = (feedback) => {
    if (!feedback) return 'No data available';
    const lines = feedback.split('\n');
    let num = 1;
    return lines.map(line => {
      if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
        return line; // Keep section headers as is
      } else if (line.trim().startsWith('*')) {
        const formattedLine = line.replace('*', `${num}.`).trim();
        num++;
        return formattedLine;
      }
      return line.trim();
    }).join('\n');
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-2">
        <Target className="w-6 h-6 text-orange-500" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ATS Resume Checker</h2>
      </div>

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="p-6">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
            <Upload className="w-6 h-6" />
            Upload Your Resume
          </h3>
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileUpload}
              className="hidden"
            />
            <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
            <p className="text-gray-900 dark:text-white mb-4">
              {uploadedFile ? `Selected: ${uploadedFile.name}` : 'Upload your resume (.pdf, .docx)'}
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow-md transition-colors flex items-center gap-2 mx-auto"
            >
              <Upload className="w-4 h-4" />
              Choose File
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Description (Optional)</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to match your resume against it..."
              className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 resize-y"
            />
          </div>

          {uploadedFile && (
            <div className="flex justify-center">
              <button
                onClick={analyzeResume}
                disabled={isAnalyzing}
                className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow-md transition-colors flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-gray-600"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4" />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {currentResult && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">ATS Analysis Results</h3>
              <button
                onClick={saveResult}
                className="px-4 py-2 border border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-900/10 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Result
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* Score Card */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
              <div className={`text-4xl font-bold ${getScoreColor(currentResult.score)} mb-2`}>
                {currentResult.score}%
              </div>
              <span className={`px-3 py-1 rounded text-base font-medium border ${getScoreColor(currentResult.score)}`}>
                {getScoreLabel(currentResult.score)}
              </span>
              <div className="mt-4 bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${currentResult.score}%` }}
                />
              </div>
            </div>

            {/* Full Feedback Sections */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleCollapse('resumeAnalysis')}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Resume Analysis</h4>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform ${
                    isCollapsed.resumeAnalysis ? '' : 'rotate-180'
                  }`}
                />
              </div>
              {!isCollapsed.resumeAnalysis && (
                <div className="mt-2 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  {currentResult.fullFeedback.match(/^\*\*Resume Analysis\*\*/m)?.input?.split('\n')?.slice(1).join('\n').split('**').map((section, index) => {
                    if (section.trim()) {
                      const [title, content] = section.split('\n', 1)[0] ? [section.split('\n', 1)[0].trim(), section.split('\n').slice(1).join('\n').trim()] : ['', section.trim()];
                      return (
                        <div key={index} className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
                          {title && <h5 className="text-md font-semibold mb-2">{title}</h5>}
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-auto text-left whitespace-pre-wrap">
                            {formatFeedback(content || 'No data available')}
                          </pre>
                        </div>
                      );
                    }
                    return null;
                  }) || <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-auto text-left">No data available</pre>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* History Section */}
      {savedResults.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
              <History className="w-6 h-6" />
              Saved Results History
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {savedResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900 dark:text-white">{result.fileName}</span>
                    <span className={`px-2 py-1 rounded text-sm ${getScoreColor(result.score)}`}>
                      {result.score}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{result.date}</p>
                </div>
                <button
                  onClick={() => deleteResult(result.id)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={`Delete ${result.fileName}`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};