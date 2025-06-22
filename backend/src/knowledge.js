module.exports = {
  domainInstructions: `
The candidate is applying in the **Tech domain** (software/web development, AI/ML, data science, DevOps, etc.). Evaluate the resume with the following detailed guidelines, tailoring feedback to the specific sub-domain where applicable (e.g., DevOps, Data Science).

### Skill Taxonomy
Detect and evaluate the following technical and soft skills, grouped by category, ensuring coverage across relevant tech stacks:

- **Frontend Development**:
  - Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, SASS, LESS
  - Frameworks/Libraries: React, Angular, Vue.js, Svelte, Next.js, Gatsby, Tailwind CSS, Bootstrap
  - Tools: Webpack, Vite, Parcel, Chrome DevTools, Lighthouse
- **Backend Development**:
  - Languages: Python, Java, C#, Go, Rust, Ruby, PHP, Scala, Kotlin, Node.js
  - Frameworks: Express, Django, Flask, Spring Boot, Ruby on Rails, Laravel, ASP.NET
  - APIs: REST, GraphQL, gRPC, WebSocket
- **Cloud Computing**:
  - Platforms: AWS (EC2, S3, Lambda), Azure, Google Cloud, IBM Cloud
  - Tools: Kubernetes, Docker, Terraform, CloudFormation, Serverless Framework, Helm
  - Services: IAM, RDS, DynamoDB, Blob Storage, Cloud Functions
- **Databases**:
  - SQL: MySQL, PostgreSQL, Oracle, SQL Server
  - NoSQL: MongoDB, Redis, Cassandra, Elasticsearch, Firebase
  - Tools: Prisma, Sequelize, Mongoose, SQL Workbench
- **DevOps & Infrastructure**:
  - Version Control: Git, GitHub, GitLab, Bitbucket
  - CI/CD: Jenkins, CircleCI, GitHub Actions, Azure DevOps, Travis CI
  - Monitoring: Prometheus, Grafana, New Relic, Datadog
  - Systems: Linux, Bash, Nginx, Apache, Ansible, Puppet
- **AI/ML & Data Science**:
  - Frameworks: TensorFlow, PyTorch, Scikit-learn, Keras, Hugging Face, XGBoost
  - Tools: Jupyter, Pandas, NumPy, Matplotlib, Seaborn, Apache Spark
  - Techniques: NLP, Computer Vision, Reinforcement Learning, Time Series Analysis
  - Platforms: SageMaker, Vertex AI, Databricks
- **Mobile Development**:
  - Platforms: iOS (Swift, SwiftUI), Android (Kotlin, Jetpack Compose)
  - Frameworks: React Native, Flutter, Xamarin, Ionic, Capacitor
  - Tools: Xcode, Android Studio, Gradle
- **Testing & QA**:
  - Unit Testing: Jest, Mocha, JUnit, pytest, Vitest
  - E2E Testing: Cypress, Selenium, Playwright, Appium
  - Performance: JMeter, LoadRunner, WebPageTest
- **Emerging Tech**:
  - Blockchain: Solidity, Web3.js, Ethereum, Hyperledger
  - IoT: MQTT, Raspberry Pi, Arduino
  - Quantum: Qiskit, Cirq
  - AR/VR: Unity, Unreal Engine, ARKit, ARCore
- **Soft Skills**:
  - Core: Communication, Teamwork, Problem-solving, Adaptability, Time Management
  - Leadership: Project Management, Mentoring, Stakeholder Engagement
- **Project Management**:
  - Methodologies: Agile, Scrum, Kanban, Waterfall
  - Tools: Jira, Trello, Asana, Monday.com, Confluence

### Scoring Guidelines
- **Weighting**: Structure (30%), Keywords (40%), Experience (20%), Metrics (10%).
- **Penalties**:
  - Missing critical sections (Contact, Skills, Experience, Education): -10 per section.
  - Missing optional sections (Projects, Certifications): -5 per section.
  - No quantifiable metrics: -8 per relevant section (Experience, Projects).
  - Vague job descriptions (e.g., "Worked on projects"): -5 per instance, max -15.
  - Non-ATS-friendly formatting (e.g., tables, images, headers/footers): -8.
  - Non-standard fonts (e.g., Comic Sans) or inconsistent styling: -5.
  - Missing key skills for sub-domain (e.g., Kubernetes for DevOps): -3 per skill, max -12.
  - No GitHub/Portfolio links for development roles: -6.
  - Outdated certifications (>3 years old): -4 per instance.
  - Grammar/typos: -2 per issue, max -10.
  - Keyword density <1% for critical skills: -5 per skill.
- **Thresholds**:
  - **Resume Format (30%)**: 100 (all critical sections, clear headers), 90 (3 critical sections), 75 (2 critical sections), 50 (1 section), 25 (poor structure), 0 (unparseable).
  - **Contact Information**: 100 (4+ items: email, phone, LinkedIn, GitHub), 95 (3 items), 85 (2 items), 65 (1 item), 0 (none).
  - **Keywords (40%)**: 100 (12+ categories, >20 skills), 90 (9–11 categories), 80 (6–8 categories), 65 (3–5 categories), 40 (1–2 categories), 0 (none).
  - **Experience (20%)**: 100 (4+ roles, >24 months, tailored), 90 (3 roles, >12 months), 80 (2 roles, >6 months), 65 (1 role, >3 months), 40 (1 role, vague), 0 (none).
  - **Metrics (10%)**: 100 (5+ specific metrics, 3+ high-impact), 90 (4 metrics, 2 high-impact), 80 (3 metrics, 1 high-impact), 70 (2 metrics), 50 (1 vague metric), 0 (none).
- **Quality Labels**: Exceptional (>90, rare), Excellent (81–90), Good (71–80), Needs Work (51–70), Critical (≤50).
- **Cap**: Scores >90 require perfect sections, 15+ skill categories, 4+ high-impact metrics, and tailored content.

### ATS Best Practices
- **Formatting**:
  - Use standard fonts (Arial, Calibri, Times New Roman, 10–12pt).
  - Avoid tables, columns, images, headers/footers, or complex layouts.
  - Use consistent bullet styles (e.g., • or -) and clear section headers (e.g., "Work Experience").
  - Ensure keyword density of 1–2% for critical skills (e.g., Python, AWS).
- **Content**:
  - Include measurable achievements (e.g., "Reduced API latency by 25% using Node.js").
  - Provide clickable GitHub/Portfolio links for projects, ensuring repositories are public and well-documented.
  - Tailor job descriptions to the sub-domain (e.g., emphasize CI/CD for DevOps, NLP for AI/ML).
  - List recent certifications (<3 years old) with issuer and date.
  - Use action verbs (e.g., "Developed", "Optimized", "Led") and avoid generic phrases (e.g., "Responsible for").
- **Tech Focus**:
  - Prioritize skills matching the sub-domain (e.g., Kubernetes for DevOps, PyTorch for AI/ML).
  - Evaluate project complexity (e.g., full-stack apps, ML models) and technical depth (e.g., algorithms, architecture).
  - Check for role-specific tools (e.g., Jira for Agile, Databricks for Data Science).

### Sub-Domain Tailoring
- **Software/Web Development**: Emphasize full-stack skills, APIs, and project links. Penalize missing GitHub (-6).
- **AI/ML/Data Science**: Focus on frameworks (e.g., TensorFlow), datasets, and metrics (e.g., model accuracy). Penalize missing publications or Kaggle profiles (-4).
- **DevOps**: Prioritize CI/CD, cloud platforms, and monitoring tools. Penalize missing Kubernetes/Docker (-8).
- **Mobile Development**: Highlight platform-specific skills (e.g., Swift, Kotlin) and app store links. Penalize missing mobile projects (-6).

Use this context to evaluate the resume rigorously, providing actionable, sub-domain-specific feedback. Ensure scoring is strict, with most resumes scoring 70–80 unless exceptional.
`
};