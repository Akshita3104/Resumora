import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Upload, User, Briefcase, GraduationCap, Code, Award, FolderOpen, Star, Link } from 'lucide-react';
import { ResumeData } from '@/pages/Index';
import { SectionManager } from './SectionManager';

interface ResumeBuilderProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export const ResumeBuilder = ({ resumeData, setResumeData }: ResumeBuilderProps) => {
  const [activeSection, setActiveSection] = useState<string>('personal');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'project', projectId?: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
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

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
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
      startDate: '',
      endDate: '',
      gpa: '',
      marks: '',
      year: '',
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
      date: '',
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
    <div className="p-6 h-full overflow-y-auto scrollbar-cyber">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Resume Builder</h2>
        </div>

        {/* Section Manager */}
        <SectionManager resumeData={resumeData} setResumeData={setResumeData} />

        <Accordion type="single" collapsible value={activeSection} onValueChange={setActiveSection}>
          {/* Personal Information */}
          <AccordionItem value="personal" className="border-border">
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Contact Information
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Full Name</Label>
                  <Input
                    value={resumeData.personalInfo.name}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                    })}
                    className="bg-background border-border text-foreground focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Email</Label>
                  <Input
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                    })}
                    className="bg-background border-border text-foreground focus:border-primary"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Phone</Label>
                  <Input
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                    })}
                    className="bg-background border-border text-foreground focus:border-primary"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Location</Label>
                  <Input
                    value={resumeData.personalInfo.location}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, location: e.target.value }
                    })}
                    className="bg-background border-border text-foreground focus:border-primary"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <Label className="text-foreground">LinkedIn</Label>
                  <Input
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value }
                    })}
                    className="bg-background border-border text-foreground focus:border-primary"
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Website/Portfolio</Label>
                  <Input
                    value={resumeData.personalInfo.website}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, website: e.target.value }
                    })}
                    className="bg-background border-border text-foreground focus:border-primary"
                    placeholder="yourwebsite.com"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-foreground">Profile Image</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
                    onClick={() => document.getElementById('profile-image')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'profile')}
                  />
                  {resumeData.personalInfo.profileImage && (
                    <img 
                      src={resumeData.personalInfo.profileImage} 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full border-2 border-primary"
                    />
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Professional Summary */}
          <AccordionItem value="summary" className="border-border">
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Professional Summary
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div>
                <Label className="text-foreground">Summary</Label>
                <Textarea
                  value={resumeData.summary}
                  onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                  className="bg-background border-border text-foreground focus:border-primary min-h-[120px]"
                  placeholder="Write a compelling professional summary that highlights your key skills and experience..."
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Work Experience */}
          <AccordionItem value="experience" className="border-border">
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Work Experience
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {resumeData.experience.map((exp, index) => (
                <Card key={exp.id} className="bg-card/50 border-border/50">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-primary font-semibold">Experience #{index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.filter(e => e.id !== exp.id)
                        })}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.map(item =>
                            item.id === exp.id ? { ...item, title: e.target.value } : item
                          )
                        })}
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                      <Input
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          experience: resumeData.experience.map(item =>
                            item.id === exp.id ? { ...item, company: e.target.value } : item
                          )
                        })}
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                    </div>
                    <Textarea
                      placeholder="Job description and key responsibilities"
                      value={exp.description}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        experience: resumeData.experience.map(item =>
                          item.id === exp.id ? { ...item, description: e.target.value } : item
                        )
                      })}
                      className="bg-background border-border text-foreground focus:border-primary"
                    />
                    <div>
                      <Label className="text-foreground flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4" />
                        Links
                      </Label>
                      <Textarea
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
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={addExperience}
                className="w-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Education */}
          <AccordionItem value="education" className="border-border">
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {resumeData.education.map((edu, index) => (
                <Card key={edu.id} className="bg-card/50 border-border/50">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-primary font-semibold">Education #{index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData({
                          ...resumeData,
                          education: resumeData.education.filter(e => e.id !== edu.id)
                        })}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, degree: e.target.value } : item
                          )
                        })}
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                      <Input
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, school: e.target.value } : item
                          )
                        })}
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                      <Input
                        placeholder="Marks/Percentage"
                        value={edu.marks}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, marks: e.target.value } : item
                          )
                        })}
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                      <Input
                        placeholder="Year of Graduation"
                        value={edu.year}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          education: resumeData.education.map(item =>
                            item.id === edu.id ? { ...item, year: e.target.value } : item
                          )
                        })}
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={addEducation}
                className="w-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Skills */}
          <AccordionItem value="skills" className="border-border">
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Skills
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {resumeData.skills.map((skillCategory, index) => (
                <Card key={skillCategory.id} className="bg-card/50 border-border/50">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-primary font-semibold">Skill Category #{index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData({
                          ...resumeData,
                          skills: resumeData.skills.filter(s => s.id !== skillCategory.id)
                        })}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Category (e.g., Programming Languages)"
                      value={skillCategory.category}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        skills: resumeData.skills.map(item =>
                          item.id === skillCategory.id ? { ...item, category: e.target.value } : item
                        )
                      })}
                      className="bg-background border-border text-foreground focus:border-primary"
                    />
                    <Textarea
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
                      className="bg-background border-border text-foreground focus:border-primary"
                    />
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={addSkillCategory}
                className="w-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skill Category
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Projects */}
          <AccordionItem value="projects" className="border-border">
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Projects
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {resumeData.projects.map((project, index) => (
                <Card key={project.id} className="bg-card/50 border-border/50">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-primary font-semibold">Project #{index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData({
                          ...resumeData,
                          projects: resumeData.projects.filter(p => p.id !== project.id)
                        })}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        projects: resumeData.projects.map(item =>
                          item.id === project.id ? { ...item, name: e.target.value } : item
                        )
                      })}
                      className="bg-background border-border text-foreground focus:border-primary"
                    />
                    <Textarea
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        projects: resumeData.projects.map(item =>
                          item.id === project.id ? { ...item, description: e.target.value } : item
                        )
                      })}
                      className="bg-background border-border text-foreground focus:border-primary"
                    />
                    <div>
                      <Label className="text-foreground flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4" />
                        Links
                      </Label>
                      <Textarea
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
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
                        onClick={() => document.getElementById(`project-image-${project.id}`)?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Add Image
                      </Button>
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
                          className="w-16 h-16 rounded border-2 border-primary object-cover"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={addProject}
                className="w-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Certifications */}
          <AccordionItem value="certifications" className="border-border">
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {resumeData.certifications.map((cert, index) => (
                <Card key={cert.id} className="bg-card/50 border-border/50">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-primary font-semibold">Certification #{index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.filter(c => c.id !== cert.id)
                        })}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Certification Name"
                        value={cert.name}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.map(item =>
                            item.id === cert.id ? { ...item, name: e.target.value } : item
                          )
                        })}
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                      <Input
                        placeholder="Issuing Organization"
                        value={cert.issuer}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.map(item =>
                            item.id === cert.id ? { ...item, issuer: e.target.value } : item
                          )
                        })}
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                    </div>
                    <Input
                      type="date"
                      placeholder="Date Obtained"
                      value={cert.date}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        certifications: resumeData.certifications.map(item =>
                          item.id === cert.id ? { ...item, date: e.target.value } : item
                        )
                      })}
                      className="bg-background border-border text-foreground focus:border-primary"
                    />
                    <div>
                      <Label className="text-foreground flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4" />
                        Links
                      </Label>
                      <Textarea
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
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={addCertification}
                className="w-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Awards */}
          <AccordionItem value="awards" className="border-border">
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Awards & Achievements
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {resumeData.awards.map((award, index) => (
                <Card key={award.id} className="bg-card/50 border-border/50">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-primary font-semibold">Award #{index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData({
                          ...resumeData,
                          awards: resumeData.awards.filter(a => a.id !== award.id)
                        })}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Award Title"
                        value={award.title}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          awards: resumeData.awards.map(item =>
                            item.id === award.id ? { ...item, title: e.target.value } : item
                          )
                        })}
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                      <Input
                        placeholder="Issuing Organization"
                        value={award.issuer}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          awards: resumeData.awards.map(item =>
                            item.id === award.id ? { ...item, issuer: e.target.value } : item
                          )
                        })}
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                    </div>
                    <Input
                      type="date"
                      placeholder="Date Received"
                      value={award.date}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        awards: resumeData.awards.map(item =>
                          item.id === award.id ? { ...item, date: e.target.value } : item
                        )
                      })}
                      className="bg-background border-border text-foreground focus:border-primary"
                    />
                    <Textarea
                      placeholder="Description (optional)"
                      value={award.description}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        awards: resumeData.awards.map(item =>
                          item.id === award.id ? { ...item, description: e.target.value } : item
                        )
                      })}
                      className="bg-background border-border text-foreground focus:border-primary"
                    />
                    <div>
                      <Label className="text-foreground flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4" />
                        Links
                      </Label>
                      <Textarea
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
                        className="bg-background border-border text-foreground focus:border-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={addAward}
                className="w-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Award
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
