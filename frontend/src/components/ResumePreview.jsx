import React, { useEffect, useRef, useState } from "react";
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
    ? "w-full max-w-[794px] mx-auto"
    : "h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800";

  const sectionRefs = useRef({});
  const [pages, setPages] = useState([]);

  const renderSection = (sectionId) => {
    if (!resumeData.enabledSections[sectionId]) return null;

    switch (sectionId) {
      case "summary":
        return (
          resumeData.summary && (
            <section
              key={sectionId}
              ref={(el) => (sectionRefs.current[sectionId] = el)}
              className="mb-2 break-inside-avoid"
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-center py-0.5">
                Professional Summary
              </h2>
              <div className="space-y-0.5 px-2">
                <p className="text-gray-700 leading-tight text-justify text-[11px]">
                  {resumeData.summary}
                </p>
              </div>
              <div className="border-b border-gray-800 mt-0.5"></div>
            </section>
          )
        );

      case "experience":
        return (
          resumeData.experience.length > 0 && (
            <section
              key={sectionId}
              ref={(el) => (sectionRefs.current[sectionId] = el)}
              className="mb-2 break-inside-avoid"
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-center py-0.5">
                Work Experience
              </h2>
              <div className="space-y-1 px-2">
                {resumeData.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="pb-0.5 last:pb-0 break-inside-avoid"
                  >
                    <div className="text-left">
                      <div className="flex justify-between items-start mb-0.5">
                        <div className="flex-1">
                          <h3 className="text-[12px] font-bold text-gray-900 uppercase">
                            {exp.title}
                          </h3>
                          <p className="text-[11px] text-gray-800 font-semibold">
                            {exp.company}
                          </p>
                          {exp.location && (
                            <p className="text-gray-600 text-[10px]">
                              {exp.location}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-600 text-[10px] font-medium ml-1">
                          {exp.startMonth && exp.startYear
                            ? `${exp.startMonth} ${exp.startYear}`
                            : "N/A"}{" "}
                          -{" "}
                          {exp.current
                            ? "Present"
                            : exp.endMonth && exp.endYear
                            ? `${exp.endMonth} ${exp.endYear}`
                            : "N/A"}
                        </span>
                      </div>

                      {exp.description && (
                        <p className="text-gray-700 text-[11px] mb-0.5 leading-tight">
                          {exp.description}
                        </p>
                      )}

                      {exp.achievements.length > 0 && exp.achievements[0] && (
                        <ul className="list-disc list-inside text-gray-700 text-[11px] space-y-0.5 mb-0.5 ml-1">
                          {exp.achievements.map(
                            (achievement, index) =>
                              achievement && (
                                <li key={index} className="leading-tight">
                                  {achievement}
                                </li>
                              )
                          )}
                        </ul>
                      )}

                      {exp.links.length > 0 && exp.links[0] && (
                        <div className="text-left mt-0.5">
                          {exp.links.map(
                            (link, index) =>
                              link && (
                                <span
                                  key={index}
                                  className="text-gray-700 text-[10px]"
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
              <div className="border-b border-gray-800 mt-0.5"></div>
            </section>
          )
        );

      case "education":
        return (
          resumeData.education.length > 0 && (
            <section
              key={sectionId}
              ref={(el) => (sectionRefs.current[sectionId] = el)}
              className="mb-2 break-inside-avoid"
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-center py-0.5">
                Education
              </h2>
              <div className="space-y-0.5 px-2">
                {resumeData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="pb-0.5 last:pb-0 break-inside-avoid"
                  >
                    <div className="text-left">
                      <div className="flex justify-between items-start mb-0.5">
                        <div className="flex-1">
                          <h3 className="text-[11px] font-bold text-gray-900">
                            {edu.degree || "Degree"}
                          </h3>
                          <p className="text-gray-800 font-semibold text-[11px]">
                            {edu.school || "School/University"}
                          </p>
                          {edu.location && (
                            <p className="text-gray-600 text-[10px]">
                              {edu.location}
                            </p>
                          )}
                          {(edu.gradeType || edu.gradeValue) && (
                            <p className="text-gray-600 text-[10px] mt-0.5">
                              {edu.gradeType ? `${edu.gradeType}: ` : "Grade: "}
                              {edu.gradeValue || "N/A"}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-600 text-[10px] font-medium ml-1">
                          {edu.startMonth && edu.startYear
                            ? `${edu.startMonth} ${edu.startYear}`
                            : "N/A"}{" "}
                          -{" "}
                          {edu.endMonth && edu.endYear
                            ? `${edu.endMonth} ${edu.endYear}`
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-b border-gray-800 mt-0.5"></div>
            </section>
          )
        );

      case "skills":
        return (
          resumeData.skills.length > 0 && (
            <section
              key={sectionId}
              ref={(el) => (sectionRefs.current[sectionId] = el)}
              className="mb-2 break-inside-avoid"
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-center py-0.5">
                Skills Summary
              </h2>
              <div className="space-y-0.5 px-2">
                {resumeData.skills.map((skillCategory) => (
                  <div key={skillCategory.id} className="mb-0.5">
                    <div className="flex items-start gap-0.5">
                      <span className="text-[11px] font-bold text-gray-900 min-w-0 flex-shrink-0">
                        • {skillCategory.category}:
                      </span>
                      <span className="text-gray-700 text-[11px] leading-tight">
                        {skillCategory.items.join(", ") || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-b border-gray-800 mt-0.5"></div>
            </section>
          )
        );

      case "projects":
        return (
          resumeData.projects.length > 0 && (
            <section
              key={sectionId}
              ref={(el) => (sectionRefs.current[sectionId] = el)}
              className="mb-2 break-inside-avoid"
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-center py-0.5">
                Projects
              </h2>
              <div className="space-y-1 px-2">
                {resumeData.projects.map((project) => (
                  <div
                    key={project.id}
                    className="pb-0.5 last:pb-0 break-inside-avoid"
                  >
                    <div className="text-left">
                      <h3 className="text-[11px] font-bold text-gray-900 mb-0.5">
                        {project.name}
                      </h3>
                      <p className="text-gray-700 text-[11px] mb-0.5 leading-tight">
                        {project.description}
                      </p>
                      {project.technologies.length > 0 &&
                        project.technologies[0] && (
                          <p className="text-gray-600 text-[10px] mb-0.5">
                            <strong>Technologies:</strong>{" "}
                            {project.technologies.filter(Boolean).join(", ")}
                          </p>
                        )}
                      {project.links.length > 0 && project.links[0] && (
                        <div className="text-left mt-0.5">
                          {project.links.map(
                            (link, index) =>
                              link && (
                                <span
                                  key={index}
                                  className="text-gray-700 text-[10px]"
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
              <div className="border-b border-gray-800 mt-0.5"></div>
            </section>
          )
        );

      case "certifications":
        return (
          resumeData.certifications.length > 0 && (
            <section
              key={sectionId}
              ref={(el) => (sectionRefs.current[sectionId] = el)}
              className="mb-2 break-inside-avoid"
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-center py-0.5">
                Certifications
              </h2>
              <div className="space-y-0.5 px-2">
                {resumeData.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="pb-0.5 last:pb-0 break-inside-avoid"
                  >
                    <div className="text-left">
                      <div className="flex justify-between items-start mb-0.5">
                        <div className="flex-1">
                          <h3 className="text-[11px] font-bold text-gray-900">
                            {cert.name}
                          </h3>
                          <p className="text-gray-800 font-semibold text-[11px]">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                      {cert.links.length > 0 && cert.links[0] && (
                        <div className="text-left mt-0.5">
                          {cert.links.map(
                            (link, index) =>
                              link && (
                                <span
                                  key={index}
                                  className="text-gray-700 text-[10px]"
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
              <div className="border-b border-gray-800 mt-0.5"></div>
            </section>
          )
        );

      case "awards":
        return (
          resumeData.awards.length > 0 && (
            <section
              key={sectionId}
              ref={(el) => (sectionRefs.current[sectionId] = el)}
              className="mb-2 break-inside-avoid"
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-center py-0.5">
                Awards & Achievements
              </h2>
              <div className="space-y-0.5 px-2">
                {resumeData.awards.map((award) => (
                  <div
                    key={award.id}
                    className="pb-0.5 last:pb-0 break-inside-avoid"
                  >
                    <div className="text-left">
                      <div className="flex justify-between items-start mb-0.5">
                        <div className="flex-1">
                          <h3 className="text-[11px] font-bold text-gray-900">
                            {award.title}
                          </h3>
                          <p className="text-gray-800 font-semibold text-[11px]">
                            {award.issuer}
                          </p>
                          {award.description && (
                            <p className="text-gray-600 text-[10px] mt-0.5">
                              {award.description}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-600 text-[10px] font-medium ml-1">
                          {award.date}
                        </span>
                      </div>
                      {award.links.length > 0 && award.links[0] && (
                        <div className="text-left mt-0.5">
                          {award.links.map(
                            (link, index) =>
                              link && (
                                <span
                                  key={index}
                                  className="text-gray-700 text-[10px]"
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
              <div className="border-b border-gray-800 mt-0.5"></div>
            </section>
          )
        );

      default:
        if (sectionId.startsWith("custom-")) {
          const customSection = resumeData.customSections.find(
            (s) => s.id === sectionId
          );
          return (
            customSection && (
              <section
                key={sectionId}
                ref={(el) => (sectionRefs.current[sectionId] = el)}
                className="mb-2 break-inside-avoid"
              >
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-center py-0.5">
                  {customSection.title}
                </h2>
                <div className="space-y-0.5 px-2">
                  <div className="text-gray-700 leading-tight whitespace-pre-wrap text-[11px]">
                    {customSection.content}
                  </div>
                </div>
                <div className="border-b border-gray-800 mt-0.5"></div>
              </section>
            )
          );
        }
        return null;
    }
  };

  useEffect(() => {
    const sections = resumeData.sectionOrder
      .map((sectionId) => renderSection(sectionId))
      .filter(Boolean);

    const headerHeight = resumeData.personalInfo.profileImage ? 100 : 50; // Compact header height
    const maxPageHeight = 1083; // A4 height (1123px) minus 20px top + 20px bottom padding
    const newPages = [];
    let currentPage = [];
    let currentHeight = 0;

    sections.forEach((section, index) => {
      const sectionEl = sectionRefs.current[section.key];
      const sectionHeight = sectionEl ? sectionEl.offsetHeight : 50; // Fallback height

      const pageHeaderHeight = newPages.length === 0 ? headerHeight : 0;

      // Start a new page if content overflows, even for a small amount
      if (currentHeight + sectionHeight + pageHeaderHeight > maxPageHeight) {
        if (currentPage.length > 0) {
          newPages.push(currentPage);
          currentPage = [];
          currentHeight = 0;
        }
      }

      currentPage.push(section);
      currentHeight += sectionHeight;

      if (index === sections.length - 1 && currentPage.length > 0) {
        newPages.push(currentPage);
      }
    });

    setPages(newPages);
  }, [resumeData]);

  return (
    <div className={containerClass}>
      {pages.map((pageSections, pageIndex) => (
        <div
          key={pageIndex}
          className="bg-white text-black border border-gray-300 mb-2"
          style={{
            width: "794px",
            minHeight: "1123px", // Ensure minimum height to avoid overflow
            boxSizing: "border-box",
            padding: "20px",
            fontFamily: "'Arial', sans-serif",
            pageBreakAfter: pages.length - 1 === pageIndex ? "auto" : "always",
            breakInside: "avoid",
            overflow: "visible", // Allow content to flow naturally
          }}
        >
          {/* Header - Only on the first page */}
          {pageIndex === 0 && (
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-0.5">
                {/* Profile Image - Only show if image exists */}
                {resumeData.personalInfo.profileImage && (
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 border border-gray-800 rounded-full overflow-hidden">
                      <img
                        src={resumeData.personalInfo.profileImage}
                        alt={resumeData.personalInfo.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full bg-gray-100 flex items-center justify-center text-gray-800 text-[10px] font-bold">
                              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                  <h1 className="text-base font-bold text-gray-900 mb-0.5 uppercase tracking-wide text-center">
                    {resumeData.personalInfo.name || "Your Name"}
                  </h1>

                  {/* Contact Info Single Line Centered */}
                  <div className="flex flex-wrap items-center justify-center gap-1 text-gray-600 text-[10px]">
                    {resumeData.personalInfo.email && (
                      <span className="flex items-center gap-0.5">
                        <Mail className="w-3 h-3" />
                        {resumeData.personalInfo.email}
                      </span>
                    )}
                    {resumeData.personalInfo.email &&
                      (resumeData.personalInfo.phone ||
                        resumeData.personalInfo.location ||
                        resumeData.personalInfo.linkedin ||
                        resumeData.personalInfo.website) && <span>|</span>}
                    {resumeData.personalInfo.phone && (
                      <span className="flex items-center gap-0.5">
                        <Phone className="w-3 h-3" />
                        {resumeData.personalInfo.phone}
                      </span>
                    )}
                    {resumeData.personalInfo.phone &&
                      (resumeData.personalInfo.location ||
                        resumeData.personalInfo.linkedin ||
                        resumeData.personalInfo.website) && <span>|</span>}
                    {resumeData.personalInfo.location && (
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3 h-3" />
                        {resumeData.personalInfo.location}
                      </span>
                    )}
                    {resumeData.personalInfo.location &&
                      (resumeData.personalInfo.linkedin ||
                        resumeData.personalInfo.website) && <span>|</span>}
                    {resumeData.personalInfo.linkedin && (
                      <span className="flex items-center gap-0.5">
                        <Linkedin className="w-3 h-3" />
                        {resumeData.personalInfo.linkedin}
                      </span>
                    )}
                    {resumeData.personalInfo.linkedin &&
                      resumeData.personalInfo.website && <span>|</span>}
                    {resumeData.personalInfo.website && (
                      <span className="flex items-center gap-0.5">
                        <Globe className="w-3 h-3" />
                        {resumeData.personalInfo.website}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800"></div>
            </div>
          )}

          {/* Page Sections */}
          <div style={{ overflow: "visible" }}>{pageSections}</div>
        </div>
      ))}
    </div>
  );
};

export default ResumePreview;