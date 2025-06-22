import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Target, Save, History, Trash2 } from "lucide-react";
import { ResumeData } from "@/pages/Index";

interface ATSCheckerProps {
  resumeData: ResumeData;
  onScoreUpdate: (score: number) => void;
}

interface ATSResult {
  id: string;
  fileName: string;
  score: number;
  date: string;
  suggestions: string[];
  keywords: string[];
  missingKeywords: string[];
}

export const ATSChecker = ({ resumeData, onScoreUpdate }: ATSCheckerProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<ATSResult | null>(null);
  const [savedResults, setSavedResults] = useState<ATSResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      setCurrentResult(null);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const analyzeResume = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("resume", uploadedFile);

    try {
      const response = await fetch("http://localhost:5000/analyze-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      const result: ATSResult = {
        id: Date.now().toString(),
        fileName: uploadedFile.name,
        score: data.score || 60,
        date: new Date().toLocaleDateString(),
        suggestions: data.suggestions?.length
          ? data.suggestions
          : ["Could not extract suggestions"],
        keywords: data.keywords || [],
        missingKeywords: data.missing_keywords || [],
      };

      setCurrentResult(result);
      onScoreUpdate(result.score);
    } catch (error) {
      alert("Failed to analyze resume. Please try again.");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveResult = () => {
    if (currentResult) {
      setSavedResults((prev) => [currentResult, ...prev]);
      alert("ATS score saved successfully!");
    }
  };

  const deleteResult = (id: string) => {
    setSavedResults((prev) => prev.filter((result) => result.id !== id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          ATS Resume Checker
        </h2>
      </div>

      {/* Upload Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Upload className="w-5 h-5" />
            Upload Your Resume
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground mb-4">
              {uploadedFile
                ? `Selected: ${uploadedFile.name}`
                : "Upload your resume (PDF format)"}
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>

          {uploadedFile && (
            <div className="flex justify-center">
              <Button
                onClick={analyzeResume}
                disabled={isAnalyzing}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 mr-2" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {currentResult && (
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-foreground">
                ATS Analysis Results
              </CardTitle>
              <Button
                onClick={saveResult}
                variant="outline"
                className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Result
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="text-center">
              <div
                className={`text-4xl font-bold mb-2 ${getScoreColor(
                  currentResult.score
                )}`}
              >
                {currentResult.score}%
              </div>
              <Badge
                variant="outline"
                className={getScoreColor(currentResult.score)}
              >
                {getScoreLabel(currentResult.score)}
              </Badge>
              <div className="mt-4">
                <Progress value={currentResult.score} className="h-3" />
              </div>
            </div>

            {/* Keywords Found */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Keywords Found
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentResult.keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            {currentResult.missingKeywords.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Suggested Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentResult.missingKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-orange-300 text-orange-600"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Improvement Suggestions
              </h3>
              <ul className="space-y-2">
                {currentResult.suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History Section */}
      {savedResults.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <History className="w-5 h-5" />
              Saved Results History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-foreground">
                        {result.fileName}
                      </span>
                      <Badge
                        variant="outline"
                        className={getScoreColor(result.score)}
                      >
                        {result.score}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.date}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteResult(result.id)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
