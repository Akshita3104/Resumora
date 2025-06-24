import { useState, useEffect } from 'react';
import { ResumeBuilder } from '../components/ResumeBuilder';
import ResumePreview from '../components/ResumePreview';
import { ATSChecker } from '../components/ATSChecker';
import { Edit, Eye, Target, Sun, Moon } from 'lucide-react';

const defaultResumeData = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.dev',
    profileImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQCg8N...[base64 data]',
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
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('build');
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setResumeData(parsedData);
      } catch (error) {
        console.error('Error loading saved resume data:', error);
      }
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ATS-Optimized Resume Builder
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Create a resume that passes ATS screening and impresses recruiters
              </p>
            </div>
            <div className="flex gap-3 items-center animate-slide-in-right">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-purple-600 hover:text-white transition-all duration-300"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="w-full">
          <div className="flex bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mb-8">
            <button
              onClick={() => setActiveTab('build')}
              className={`flex-1 px-6 py-3 text-sm font-medium rounded-l-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'build'
                  ? 'bg-purple-200 text-purple-900 dark:bg-purple-600 dark:text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-600/20'
              }`}
            >
              <Edit className="w-4 h-4" />
              Edit Resume
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'preview'
                  ? 'bg-purple-200 text-purple-900 dark:bg-purple-600 dark:text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-600/20'
              }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('ats')}
              className={`flex-1 px-6 py-3 text-sm font-medium rounded-r-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'ats'
                  ? 'bg-purple-200 text-purple-900 dark:bg-purple-600 dark:text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-600/20'
              }`}
            >
              <Target className="w-4 h-4" />
              ATS Check
            </button>
          </div>

          {activeTab === 'build' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg animate-fade-in">
              <ResumeBuilder resumeData={resumeData} setResumeData={setResumeData} />
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-4xl mx-auto animate-fade-in">
              <ResumePreview resumeData={resumeData} fullScreen />
            </div>
          )}

          {activeTab === 'ats' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg animate-fade-in">
              <ATSChecker resumeData={resumeData} onScoreUpdate={() => {}} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;