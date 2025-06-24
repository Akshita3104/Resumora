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
      tempDiv.style.width = '210mm'; // A4 width
      tempDiv.style.backgroundColor = '#000000';
      tempDiv.style.padding = '10mm';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '12px';
      tempDiv.style.lineHeight = '1.2';
      document.body.appendChild(tempDiv);

      const htmlContent = `
        <div style="width: 170mm; margin: 0 auto; background: #000000; color: #ffffff; padding: 0; border: 1px solid #ffffff;">
          <div style="margin-bottom: 10mm; text-align: center;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 5mm;">
              ${
                resumeData.personalInfo.profileImage
                  ? `
                  <div style="flex-shrink: 0;">
                    <div style="width: 50mm; height: 50mm; border: 2px solid #ffffff; border-radius: 50%; overflow: hidden;">
                      <img
                        src="${resumeData.personalInfo.profileImage}"
                        alt="${resumeData.personalInfo.name || 'Profile'}"
                        style="width: 100%; height: 100%; object-fit: cover;"
                        onerror="this.style.display='none';this.parentElement.innerHTML='<div style=\\"width: 100%; height: 100%; background: #333333; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 8px; font-weight: bold;\\"><svg style=\\"width: 12px; height: 12px;\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M12 4a4 4 0 00-4 4v4a4 4 0 008 0V8a4 4 0 00-4-4zM12 14v6m-4-2h8\\"></path></svg></div>';"
                      />
                    </div>
                  </div>
                  `
                  : ''
              }
              <div>
                <h1 style="font-size: 24px; font-weight: bold; color: #ffffff; margin: 0; text-transform: uppercase; letter-spacing: 2px;">
                  ${resumeData.personalInfo.name || 'Your Name'}
                </h1>
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; color: #cccccc; font-size: 12px;">
                  ${
                    resumeData.personalInfo.email
                      ? `<span>${resumeData.personalInfo.email}</span>`
                      : ''
                  }
                  ${
                    resumeData.personalInfo.email &&
                    (resumeData.personalInfo.phone ||
                      resumeData.personalInfo.location ||
                      resumeData.personalInfo.linkedin ||
                      resumeData.personalInfo.website)
                      ? `<span> | </span>`
                      : ''
                  }
                  ${
                    resumeData.personalInfo.phone
                      ? `<span>${resumeData.personalInfo.phone}</span>`
                      : ''
                  }
                  ${
                    resumeData.personalInfo.phone &&
                    (resumeData.personalInfo.location ||
                      resumeData.personalInfo.linkedin ||
                      resumeData.personalInfo.website)
                      ? `<span> | </span>`
                      : ''
                  }
                  ${
                    resumeData.personalInfo.location
                      ? `<span>${resumeData.personalInfo.location}</span>`
                      : ''
                  }
                  ${
                    resumeData.personalInfo.location &&
                    (resumeData.personalInfo.linkedin || resumeData.personalInfo.website)
                      ? `<span> | </span>`
                      : ''
                  }
                  ${
                    resumeData.personalInfo.linkedin
                      ? `<span>${resumeData.personalInfo.linkedin}</span>`
                      : ''
                  }
                  ${
                    resumeData.personalInfo.linkedin && resumeData.personalInfo.website
                      ? `<span> | </span>`
                      : ''
                  }
                  ${
                    resumeData.personalInfo.website
                      ? `<span>${resumeData.personalInfo.website}</span>`
                      : ''
                  }
                </div>
              </div>
            </div>
            <div style="border-top: 2px solid #ffffff; margin-top: 5mm;"></div>
          </div>

          ${resumeData.sectionOrder
            .map((sectionId) => {
              if (!resumeData.enabledSections[sectionId]) return '';

              switch (sectionId) {
                case 'summary':
                  return resumeData.summary
                    ? `
                    <section style="margin-bottom: 10mm;">
                      <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; text-align: center; padding: 2mm 0; background: #333333; margin: 0;">
                        Professional Summary
                      </h2>
                      <div style="margin: 5mm 0; color: #cccccc; font-size: 12px; line-height: 1.5; text-align: justify;">
                        ${resumeData.summary}
                      </div>
                      <div style="border-bottom: 2px solid #ffffff; margin-top: 5mm;"></div>
                    </section>
                  `
                    : '';

                case 'experience':
                  return resumeData.experience.length > 0
                    ? `
                    <section style="margin-bottom: 10mm;">
                      <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; text-align: center; padding: 2mm 0; background: #333333; margin: 0;">
                        Work Experience
                      </h2>
                      <div style="margin: 5mm 0;">
                        ${resumeData.experience
                          .map(
                            (exp) => `
                          <div style="padding-bottom: 5mm; ${
                            exp === resumeData.experience[resumeData.experience.length - 1]
                              ? ''
                              : 'border-bottom: 1px solid #cccccc;'
                          }">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2mm;">
                              <div style="flex: 1;">
                                <h3 style="font-size: 14px; font-weight: bold; color: #ffffff; text-transform: uppercase; margin: 0 0 2mm 0;">
                                  ${exp.title}
                                </h3>
                                <p style="font-size: 12px; font-weight: 600; color: #ffffff; margin: 0 0 2mm 0;">
                                  ${exp.company}
                                </p>
                                ${
                                  exp.location
                                    ? `<p style="font-size: 11px; color: #cccccc; margin: 0 0 2mm 0;">
                                        ${exp.location}
                                      </p>`
                                    : ''
                                }
                              </div>
                              <span style="font-size: 11px; color: #cccccc; font-weight: 500; margin-left: 2mm;">
                                ${
                                  exp.startDate
                                    ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                                    : 'N/A'
                                } - ${
                                  exp.current
                                    ? 'Present'
                                    : exp.endDate
                                    ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                                    : 'N/A'
                                }
                              </span>
                            </div>
                            ${
                              exp.description
                                ? `<p style="font-size: 12px; color: #cccccc; margin: 0 0 2mm 0; line-height: 1.5;">
                                    ${exp.description}
                                  </p>`
                                : ''
                            }
                            ${
                              exp.achievements.filter(Boolean).length > 0
                                ? `
                              <ul style="list-style: disc; list-style-position: inside; margin: 0 0 2mm 0; padding: 0; font-size: 12px; color: #cccccc;">
                                ${exp.achievements
                                  .filter(Boolean)
                                  .map(
                                    (achievement) =>
                                      `<li style="margin-bottom: 2mm; line-height: 1.5;">${achievement}</li>`
                                  )
                                  .join('')}
                              </ul>
                            `
                                : ''
                            }
                            ${
                              exp.links.filter(Boolean).length > 0
                                ? `
                              <div style="font-size: 11px; color: #cccccc; margin-top: 2mm;">
                                ${exp.links
                                  .filter(Boolean)
                                  .map(
                                    (link) =>
                                      `[<a href="${link}" style="color: #00ffff; text-decoration: underline;">Link</a>]`
                                  )
                                  .join(' ')}
                              </div>
                            `
                                : ''
                            }
                          </div>
                        `
                          )
                          .join('')}
                      </div>
                      <div style="border-bottom: 2px solid #ffffff; margin-top: 5mm;"></div>
                    </section>
                  `
                    : '';

                case 'education':
                  return resumeData.education.length > 0
                    ? `
                    <section style="margin-bottom: 10mm;">
                      <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; text-align: center; padding: 2mm 0; background: #333333; margin: 0;">
                        Education
                      </h2>
                      <div style="margin: 5mm 0;">
                        ${resumeData.education
                          .map(
                            (edu) => `
                          <div style="padding-bottom: 5mm; ${
                            edu === resumeData.education[resumeData.education.length - 1]
                              ? ''
                              : 'border-bottom: 1px solid #cccccc;'
                          }">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2mm;">
                              <div style="flex: 1;">
                                <h3 style="font-size: 14px; font-weight: bold; color: #ffffff; margin: 0 0 2mm 0;">
                                  ${edu.degree || 'Degree'}
                                </h3>
                                <p style="font-size: 12px; font-weight: 600; color: #ffffff; margin: 0 0 2mm 0;">
                                  ${edu.school || 'School/University'}
                                </p>
                                ${
                                  edu.location
                                    ? `<p style="font-size: 11px; color: #cccccc; margin: 0 0 2mm 0;">
                                        ${edu.location}
                                      </p>`
                                    : ''
                                }
                                ${
                                  edu.gpa || edu.marks
                                    ? `<p style="font-size: 11px; color: #cccccc; margin: 0;">
                                        ${edu.gpa ? `GPA: ${edu.gpa}` : ''}${
                                        edu.marks ? ` Marks: ${edu.marks}` : ''
                                      }
                                      </p>`
                                    : ''
                                }
                              </div>
                              <span style="font-size: 11px; color: #cccccc; font-weight: 500; margin-left: 2mm;">
                                ${
                                  edu.startDate
                                    ? new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                                    : 'N/A'
                                } - ${
                                  edu.endDate
                                    ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                                    : 'N/A'
                                }
                              </span>
                            </div>
                          </div>
                        `
                          )
                          .join('')}
                      </div>
                      <div style="border-bottom: 2px solid #ffffff; margin-top: 5mm;"></div>
                    </section>
                  `
                    : '';

                case 'skills':
                  return resumeData.skills.length > 0
                    ? `
                    <section style="margin-bottom: 10mm;">
                      <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; text-align: center; padding: 2mm 0; background: #333333; margin: 0;">
                        Skills Summary
                      </h2>
                      <div style="margin: 5mm 0;">
                        ${resumeData.skills
                          .map(
                            (skillCategory) => `
                          <div style="margin-bottom: 2mm; display: flex; align-items: flex-start; gap: 5px;">
                            <span style="font-size: 12px; font-weight: bold; color: #ffffff; flex-shrink: 0;">
                              • ${skillCategory.category}:
                            </span>
                            <span style="font-size: 12px; color: #cccccc; line-height: 1.5;">
                              ${skillCategory.items.join(', ') || 'N/A'}
                            </span>
                          </div>
                        `
                          )
                          .join('')}
                      </div>
                      <div style="border-bottom: 2px solid #ffffff; margin-top: 5mm;"></div>
                    </section>
                  `
                    : '';

                case 'projects':
                  return resumeData.projects.length > 0
                    ? `
                    <section style="margin-bottom: 10mm;">
                      <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; text-align: center; padding: 2mm 0; background: #333333; margin: 0;">
                        Projects
                      </h2>
                      <div style="margin: 5mm 0;">
                        ${resumeData.projects
                          .map(
                            (project) => `
                          <div style="padding-bottom: 5mm; ${
                            project === resumeData.projects[resumeData.projects.length - 1]
                              ? ''
                              : 'border-bottom: 1px solid #cccccc;'
                          }">
                            <h3 style="font-size: 14px; font-weight: bold; color: #ffffff; margin: 0 0 2mm 0;">
                              ${project.name}
                            </h3>
                            <p style="font-size: 12px; color: #cccccc; margin: 0 0 2mm 0; line-height: 1.5;">
                              ${project.description}
                            </p>
                            ${
                              project.technologies.filter(Boolean).length > 0
                                ? `
                              <p style="font-size: 11px; color: #cccccc; margin: 0 0 2mm 0;">
                                <strong>Technologies:</strong> ${project.technologies
                                  .filter(Boolean)
                                  .join(', ')}
                              </p>
                            `
                                : ''
                            }
                            ${
                              project.links.filter(Boolean).length > 0
                                ? `
                              <div style="font-size: 11px; color: #cccccc; margin-top: 2mm;">
                                ${project.links
                                  .filter(Boolean)
                                  .map(
                                    (link) =>
                                      `[<a href="${link}" style="color: #00ffff; text-decoration: underline;">Link</a>]`
                                  )
                                  .join(' ')}
                              </div>
                            `
                                : ''
                            }
                          </div>
                        `
                          )
                          .join('')}
                      </div>
                      <div style="border-bottom: 2px solid #ffffff; margin-top: 5mm;"></div>
                    </section>
                  `
                    : '';

                case 'certifications':
                  return resumeData.certifications.length > 0
                    ? `
                    <section style="margin-bottom: 10mm;">
                      <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; text-align: center; padding: 2mm 0; background: #333333; margin: 0;">
                        Certifications
                      </h2>
                      <div style="margin: 5mm 0;">
                        ${resumeData.certifications
                          .map(
                            (cert) => `
                          <div style="padding-bottom: 5mm; ${
                            cert === resumeData.certifications[resumeData.certifications.length - 1]
                              ? ''
                              : 'border-bottom: 1px solid #cccccc;'
                          }">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2mm;">
                              <div style="flex: 1;">
                                <h3 style="font-size: 14px; font-weight: bold; color: #ffffff; margin: 0 0 2mm 0;">
                                  ${cert.name}
                                </h3>
                                <p style="font-size: 12px; font-weight: 600; color: #ffffff; margin: 0;">
                                  ${cert.issuer}
                                </p>
                              </div>
                              <span style="font-size: 11px; color: #cccccc; font-weight: 500; margin-left: 2mm;">
                                ${cert.date}
                              </span>
                            </div>
                            ${
                              cert.links.filter(Boolean).length > 0
                                ? `
                              <div style="font-size: 11px; color: #cccccc; margin-top: 2mm;">
                                ${cert.links
                                  .filter(Boolean)
                                  .map(
                                    (link) =>
                                      `[<a href="${link}" style="color: #00ffff; text-decoration: underline;">Link</a>]`
                                  )
                                  .join(' ')}
                              </div>
                            `
                                : ''
                            }
                          </div>
                        `
                          )
                          .join('')}
                      </div>
                      <div style="border-bottom: 2px solid #ffffff; margin-top: 5mm;"></div>
                    </section>
                  `
                    : '';

                case 'awards':
                  return resumeData.awards.length > 0
                    ? `
                    <section style="margin-bottom: 10mm;">
                      <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; text-align: center; padding: 2mm 0; background: #333333; margin: 0;">
                        Awards & Achievements
                      </h2>
                      <div style="margin: 5mm 0;">
                        ${resumeData.awards
                          .map(
                            (award) => `
                          <div style="padding-bottom: 5mm; ${
                            award === resumeData.awards[resumeData.awards.length - 1]
                              ? ''
                              : 'border-bottom: 1px solid #cccccc;'
                          }">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2mm;">
                              <div style="flex: 1;">
                                <h3 style="font-size: 14px; font-weight: bold; color: #ffffff; margin: 0 0 2mm 0;">
                                  ${award.title}
                                </h3>
                                <p style="font-size: 12px; font-weight: 600; color: #ffffff; margin: 0 0 2mm 0;">
                                  ${award.issuer}
                                </p>
                                ${
                                  award.description
                                    ? `<p style="font-size: 11px; color: #cccccc; margin: 0;">
                                        ${award.description}
                                      </p>`
                                    : ''
                                }
                              </div>
                              <span style="font-size: 11px; color: #cccccc; font-weight: 500; margin-left: 2mm;">
                                ${award.date}
                              </span>
                            </div>
                            ${
                              award.links.filter(Boolean).length > 0
                                ? `
                              <div style="font-size: 11px; color: #cccccc; margin-top: 2mm;">
                                ${award.links
                                  .filter(Boolean)
                                  .map(
                                    (link) =>
                                      `[<a href="${link}" style="color: #00ffff; text-decoration: underline;">Link</a>]`
                                  )
                                  .join(' ')}
                              </div>
                            `
                                : ''
                            }
                          </div>
                        `
                          )
                          .join('')}
                      </div>
                      <div style="border-bottom: 2px solid #ffffff; margin-top: 5mm;"></div>
                    </section>
                  `
                    : '';

                default:
                  if (sectionId.startsWith('custom-')) {
                    const customSection = resumeData.customSections.find((s) => s.id === sectionId);
                    return customSection
                      ? `
                      <section style="margin-bottom: 10mm;">
                        <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; text-align: center; padding: 2mm 0; background: #333333; margin: 0;">
                          ${customSection.title}
                        </h2>
                        <div style="margin: 5mm 0; font-size: 12px; color: #cccccc; line-height: 1.5; white-space: pre-wrap;">
                          ${customSection.content}
                        </div>
                        <div style="border-bottom: 2px solid #ffffff; margin-top: 5mm;"></div>
                      </section>
                    `
                      : '';
                  }
                  return '';
              }
            })
            .filter(Boolean)
            .join('')}
        </div>
      `;
      tempDiv.innerHTML = htmlContent;

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#000000',
        width: tempDiv.offsetWidth,
        height: tempDiv.scrollHeight
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      let imgY = 0;

      const pageHeight = pdfHeight / ratio;
      const totalPages = Math.ceil(imgHeight / pageHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        const srcY = page * pageHeight;
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.min(pageHeight, imgHeight - srcY);
        const context = pageCanvas.getContext('2d');
        context.drawImage(canvas, 0, srcY, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height);
        const pageImgData = pageCanvas.toDataURL('image/png');
        pdf.addImage(pageImgData, 'PNG', imgX, imgY, imgWidth * ratio, Math.min(pageHeight, imgHeight - srcY) * ratio);
      }

      pdf.save(`${resumeData.personalInfo.name || 'Resume'}_Resume.pdf`);
      document.body.removeChild(tempDiv);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

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