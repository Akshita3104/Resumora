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

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.');
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
      const response = await fetch('https://resumora.onrender.com/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze resume');
      }

      const data = await response.json();
      console.log('Received full_feedback:', data.full_feedback);
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

  const formatFeedback = (content, isKeyFindings = false) => {
    if (!content) return ['No data available. Please check the resume content or try again.'];
    let num = 1;
    if (isKeyFindings) {
      return [content.replace(/\n/g, ' ').trim()];
    }
    return content
      .split('\n')
      .map((line) => {
        line = line.trim();
        if (line.startsWith('#####') && line.includes(':')) {
          return null; // Skip headers
        } else if (line) {
          const text = line.replace(/^\*|\d+\.\s*/, '').trim().replace(/\*\*(.*?)\*\*/, '$1');
          return text ? `${num++}. ${text}` : null;
        }
        return null;
      })
      .filter((line) => line !== null);
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">ATS Resume Checker</h1>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6 mb-8">
          <h3 className="flex items-center gap-3 text-xl font-semibold text-gray-800 dark:text-white mb-6">
            <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Upload Your Resume
          </h3>
          <div className="space-y-6">
            <div className="border-2 border-dashed border-blue-200 dark:border-blue-700 rounded-xl p-8 text-center bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileUpload}
                className="hidden"
              />
              <FileText className="w-16 h-16 text-blue-400 dark:text-blue-300 mx-auto mb-4" />
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
                {uploadedFile ? `Selected: ${uploadedFile.name}` : 'Upload your resume (.pdf, .docx)'}
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md transition-all flex items-center gap-2 mx-auto"
              >
                <Upload className="w-5 h-5" />
                Choose File
              </button>
            </div>

            <div className="space-y-4">
              <label className="text-base font-medium text-gray-700 dark:text-gray-300">Job Description (Optional)</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to match your resume against it..."
                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              />
            </div>

            {uploadedFile && (
              <div className="text-center">
                <button
                  onClick={analyzeResume}
                  disabled={isAnalyzing}
                  className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md transition-all flex items-center gap-2 mx-auto disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800 dark:disabled:bg-gray-600"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-5 h-5" />
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
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">ATS Analysis Results</h3>
              <button
                onClick={saveResult}
                className="px-4 py-2 border border-blue-300 text-blue-600 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg flex items-center gap-2 transition-all text-base font-medium"
              >
                <Save className="w-5 h-5" />
                Save Result
              </button>
            </div>
            <div className="space-y-6">
              {/* Score Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg text-center shadow-md">
                <div className={`text-3xl font-semibold ${getScoreColor(currentResult.score)} mb-2`}>
                  {currentResult.score}%
                </div>
                <span className={`px-2 py-1 rounded-md text-base font-medium border ${getScoreColor(currentResult.score)} bg-white dark:bg-gray-800`}>
                  {getScoreLabel(currentResult.score)}
                </span>
                <div className="mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-500"
                    style={{ width: `${currentResult.score}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Analyzed on: {currentResult.date}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">File: {currentResult.fileName}</p>
              </div>

              {/* Full Feedback Sections */}
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-md">
                <div
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleCollapse('resumeAnalysis')}
                >
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Resume Analysis</h4>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform ${
                      isCollapsed.resumeAnalysis ? '' : 'rotate-180'
                    }`}
                  />
                </div>
                {!isCollapsed.resumeAnalysis && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(() => {
                      try {
                        const feedbackObj = JSON.parse(currentResult.fullFeedback);
                        const sections = Object.entries(feedbackObj.section_tabs || {}).map(([key, value]) => ({
                          title: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                          score: value.score || 0,
                          status: value.status || getScoreLabel(value.score) || 'N/A',
                          suggestions: value.suggestions || [],
                          remarks: value.remarks || 'No remarks available.',
                          keywords: value.keywords || currentResult.keywords || [],
                          missingKeywords: value.missing_keywords || currentResult.missingKeywords || [],
                          subDomain: value.sub_domain || currentResult.subDomain || 'Unknown',
                          metrics: value.metrics || currentResult.metrics[key] || {},
                        }));
                        if (!sections.every(s => s.status !== 'N/A')) {
                          console.warn('Missing status in some sections:', sections.filter(s => s.status === 'N/A').map(s => s.title));
                        }
                        return sections.length > 0 ? (
                          sections.map((section, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md">
                              <h5 className="text-lg font-medium mb-3 bg-blue-200 dark:bg-blue-900/50 p-3 rounded-t-md text-blue-800 dark:text-blue-300">
                                {section.title}
                              </h5>
                              <div className="space-y-2 text-sm">
                                {currentResult.sectionScores[section.title.toLowerCase().replace(/\s/g, '_')] && (
                                  <div className="flex items-center">
                                    <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Score:</span>
                                    <span className={`${getScoreColor(section.score)} font-medium`}>{section.score}%</span>
                                  </div>
                                )}
                                <div className="flex items-center">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Status:</span>
                                  <span className={`${getScoreColor(section.score)} font-medium`}>{section.status}</span>
                                </div>
                                {section.suggestions.length > 0 && (
                                  <div className="flex items-start">
                                    <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Suggestions:</span>
                                    <div className="flex-1">
                                      {section.suggestions.map((suggestion, sIndex) => (
                                        <p key={sIndex} className="text-gray-700 dark:text-gray-300">{suggestion}</p>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {section.title === 'Skills' && section.keywords.length > 0 && (
                                  <div className="flex items-center">
                                    <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Keywords Found:</span>
                                    <p className="text-gray-700 dark:text-gray-300">{section.keywords.join(', ')}</p>
                                  </div>
                                )}
                                {section.title === 'Skills' && section.missingKeywords.length > 0 && (
                                  <div className="flex items-center">
                                    <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Missing Keywords:</span>
                                    <p className="text-gray-700 dark:text-gray-300">{section.missingKeywords.join(', ')}</p>
                                  </div>
                                )}
                                {section.subDomain !== 'Unknown' && (
                                  <div className="flex items-center">
                                    <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Sub Domain:</span>
                                    <span className="text-gray-700 dark:text-gray-300">{section.subDomain}</span>
                                  </div>
                                )}
                                {Object.keys(section.metrics).length > 0 && (
                                  <div className="flex flex-col">
                                    <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Metrics:</span>
                                    <ul className="list-disc ml-36">
                                      {Object.entries(section.metrics).map(([key, value], mIndex) => (
                                        <li key={mIndex} className="text-gray-700 dark:text-gray-300">
                                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {value}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {section.remarks && (
                                  <div className="flex items-start">
                                    <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Key Findings:</span>
                                    <div className="flex-1">
                                      {formatFeedback(section.remarks, true).map((remark, rIndex) => (
                                        <p key={rIndex} className="mb-1 text-gray-700 dark:text-gray-300">{remark}</p>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                            <div className="space-y-2 text-sm">
                              <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2 inline-block">Key Findings:</span>
                              <div className="flex-1">
                                {formatFeedback('No section data available. Please check the resume content or try again.', true).map((remark, rIndex) => (
                                  <p key={rIndex} className="mb-1 text-gray-700 dark:text-gray-300">{remark}</p>
                                ))}
                              </div>
                              {currentResult.subDomain !== 'Unknown' && (
                                <div className="flex items-center">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Sub Domain:</span>
                                  <span className="text-gray-700 dark:text-gray-300">{currentResult.subDomain}</span>
                                </div>
                              )}
                              {currentResult.suggestions.length > 0 && (
                                <div className="flex items-start">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2 inline-block">Suggestions:</span>
                                  <div className="flex-1">
                                    {currentResult.suggestions.map((suggestion, index) => (
                                      <p key={index} className="text-gray-700 dark:text-gray-300">{suggestion}</p>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {currentResult.keywords.length > 0 && (
                                <div className="flex items-center">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Keywords Found:</span>
                                  <p className="text-gray-700 dark:text-gray-300">{currentResult.keywords.join(', ')}</p>
                                </div>
                              )}
                              {currentResult.missingKeywords.length > 0 && (
                                <div className="flex items-center">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Missing Keywords:</span>
                                  <p className="text-gray-700 dark:text-gray-300">{currentResult.missingKeywords.join(', ')}</p>
                                </div>
                              )}
                              {Object.keys(currentResult.metrics).length > 0 && (
                                <div className="flex flex-col">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2 inline-block">Metrics:</span>
                                  <ul className="list-disc ml-36">
                                    {Object.entries(currentResult.metrics).map(([key, value], index) => (
                                      <li key={index} className="text-gray-700 dark:text-gray-300">
                                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {value}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      } catch (error) {
                        console.error('Error parsing full_feedback:', error);
                        return (
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                            <div className="space-y-2 text-sm">
                              <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2 inline-block">Key Findings:</span>
                              <div className="flex-1">
                                {formatFeedback('Error processing feedback. Please try again.', true).map((remark, rIndex) => (
                                  <p key={rIndex} className="mb-1 text-gray-700 dark:text-gray-300">{remark}</p>
                                ))}
                              </div>
                              {currentResult.subDomain !== 'Unknown' && (
                                <div className="flex items-center">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Sub Domain:</span>
                                  <span className="text-gray-700 dark:text-gray-300">{currentResult.subDomain}</span>
                                </div>
                              )}
                              {currentResult.suggestions.length > 0 && (
                                <div className="flex items-start">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2 inline-block">Suggestions:</span>
                                  <div className="flex-1">
                                    {currentResult.suggestions.map((suggestion, index) => (
                                      <p key={index} className="text-gray-700 dark:text-gray-300">{suggestion}</p>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {currentResult.keywords.length > 0 && (
                                <div className="flex items-center">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Keywords Found:</span>
                                  <p className="text-gray-700 dark:text-gray-300">{currentResult.keywords.join(', ')}</p>
                                </div>
                              )}
                              {currentResult.missingKeywords.length > 0 && (
                                <div className="flex items-center">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2">Missing Keywords:</span>
                                  <p className="text-gray-700 dark:text-gray-300">{currentResult.missingKeywords.join(', ')}</p>
                                </div>
                              )}
                              {Object.keys(currentResult.metrics).length > 0 && (
                                <div className="flex flex-col">
                                  <span className="font-medium w-32 text-gray-700 dark:text-gray-300 pr-2 inline-block">Metrics:</span>
                                  <ul className="list-disc ml-36">
                                    {Object.entries(currentResult.metrics).map(([key, value], index) => (
                                      <li key={index} className="text-gray-700 dark:text-gray-300">
                                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {value}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        {savedResults.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Saved Results History</h3>
            </div>
            <div className="space-y-4">
              {savedResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-900 dark:text-white">{result.fileName}</span>
                      <span className={`px-3 py-1 rounded-lg text-sm ${getScoreColor(result.score)} bg-white dark:bg-gray-800 shadow-sm`}>
                        {result.score}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{result.date}</p>
                  </div>
                  <button
                    onClick={() => deleteResult(result.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
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
    </div>
  );
};