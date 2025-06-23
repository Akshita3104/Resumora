module.exports = {
  domainInstructions: `
The candidate is applying in the **Tech domain** (software/web development, AI/ML, data science, DevOps, etc.). Evaluate the resume with detailed guidelines, tailoring feedback to the sub-domain (e.g., DevOps, Data Science).

### Skill Taxonomy
- **Frontend Development**: JavaScript (ES6+), TypeScript, HTML5, CSS3, React, Angular, Vue.js, Next.js, Tailwind CSS, Webpack
- **Backend Development**: Python, Java, Node.js, Express, Django, Spring Boot, REST, GraphQL
- **Cloud Computing**: AWS (EC2, S3, Lambda), Azure, Google Cloud, Kubernetes, Docker, Terraform
- **Databases**: MySQL, PostgreSQL, MongoDB, Redis, Prisma
- **DevOps**: Git, GitHub, Jenkins, CircleCI, Prometheus, Linux, Ansible
- **AI/ML**: TensorFlow, PyTorch, Scikit-learn, Pandas, NLP, SageMaker
- **Mobile Development**: Swift, Kotlin, React Native, Flutter, Xcode
- **Testing**: Jest, Cypress, Selenium, JMeter
- **Emerging Tech**: Solidity, Web3.js, Qiskit, Unity
- **Soft Skills**: Communication, Teamwork, Leadership, Problem-solving
- **Project Management**: Agile, Scrum, Jira, Trello

### Semantic Skill Mapping
- "Led team", "Managed project" → Leadership
- "Collaborated", "Team environment" → Teamwork
- "Optimized", "Improved" → Problem-solving
- "Presented", "Communicated" → Communication

### Scoring Guidelines
- **Weighting**: Structure (30%), Keywords (40%), Experience (20%), Metrics (10%).
- **Penalties**:
  - Missing critical sections (Contact, Skills, Experience, Education): -12 per section.
  - Missing optional sections (Projects, Certifications): -6 per section.
  - No quantifiable metrics: -10 per section.
  - Vague job descriptions: -6 per instance, max -18.
  - Non-ATS-friendly formatting (tables, images): -10.
  - Non-standard fonts: -6.
  - Missing sub-domain skills (e.g., Kubernetes for DevOps): -5 per skill, max -20.
  - No GitHub/Portfolio: -8.
  - Outdated certifications (>3 years): -5 per instance.
  - Grammar/typos: -3 per issue, max -12.
  - Keyword density <1%: -8 per skill.
  - Job description mismatch: -5 per missing critical skill, max -15.
- **Thresholds**:
  - Resume Format: 100 (all sections, clear headers), 85 (3 critical), 70 (2 critical), 50 (1 critical), 25 (poor), 0 (unparseable).
  - Contact: 100 (4+ items), 90 (3 items), 80 (2 items), 60 (1 item), 0 (none).
  - Keywords: 100 (12+ categories, 20+ skills), 85 (9–11), 70 (6–8), 50 (3–5), 25 (1–2), 0 (none).
  - Experience: 100 (4+ roles, >24 months), 85 (3 roles, >12 months), 70 (2 roles, >6 months), 50 (1 role, >3 months), 25 (vague), 0 (none).
  - Metrics: 100 (5+ metrics, 3+ high-impact), 85 (4 metrics, 2 high-impact), 70 (3 metrics), 50 (2 metrics), 25 (1 vague), 0 (none).
  - Education: 85 (present with degree), 70 (partial details), 0 (missing).
  - Certifications: 85 (present and recent), 70 (present but outdated), 0 (missing).
- **Quality Labels**: Exceptional (>90), Excellent (81–90), Good (71–80), Needs Work (51–70), Critical (≤50).

### Job Description Matching
- Extract critical skills from the job description (e.g., "Requires Docker, Kubernetes").
- Penalize missing skills (-5 each, max -15).
- Reward exact matches (+3 per skill, max +12).

### ATS Best Practices
- Use standard fonts (Arial, Calibri, 10–12pt).
- Avoid tables, images, headers/footers.
- Ensure keyword density of 1–2% for critical skills.
- Include measurable achievements (e.g., "Reduced latency by 30%").
- Provide clickable GitHub/Portfolio links.
- List recent certifications (<3 years) with dates.

### Sub-Domain Tailoring
- **Software Development**: Require GitHub links, full-stack skills.
- **AI/ML**: Emphasize frameworks, metrics (e.g., model accuracy).
- **DevOps**: Require CI/CD, cloud, Kubernetes.
- **Mobile**: Require platform skills, app store links.
`
};