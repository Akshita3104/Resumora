import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Calendar,
  ExternalLink,
  User,
} from "lucide-react";

const ResumePreview = ({ resumeData, fullScreen = false }) => {
  const containerClass = fullScreen
    ? "w-full max-w-4xl mx-auto"
    : "h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800";

  const renderSection = (sectionId) => {
    if (!resumeData.enabledSections[sectionId]) return null;

    switch (sectionId) {
      case "summary":
        return (
          resumeData.summary && (
            <section key={sectionId} className="mb-8">
              <div className="border-b-2 border-gray-800 mb-4">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider text-center py-2 bg-gray-100">
                  Professional Summary
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify px-4 text-sm">
                {resumeData.summary}
              </p>
            </section>
          )
        );

      case "experience":
        return (
          resumeData.experience.length > 0 && (
            <section key={sectionId} className="mb-8">
              <div className="border-b-2 border-gray-800 mb-4">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider text-center py-2 bg-gray-100">
                  Work Experience
                </h2>
              </div>
              <div className="space-y-6 px-4">
                {resumeData.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-b border-gray-300 pb-4 last:border-b-0"
                  >
                    <div className="text-left">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-gray-900 uppercase">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-gray-800 font-semibold">
                            {exp.company}
                          </p>
                          {exp.location && (
                            <p className="text-gray-600 text-xs">
                              {exp.location}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-600 text-xs font-medium ml-4">
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>

                      {exp.description && (
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                          {exp.description}
                        </p>
                      )}

                      {exp.achievements.length > 0 && exp.achievements[0] && (
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3 ml-4">
                          {exp.achievements.map(
                            (achievement, index) =>
                              achievement && (
                                <li key={index} className="leading-relaxed">
                                  {achievement}
                                </li>
                              )
                          )}
                        </ul>
                      )}

                      {exp.links.length > 0 && exp.links[0] && (
                        <div className="text-left mt-2">
                          {exp.links.map(
                            (link, index) =>
                              link && (
                                <span
                                  key={index}
                                  className="text-gray-700 text-xs"
                                >
                                  {index > 0 && " "}[
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                  >
                                    Link
                                  </a>
                                  ]
                                </span>
                              )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "education":
        return (
          resumeData.education.length > 0 && (
            <section key={sectionId} className="mb-8">
              <div className="border-b-2 border-gray-800 mb-4">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider text-center py-2 bg-gray-100">
                  Education
                </h2>
              </div>
              <div className="space-y-4 px-4">
                {resumeData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="border-b border-gray-200 pb-3 last:border-b-0"
                  >
                    <div className="text-left">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-gray-900">
                            {edu.degree}
                          </h3>
                          <p className="text-gray-800 font-semibold text-sm">
                            {edu.school}
                          </p>
                          {edu.location && (
                            <p className="text-gray-600 text-xs">
                              {edu.location}
                            </p>
                          )}
                          <div className="flex gap-4 text-gray-600 text-xs mt-1">
                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                            {edu.marks && <span>Marks: {edu.marks}</span>}
                          </div>
                        </div>
                        <span className="text-gray-600 text-xs font-medium ml-4">
                          {edu.year || `${edu.startDate} - ${edu.endDate}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "skills":
        return (
          resumeData.skills.length > 0 && (
            <section key={sectionId} className="mb-8">
              <div className="border-b-2 border-gray-800 mb-4">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider text-center py-2 bg-gray-100">
                  Skills Summary
                </h2>
              </div>
              <div className="px-4">
                {resumeData.skills.map((skillCategory) => (
                  <div key={skillCategory.id} className="mb-3">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-bold text-gray-900 min-w-0 flex-shrink-0">
                        • {skillCategory.category}:
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {skillCategory.items.join(", ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "projects":
        return (
          resumeData.projects.length > 0 && (
            <section key={sectionId} className="mb-8">
              <div className="border-b-2 border-gray-800 mb-4">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider text-center py-2 bg-gray-100">
                  Projects
                </h2>
              </div>
              <div className="space-y-5 px-4">
                {resumeData.projects.map((project) => (
                  <div
                    key={project.id}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                        {project.description}
                      </p>
                      {project.technologies.length > 0 &&
                        project.technologies[0] && (
                          <p className="text-gray-600 text-xs mb-2">
                            <strong>Technologies:</strong>{" "}
                            {project.technologies.filter(Boolean).join(", ")}
                          </p>
                        )}
                      {project.links.length > 0 && project.links[0] && (
                        <div className="text-left">
                          {project.links.map(
                            (link, index) =>
                              link && (
                                <span
                                  key={index}
                                  className="text-gray-700 text-xs"
                                >
                                  {index > 0 && " "}[
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                  >
                                    Link
                                  </a>
                                  ]
                                </span>
                              )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "certifications":
        return (
          resumeData.certifications.length > 0 && (
            <section key={sectionId} className="mb-8">
              <div className="border-b-2 border-gray-800 mb-4">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider text-center py-2 bg-gray-100">
                  Certifications
                </h2>
              </div>
              <div className="space-y-4 px-4">
                {resumeData.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="border-b border-gray-200 pb-3 last:border-b-0"
                  >
                    <div className="text-left">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-gray-900">
                            {cert.name}
                          </h3>
                          <p className="text-gray-800 font-semibold text-sm">
                            {cert.issuer}
                          </p>
                        </div>
                        <span className="text-gray-600 text-xs font-medium ml-4">
                          {cert.date}
                        </span>
                      </div>
                      {cert.links.length > 0 && cert.links[0] && (
                        <div className="text-left mt-1">
                          {cert.links.map(
                            (link, index) =>
                              link && (
                                <span
                                  key={index}
                                  className="text-gray-700 text-xs"
                                >
                                  {index > 0 && " "}[
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                  >
                                    Link
                                  </a>
                                  ]
                                </span>
                              )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "awards":
        return (
          resumeData.awards.length > 0 && (
            <section key={sectionId} className="mb-8">
              <div className="border-b-2 border-gray-800 mb-4">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider text-center py-2 bg-gray-100">
                  Awards & Achievements
                </h2>
              </div>
              <div className="space-y-4 px-4">
                {resumeData.awards.map((award) => (
                  <div
                    key={award.id}
                    className="border-b border-gray-200 pb-3 last:border-b-0"
                  >
                    <div className="text-left">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-gray-900">
                            {award.title}
                          </h3>
                          <p className="text-gray-800 font-semibold text-sm">
                            {award.issuer}
                          </p>
                          {award.description && (
                            <p className="text-gray-600 text-xs mt-1">
                              {award.description}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-600 text-xs font-medium ml-4">
                          {award.date}
                        </span>
                      </div>
                      {award.links.length > 0 && award.links[0] && (
                        <div className="text-left mt-1">
                          {award.links.map(
                            (link, index) =>
                              link && (
                                <span
                                  key={index}
                                  className="text-gray-700 text-xs"
                                >
                                  {index > 0 && " "}[
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                  >
                                    Link
                                  </a>
                                  ]
                                </span>
                              )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      default:
        // Handle custom sections
        if (sectionId.startsWith("custom-")) {
          const customSection = resumeData.customSections.find(
            (s) => s.id === sectionId
          );
          return (
            customSection && (
              <section key={sectionId} className="mb-8">
                <div className="border-b-2 border-gray-800 mb-4">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider text-center py-2 bg-gray-100">
                    {customSection.title}
                  </h2>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap px-4 text-sm">
                  {customSection.content}
                </div>
              </section>
            )
          );
        }
        return null;
    }
  };

  return (
    <div className={containerClass}>
      <div className="bg-white text-black p-8 min-h-full max-w-none border border-gray-300">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            {/* Profile Image - Only show if image exists */}
            {resumeData.personalInfo.profileImage && (
              <div className="flex-shrink-0">
                <div className="w-24 h-24 border-2 border-gray-800 rounded-full overflow-hidden">
                  <img
                    src={resumeData.personalInfo.profileImage}
                    alt={resumeData.personalInfo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gray-100 flex items-center justify-center text-gray-800 text-lg font-bold">
                          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4a4 4 0 00-4 4v4a4 4 0 008 0V8a4 4 0 00-4-4zM12 14v6m-4-2h8"></path>
                          </svg>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
            )}

            {/* Name and Contact Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                {resumeData.personalInfo.name || "Your Name"}
              </h1>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 text-sm">
                {resumeData.personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{resumeData.personalInfo.email}</span>
                  </div>
                )}
                {resumeData.personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{resumeData.personalInfo.phone}</span>
                  </div>
                )}
                {resumeData.personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{resumeData.personalInfo.location}</span>
                  </div>
                )}
                {resumeData.personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <span>{resumeData.personalInfo.linkedin}</span>
                  </div>
                )}
                {resumeData.personalInfo.website && (
                  <div className="flex items-center gap-2 md:col-span-2">
                    <Globe className="w-4 h-4" />
                    <span>{resumeData.personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="border-t-2 border-gray-800"></div>
        </div>

        {/* Dynamic Sections based on order */}
        {resumeData.sectionOrder.map((sectionId) => renderSection(sectionId))}
      </div>
    </div>
  );
};

export default ResumePreview;
