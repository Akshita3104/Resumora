import { useState } from 'react';
import { Plus, Trash2, Upload, User, Briefcase, GraduationCap, Code, Award, FolderOpen, Link } from 'lucide-react';
import SectionManager from './SectionManager';

export const ResumeBuilder = ({ resumeData, setResumeData }) => {
  const [activeSection, setActiveSection] = useState('personal');

  const handleImageUpload = (event, type, projectId) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        if (type === 'profile') {
          setResumeData({
            ...resumeData,
            personalInfo: {
              ...resumeData.personalInfo,
              profileImage: imageUrl,
            },
          });
        } else if (type === 'project' && projectId) {
          setResumeData({
            ...resumeData,
            projects: resumeData.projects.map(project =>
              project.id === projectId ? { ...project, image: imageUrl } : project
            ),
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteProfileImage = () => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        profileImage: null,
      },
    });
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      current: false,
      description: '',
      achievements: [''],
      links: [''],
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    });
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      gradeType: 'CGPA', // Default grade type
      gradeValue: '',
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
  };

  const addSkillCategory = () => {
    const newSkillCategory = {
      id: Date.now().toString(),
      category: '',
      items: [''],
    };
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkillCategory],
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [''],
      url: '',
      links: [''],
    };
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
  };

  const addCertification = () => {
    const newCertification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      url: '',
      links: [''],
    };
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, newCertification],
    });
  };

  const addAward = () => {
    const newAward = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      date: '',
      description: '',
      links: [''],
    };
    setResumeData({
      ...resumeData,
      awards: [...resumeData.awards, newAward],
    });
  };

  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 dark:scrollbar-thumb-gray-200">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Builder</h2>
        </div>

        {/* Section Manager */}
        <SectionManager resumeData={resumeData} setResumeData={setResumeData} />

        {/* Accordion Replacement */}
        <div className="space-y-4">
          {/* Personal Information */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setActiveSection(activeSection === 'personal' ? '' : 'personal')}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Contact Information
              </div>
              <span>{activeSection === 'personal' ? '−' : '+'}</span>
            </button>
            {activeSection === 'personal' && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Full Name</label>
                    <input
                      value={resumeData.personalInfo.name}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Email</label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Phone</label>
                    <input
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Location</label>
                    <input
                      value={resumeData.personalInfo.location}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, location: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      placeholder="City, State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">LinkedIn</label>
                    <input
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      placeholder="linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Website/Portfolio</label>
                    <input
                      value={resumeData.personalInfo.website}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, website: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      placeholder="yourwebsite.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Profile Image</label>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      type="button"
                      className="px-4 py-2 border border-blue-500 text-blue-700 dark:text-blue-300 dark:border-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-md flex items-center gap-2"
                      onClick={() => document.getElementById('profile-image')?.click()}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </button>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'profile')}
                    />
                    {resumeData.personalInfo.profileImage && (
                      <div className="relative">
                        <img 
                          src={resumeData.personalInfo.profileImage} 
                          alt="Profile" 
                          className="w-24 h-24 rounded-full border-2 border-blue-500 dark:border-blue-400 object-cover"
                        />
                        <button
                          onClick={deleteProfileImage}
                          className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Professional Summary */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setActiveSection(activeSection === 'summary' ? '' : 'summary')}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Professional Summary
              </div>
              <span>{activeSection === 'summary' ? '−' : '+'}</span>
            </button>
            {activeSection === 'summary' && (
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Summary</label>
                  <textarea
                    value={resumeData.summary}
                    onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none min-h-[120px]"
                    placeholder="Write a compelling professional summary that highlights your key skills and experience..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Work Experience */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setActiveSection(activeSection === 'experience' ? '' : 'experience')}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Work Experience
              </div>
              <span>{activeSection === 'experience' ? '−' : '+'}</span>
            </button>
            {activeSection === 'experience' && (
              <div className="p-4 space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-blue-600 dark:text-blue-400 font-semibold">Experience #{index + 1}</h4>
                      <button
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                        onClick={() => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.filter(e => e.id !== exp.id)
                        })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.map(item =>
                            item.id === exp.id ? { ...item, title: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                      <input
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.map(item =>
                            item.id === exp.id ? { ...item, company: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                    </div>
                    <textarea
                      placeholder="Job description and key responsibilities"
                      value={exp.description}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        experience: resumeData.experience.map(item =>
                          item.id === exp.id ? { ...item, description: e.target.value } : item
                        )
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <select
                        value={exp.startMonth}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.map(item =>
                            item.id === exp.id ? { ...item, startMonth: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      >
                        <option value="">Start Month</option>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <select
                        value={exp.startYear}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.map(item =>
                            item.id === exp.id ? { ...item, startYear: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      >
                        <option value="">Start Year</option>
                        {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 10 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <select
                        value={exp.endMonth}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.map(item =>
                            item.id === exp.id ? { ...item, endMonth: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      >
                        <option value="">End Month</option>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <select
                        value={exp.endYear}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.map(item =>
                            item.id === exp.id ? { ...item, endYear: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      >
                        <option value="">End Year</option>
                        {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 10 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4 text-gray-900 dark:text-gray-200" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Links</span>
                      </div>
                      <textarea
                        placeholder="Links (one per line)"
                        value={exp.links.join('\n')}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.map(item =>
                            item.id === exp.id 
                              ? { ...item, links: e.target.value.split('\n').filter(link => link.trim()) } 
                              : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addExperience}
                  className="w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Experience
                </button>
              </div>
            )}
          </div>

          {/* Education */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setActiveSection(activeSection === 'education' ? '' : 'education')}
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </div>
              <span>{activeSection === 'education' ? '−' : '+'}</span>
            </button>
            {activeSection === 'education' && (
              <div className="p-4 space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-blue-600 dark:text-blue-400 font-semibold">Education #{index + 1}</h4>
                      <button
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                        onClick={() => setResumeData({
                          ...resumeData,
                          education: resumeData.education.filter(e => e.id !== edu.id)
                        })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, degree: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                      <input
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, school: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        value={edu.gradeType}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, gradeType: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      >
                        <option value="CGPA">CGPA</option>
                        <option value="SGPA">SGPA</option>
                        <option value="Percentage">Percentage</option>
                        <option value="Percentile">Percentile</option>
                      </select>
                      <input
                        placeholder="Grade Value"
                        value={edu.gradeValue}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, gradeValue: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <select
                        value={edu.startMonth}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, startMonth: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      >
                        <option value="">Start Month</option>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <select
                        value={edu.startYear}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, startYear: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      >
                        <option value="">Start Year</option>
                        {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 10 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <select
                        value={edu.endMonth}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, endMonth: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      >
                        <option value="">End Month</option>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <select
                        value={edu.endYear}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, endYear: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      >
                        <option value="">End Year</option>
                        {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 10 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addEducation}
                  className="w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Education
                </button>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setActiveSection(activeSection === 'skills' ? '' : 'skills')}
            >
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Skills
              </div>
              <span>{activeSection === 'skills' ? '−' : '+'}</span>
            </button>
            {activeSection === 'skills' && (
              <div className="p-4 space-y-4">
                {resumeData.skills.map((skillCategory, index) => (
                  <div key={skillCategory.id} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-blue-600 dark:text-blue-400 font-semibold">Skill Category #{index + 1}</h4>
                      <button
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                        onClick={() => setResumeData({
                          ...resumeData,
                          skills: resumeData.skills.filter(s => s.id !== skillCategory.id)
                        })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      placeholder="Category (e.g., Programming Languages)"
                      value={skillCategory.category}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        skills: resumeData.skills.map(item =>
                          item.id === skillCategory.id ? { ...item, category: e.target.value } : item
                        )
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                    />
                    <textarea
                      placeholder="Skills (comma-separated: JavaScript, Python, React)"
                      value={skillCategory.items.join(', ')}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        skills: resumeData.skills.map(item =>
                          item.id === skillCategory.id 
                            ? { ...item, items: e.target.value.split(',').map(s => s.trim()).filter(s => s) } 
                            : item
                        )
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                    />
                  </div>
                ))}
                <button
                  onClick={addSkillCategory}
                  className="w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill Category
                </button>
              </div>
            )}
          </div>

          {/* Projects */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setActiveSection(activeSection === 'projects' ? '' : 'projects')}
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Projects
              </div>
              <span>{activeSection === 'projects' ? '−' : '+'}</span>
            </button>
            {activeSection === 'projects' && (
              <div className="p-4 space-y-4">
                {resumeData.projects.map((project, index) => (
                  <div key={project.id} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-blue-600 dark:text-blue-400 font-semibold">Project #{index + 1}</h4>
                      <button
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                        onClick={() => setResumeData({
                          ...resumeData,
                          projects: resumeData.projects.filter(p => p.id !== project.id)
                        })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        projects: resumeData.projects.map(item =>
                          item.id === project.id ? { ...item, name: e.target.value } : item
                        )
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                    />
                    <textarea
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        projects: resumeData.projects.map(item =>
                          item.id === project.id ? { ...item, description: e.target.value } : item
                        )
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4 text-gray-900 dark:text-gray-200" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Links</span>
                      </div>
                      <textarea
                        placeholder="Links (one per line)"
                        value={project.links.join('\n')}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          projects: resumeData.projects.map(item =>
                            item.id === project.id 
                              ? { ...item, links: e.target.value.split('\n').filter(link => link.trim()) } 
                              : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="px-3 py-1 border border-blue-500 text-blue-700 dark:text-blue-300 dark:border-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-md flex items-center gap-2 text-sm"
                        onClick={() => document.getElementById(`project-image-${project.id}`)?.click()}
                      >
                        <Upload className="w-4 h-4" />
                        Add Image
                      </button>
                      <input
                        id={`project-image-${project.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'project', project.id)}
                      />
                      {project.image && (
                        <img 
                          src={project.image} 
                          alt="Project" 
                          className="w-16 h-16 rounded border-2 border-blue-500 dark:border-blue-400 object-cover"
                        />
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={addProject}
                  className="w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setActiveSection(activeSection === 'certifications' ? '' : 'certifications')}
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications
              </div>
              <span>{activeSection === 'certifications' ? '−' : '+'}</span>
            </button>
            {activeSection === 'certifications' && (
              <div className="p-4 space-y-4">
                {resumeData.certifications.map((cert, index) => (
                  <div key={cert.id} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-blue-600 dark:text-blue-400 font-semibold">Certification #{index + 1}</h4>
                      <button
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                        onClick={() => setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.filter(c => c.id !== cert.id)
                        })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Certification Name"
                        value={cert.name}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.map(item =>
                            item.id === cert.id ? { ...item, name: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                      <input
                        placeholder="Issuing Organization"
                        value={cert.issuer}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.map(item =>
                            item.id === cert.id ? { ...item, issuer: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                    </div>
                    <input
                      placeholder="Certification URL (optional)"
                      value={cert.url}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        certifications: resumeData.certifications.map(item =>
                          item.id === cert.id ? { ...item, url: e.target.value } : item
                        )
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4 text-gray-900 dark:text-gray-200" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Links</span>
                      </div>
                      <textarea
                        placeholder="Links (one per line)"
                        value={cert.links.join('\n')}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.map(item =>
                            item.id === cert.id 
                              ? { ...item, links: e.target.value.split('\n').filter(link => link.trim()) } 
                              : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addCertification}
                  className="w-full px-4 py-2 bg-blue-600 text-white dark:bg-blue-700 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Certification
                </button>
              </div>
            )}
          </div>

          {/* Awards */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setActiveSection(activeSection === 'awards' ? '' : 'awards')}
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Awards & Achievements
              </div>
              <span>{activeSection === 'awards' ? '−' : '+'}</span>
            </button>
            {activeSection === 'awards' && (
              <div className="p-4 space-y-4">
                {resumeData.awards.map((award, index) => (
                  <div key={award.id} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-blue-600 dark:text-blue-400 font-semibold">Award #{index + 1}</h4>
                      <button
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                        onClick={() => setResumeData({
                          ...resumeData,
                          awards: resumeData.awards.filter(a => a.id !== award.id)
                        })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Award Title"
                        value={award.title}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          awards: resumeData.awards.map(item =>
                            item.id === award.id ? { ...item, title: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                      <input
                        placeholder="Issuing Organization"
                        value={award.issuer}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          awards: resumeData.awards.map(item =>
                            item.id === award.id ? { ...item, issuer: e.target.value } : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                    </div>
                    <input
                      type="date"
                      placeholder="Date Received"
                      value={award.date}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        awards: resumeData.awards.map(item =>
                          item.id === award.id ? { ...item, date: e.target.value } : item
                        )
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                    />
                    <textarea
                      placeholder="Description (optional)"
                      value={award.description}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        awards: resumeData.awards.map(item =>
                          item.id === award.id ? { ...item, description: e.target.value } : item
                        )
                      })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4 text-gray-900 dark:text-gray-200" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Links</span>
                      </div>
                      <textarea
                        placeholder="Links (one per line)"
                        value={award.links.join('\n')}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          awards: resumeData.awards.map(item =>
                            item.id === award.id 
                              ? { ...item, links: e.target.value.split('\n').filter(link => link.trim()) } 
                              : item
                          )
                        })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addAward}
                  className="w-full px-4 py-2 bg-blue-600 text-white dark:bg-blue-700 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Award
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};