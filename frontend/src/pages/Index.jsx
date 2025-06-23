import { useState, useEffect } from 'react';
import { ResumeBuilder } from '../components/ResumeBuilder';
import ResumePreview from '../components/ResumePreview';
import { ATSChecker } from '../components/ATSChecker';
import { Edit, Eye, Download, Target, Sun, Moon } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const defaultResumeData = {
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
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('build');
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [isDownloading, setIsDownloading] = useState(false);
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

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '210mm';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.padding = '20mm';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '12px';
      tempDiv.style.lineHeight = '1.4';
      document.body.appendChild(tempDiv);

      const htmlContent = generatePDFContent(resumeData);
      tempDiv.innerHTML = htmlContent;

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: tempDiv.offsetWidth,
        height: tempDiv.offsetHeight
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${resumeData.personalInfo.name || 'Resume'}_Resume.pdf`);

      document.body.removeChild(tempDiv);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const generatePDFContent = (resumeData) => {
    return `
      <div style="max-width: 170mm; margin: 0 auto; color: black;">
        <div style="margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;">
          <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">
            ${resumeData.personalInfo.name || 'Your Name'}
          </h1>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; color: #666;">
            ${resumeData.personalInfo.email ? `<div>✉ ${resumeData.personalInfo.email}</div>` : ''}
            ${resumeData.personalInfo.phone ? `<div>📞 ${resumeData.personalInfo.phone}</div>` : ''}
            ${resumeData.personalInfo.location ? `<div>📍 ${resumeData.personalInfo.location}</div>` : ''}
            ${resumeData.personalInfo.linkedin ? `<div>💼 ${resumeData.personalInfo.linkedin}</div>` : ''}
            ${resumeData.personalInfo.website ? `<div style="grid-column: 1 / -1;">🌐 ${resumeData.personalInfo.website}</div>` : ''}
          </div>
        </div>

        ${resumeData.sectionOrder.map(sectionId => {
          if (!resumeData.enabledSections[sectionId]) return '';
          
          switch (sectionId) {
            case 'summary':
              return resumeData.summary ? `
                <div style="margin-bottom: 20px;">
                  <div style="border-bottom: 2px solid #333; margin-bottom: 10px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; padding: 8px 0; background: #f5f5f5; margin: 0;">
                      Professional Summary
                    </h2>
                  </div>
                  <p style="text-align: justify; line-height: 1.5; margin: 0; padding: 0 10px;">
                    ${resumeData.summary}
                  </p>
                </div>
              ` : '';

            case 'experience':
              return resumeData.experience.length > 0 ? `
                <div style="margin-bottom: 20px;">
                  <div style="border-bottom: 2px solid #333; margin-bottom: 10px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; padding: 8px 0; background: #f5f5f5; margin: 0;">
                      Work Experience
                    </h2>
                  </div>
                  <div style="padding: 0 10px;">
                    ${resumeData.experience.map(exp => `
                      <div style="margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                          <div style="flex: 1;">
                            <h3 style="font-size: 12px; font-weight: bold; text-transform: uppercase; margin: 0 0 4px 0;">${exp.title}</h3>
                            <p style="font-weight: 600; margin: 0 0 2px 0; font-size: 11px;">${exp.company}</p>
                            ${exp.location ? `<p style="color: #666; font-size: 10px; margin: 0;">${exp.location}</p>` : ''}
                          </div>
                          <span style="color: #666; font-size: 10px; font-weight: 500; margin-left: 10px;">
                            ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        ${exp.description ? `<p style="font-size: 11px; line-height: 1.4; margin: 0 0 8px 0;">${exp.description}</p>` : ''}
                        ${exp.achievements.filter(Boolean).length > 0 ? `
                          <ul style="margin: 0 0 8px 15px; padding: 0; font-size: 11px;">
                            ${exp.achievements.filter(Boolean).map(achievement => `<li style="margin-bottom: 2px;">${achievement}</li>`).join('')}
                          </ul>
                        ` : ''}
                        ${exp.links.filter(Boolean).length > 0 ? `
                          <div style="font-size: 10px;">
                            ${exp.links.filter(Boolean).map(link => `[<a href="${link}" style="color: #0066cc;">Link</a>]`).join(' ')}
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : '';

            case 'education':
              return resumeData.education.length > 0 ? `
                <div style="margin-bottom: 20px;">
                  <div style="border-bottom: 2px solid #333; margin-bottom: 10px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; padding: 8px 0; background: #f5f5f5; margin: 0;">
                      Education
                    </h2>
                  </div>
                  <div style="padding: 0 10px;">
                    ${resumeData.education.map(edu => `
                      <div style="margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                          <div style="flex: 1;">
                            <h3 style="font-size: 11px; font-weight: bold; margin: 0 0 2px 0;">${edu.degree}</h3>
                            <p style="font-weight: 600; font-size: 11px; margin: 0 0 2px 0;">${edu.school}</p>
                            ${edu.location ? `<p style="color: #666; font-size: 10px; margin: 0 0 2px 0;">${edu.location}</p>` : ''}
                            <div style="font-size: 10px; color: #666;">
                              ${edu.gpa ? `GPA: ${edu.gpa}${edu.marks ? ' | ' : ''}` : ''}
                              ${edu.marks ? `Marks: ${edu.marks}` : ''}
                            </div>
                          </div>
                          <span style="color: #666; font-size: 10px; font-weight: 500; margin-left: 10px;">
                            ${edu.year || `${edu.startDate} - ${edu.endDate}`}
                          </span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : '';

            case 'skills':
              return resumeData.skills.length > 0 ? `
                <div style="margin-bottom: 20px;">
                  <div style="border-bottom: 2px solid #333; margin-bottom: 10px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; padding: 8px 0; background: #f5f5f5; margin: 0;">
                      Skills Summary
                    </h2>
                  </div>
                  <div style="padding: 0 10px;">
                    ${resumeData.skills.map(skillCategory => `
                      <div style="margin-bottom: 8px;">
                        <span style="font-weight: bold; font-size: 11px;">• ${skillCategory.category}:</span>
                        <span style="font-size: 11px; margin-left: 5px;">${skillCategory.items.join(', ')}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : '';

            case 'projects':
              return resumeData.projects.length > 0 ? `
                <div style="margin-bottom: 20px;">
                  <div style="border-bottom: 2px solid #333; margin-bottom: 10px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; padding: 8px 0; background: #f5f5f5; margin: 0;">
                      Projects
                    </h2>
                  </div>
                  <div style="padding: 0 10px;">
                    ${resumeData.projects.map(project => `
                      <div style="margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                        <h3 style="font-size: 11px; font-weight: bold; margin: 0 0 4px 0;">${project.name}</h3>
                        <p style="font-size: 11px; line-height: 1.4; margin: 0 0 4px 0;">${project.description}</p>
                        ${project.technologies.filter(Boolean).length > 0 ? `
                          <p style="font-size: 10px; color: #666; margin: 0 0 4px 0;">
                            <strong>Technologies:</strong> ${project.technologies.filter(Boolean).join(', ')}
                          </p>
                        ` : ''}
                        ${project.links.filter(Boolean).length > 0 ? `
                          <div style="font-size: 10px;">
                            ${project.links.filter(Boolean).map(link => `[<a href="${link}" style="color: #0066cc;">Link</a>]`).join(' ')}
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : '';

            case 'certifications':
              return resumeData.certifications.length > 0 ? `
                <div style="margin-bottom: 20px;">
                  <div style="border-bottom: 2px solid #333; margin-bottom: 10px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; padding: 8px 0; background: #f5f5f5; margin: 0;">
                      Certifications
                    </h2>
                  </div>
                  <div style="padding: 0 10px;">
                    ${resumeData.certifications.map(cert => `
                      <div style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 6px;">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                          <div style="flex: 1;">
                            <h3 style="font-size: 11px; font-weight: bold; margin: 0 0 2px 0;">${cert.name}</h3>
                            <p style="font-weight: 600; font-size: 11px; margin: 0;">${cert.issuer}</p>
                          </div>
                          <span style="color: #666; font-size: 10px; font-weight: 500; margin-left: 10px;">${cert.date}</span>
                        </div>
                        ${cert.links.filter(Boolean).length > 0 ? `
                          <div style="font-size: 10px; margin-top: 4px;">
                            ${cert.links.filter(Boolean).map(link => `[<a href="${link}" style="color: #0066cc;">Link</a>]`).join(' ')}
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : '';

            case 'awards':
              return resumeData.awards.length > 0 ? `
                <div style="margin-bottom: 20px;">
                  <div style="border-bottom: 2px solid #333; margin-bottom: 10px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; padding: 8px 0; background: #f5f5f5; margin: 0;">
                      Awards & Achievements
                    </h2>
                  </div>
                  <div style="padding: 0 10px;">
                    ${resumeData.awards.map(award => `
                      <div style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 6px;">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                          <div style="flex: 1;">
                            <h3 style="font-size: 11px; font-weight: bold; margin: 0 0 2px 0;">${award.title}</h3>
                            <p style="font-weight: 600; font-size: 11px; margin: 0 0 2px 0;">${award.issuer}</p>
                            ${award.description ? `<p style="color: #666; font-size: 10px; margin: 0;">${award.description}</p>` : ''}
                          </div>
                          <span style="color: #666; font-size: 10px; font-weight: 500; margin-left: 10px;">${award.date}</span>
                        </div>
                        ${award.links.filter(Boolean).length > 0 ? `
                          <div style="font-size: 10px; margin-top: 4px;">
                            ${award.links.filter(Boolean).map(link => `[<a href="${link}" style="color: #0066cc;">Link</a>]`).join(' ')}
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : '';

            default:
              if (sectionId.startsWith('custom-')) {
                const customSection = resumeData.customSections.find(s => s.id === sectionId);
                return customSection ? `
                  <div style="margin-bottom: 20px;">
                    <div style="border-bottom: 2px solid #333; margin-bottom: 10px;">
                      <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; padding: 8px 0; background: #f5f5f5; margin: 0;">
                        ${customSection.title}
                      </h2>
                    </div>
                    <div style="font-size: 11px; line-height: 1.4; white-space: pre-wrap; padding: 0 10px;">
                      ${customSection.content}
                    </div>
                  </div>
                ` : '';
              }
              return '';
          }
        }).filter(Boolean).join('')}
      </div>
    `;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
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
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="px-4 py-2 border border-purple-600 text-gray-900 dark:text-white hover:bg-purple-600 hover:text-white transition-all duration-300 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                {isDownloading ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
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
              <ResumeBuilder
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-4xl mx-auto animate-fade-in">
              <ResumePreview resumeData={resumeData} fullScreen />
            </div>
          )}

          {activeTab === 'ats' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg animate-fade-in">
              <ATSChecker
                resumeData={resumeData}
                onScoreUpdate={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;