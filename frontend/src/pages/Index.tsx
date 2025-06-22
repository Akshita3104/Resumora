import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { ResumePreview } from '@/components/ResumePreview';
import { ATSChecker } from '@/components/ATSChecker';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Edit, Eye, Download, Target } from 'lucide-react';

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    profileImage?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
    links: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    marks: string;
    year: string;
  }>;
  skills: Array<{
    id: string;
    category: string;
    items: string[];
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
    links: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    image?: string;
    links: string[];
  }>;
  awards: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
    links: string[];
  }>;
  customSections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  sectionOrder: string[];
  enabledSections: Record<string, boolean>;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('build');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev',
    },
    summary: 'Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about creating scalable solutions and mentoring junior developers.',
    experience: [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        location: 'New York, NY',
        startDate: '2022-01',
        endDate: '',
        current: true,
        description: 'Lead development of web applications using React and Node.js',
        achievements: [
          'Increased application performance by 40%',
          'Led a team of 5 developers',
          'Implemented CI/CD pipelines'
        ],
        links: ['https://techsolutions.com', 'https://github.com/johndoe/project1']
      },
      {
        id: '2',
        title: 'Software Developer',
        company: 'StartupXYZ',
        location: 'San Francisco, CA',
        startDate: '2019-06',
        endDate: '2021-12',
        current: false,
        description: 'Developed and maintained multiple web applications',
        achievements: [
          'Built 3 major features from scratch',
          'Reduced bugs by 30%'
        ],
        links: ['https://startupxyz.com']
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        location: 'Boston, MA',
        startDate: '2015-09',
        endDate: '2019-05',
        gpa: '3.8',
        marks: '85%',
        year: '2019'
      }
    ],
    skills: [
      {
        id: '1',
        category: 'Programming Languages',
        items: ['JavaScript', 'TypeScript', 'Python', 'Java']
      },
      {
        id: '2',
        category: 'Frameworks & Libraries',
        items: ['React', 'Node.js', 'Express', 'Django']
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-03',
        url: 'https://aws.amazon.com',
        links: ['https://credly.com/badge123', 'https://verify.aws.com/cert456']
      }
    ],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce application with payment integration',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        url: 'https://ecommerce-demo.com',
        links: ['https://github.com/johndoe/ecommerce', 'https://demo.ecommerce.com']
      }
    ],
    awards: [
      {
        id: '1',
        title: 'Employee of the Year',
        issuer: 'Tech Solutions Inc.',
        date: '2023-12',
        description: 'Recognized for outstanding performance and leadership',
        links: ['https://techsolutions.com/awards']
      }
    ],
    customSections: [],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'awards'],
    enabledSections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      awards: true,
    },
  });

  const [atsScore, setAtsScore] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ATS-Optimized Resume Builder
              </h1>
              <p className="text-muted-foreground mt-2">
                Create a resume that passes ATS screening and impresses recruiters
              </p>
            </div>
            <div className="flex gap-3 items-center animate-slide-in-right">
              <ThemeToggle />
              <Button 
                variant="outline" 
                className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted border border-border mb-8">
            <TabsTrigger 
              value="build" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/20"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Resume
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all duration-300 hover:bg-secondary/20"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger 
              value="ats" 
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all duration-300 hover:bg-accent/20"
            >
              <Target className="w-4 h-4 mr-2" />
              ATS Check
            </TabsTrigger>
          </TabsList>

          <TabsContent value="build" className="mt-0">
            <Card className="bg-card border-border backdrop-blur-sm animate-fade-in-up">
              <ResumeBuilder 
                resumeData={resumeData} 
                setResumeData={setResumeData} 
              />
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <Card className="bg-card border-border backdrop-blur-sm max-w-4xl mx-auto animate-fade-in-up">
              <ResumePreview resumeData={resumeData} fullScreen />
            </Card>
          </TabsContent>

          <TabsContent value="ats" className="mt-0">
            <Card className="bg-card border-border backdrop-blur-sm animate-fade-in-up">
              <ATSChecker 
                resumeData={resumeData} 
                onScoreUpdate={setAtsScore} 
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
