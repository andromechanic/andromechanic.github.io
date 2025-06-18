const { useState, useEffect, useRef } = React;

// Portfolio Data
const portfolioData = {
  "personal": {
    "name": "AKHIL M",
    "title": "Mechanical Engineer → Web Developer → AI Enthusiast",
    "summary": "Dynamic professional transitioning from mechanical engineering to programming and AI, with expertise in building software solutions and leveraging AI technologies. Experienced in Python, Java, machine learning, and AI integration, with hands-on experience in web development using JavaScript and Vue.js. A problem solver passionate about developing innovative tools."
  },
  "skills": {
    "programming": ["Python", "Java", "JavaScript"],
    "web": ["HTML", "CSS", "JavaScript", "Vue.js", "Flask", "SQLite"],
    "ai_ml": ["Prompt Engineering", "Generative AI", "Machine Learning Foundation", "LLMs (Large Language Models)"],
    "tools": ["Matplotlib", "CAD", "Fusion360", "Ansys", "Streamlit", "OpenAI", "Ollama"]
  },
  "experience": [
    {
      "title": "AI Lead",
      "company": "We Guide",
      "period": "Jun 2025 - Present",
      "description": "Drove the development of a skilled workforce by leading a startup team in delivering intensive, hands-on Python programming training. Delivered technical presentations at educational institutions and partnered with academic bodies to design workshops."
    },
    {
      "title": "Technical Lead",
      "company": "Technovate",
      "period": "Jan 2024 - May 2025",
      "description": "Led a team at a startup, mentoring students in Python programming through comprehensive training sessions. Delivered technical talks at various colleges and collaborated with institutions to create workshops."
    },
    {
      "title": "AI Intern",
      "company": "Qapp AI",
      "period": "March 2024 - May 2024",
      "description": "Collaborated on contract analysis for Protoripe, leveraging AI and machine learning for document processing and contract data extraction for RAG application."
    }
  ],
  "projects": [
    {
      "name": "Library Management System",
      "description": "Created a full-stack application to manage more than 1,000 books, achieving 95% user satisfaction rate and reducing report generation time by 40%.",
      "technologies": ["Python", "HTML", "CSS", "Flask", "Bootstrap"]
    },
    {
      "name": "Face Recognition Attendance System",
      "description": "Created a full-fledged attendance system using computer vision for fast and secure attendance capture.",
      "technologies": ["Python", "HTML", "CSS", "Flask", "Bootstrap", "Computer Vision", "MTCNN", "InceptionResnetV1"]
    },
    {
      "name": "Influencer Sponsor Engagement Platform",
      "description": "Engineered a platform connecting 500+ influencers and 200 sponsors, leading to 30% increase in sponsor engagement and 25% boost in interaction speed.",
      "technologies": ["JavaScript", "Vue.js", "SQLite", "Matplotlib"]
    },
    {
      "name": "Personal Assistant Bot",
      "description": "Designed AI-powered assistant bot that reduced user scheduling time by 35% and improved response accuracy by 20%.",
      "technologies": ["Ollama", "OpenAI", "Streamlit"]
    }
  ],
  "education": [
    {
      "degree": "Pursuing Diploma in Data Science",
      "institution": "IIT Madras",
      "period": "2024-2025"
    },
    {
      "degree": "Diploma in Programming",
      "institution": "IIT Madras",
      "period": "2023-2024"
    },
    {
      "degree": "B.Tech (Mechanical Engineering)",
      "institution": "APJ Abdul Kalam Technological University",
      "period": "2018-2022"
    }
  ],
  "social": {
    "github": "https://github.com/andromechanic",
    "linkedin": "https://www.linkedin.com/in/andromechanic",
    "email": "akhil.m2k@gmail.com"
  }
};

// Particle System
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = '#00ffff';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#00ffff';
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Falling Letter Animation
const createFallingLetter = (letter, startX, startY) => {
  const letterElement = document.createElement('div');
  letterElement.className = 'falling-letter';
  letterElement.textContent = letter;
  letterElement.style.left = startX + 'px';
  letterElement.style.top = startY + 'px';
  
  document.getElementById('falling-letters').appendChild(letterElement);
  
  setTimeout(() => {
    letterElement.remove();
  }, 3000);
};

// Navigation Component
const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];
  
  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section.toLowerCase());
    }
  };

  return (
    <nav className="nav-container">
      <div className="nav">
        <div className="nav-logo">AKHIL.M</div>
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item === 'Home' ? 'hero' : item);
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = portfolioData.personal.title;
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const handleLetterClick = (letter, event) => {
    const rect = event.target.getBoundingClientRect();
    createFallingLetter(letter, rect.left, rect.top);
    
    // Add shake animation to clicked letter
    event.target.style.animation = 'none';
    setTimeout(() => {
      event.target.style.animation = 'glow 2s ease-in-out infinite alternate';
    }, 10);
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-name">
        {portfolioData.personal.name.split('').map((letter, index) => (
          <span
            key={index}
            className="hero-letter"
            onClick={(e) => handleLetterClick(letter, e)}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
      <div className="hero-subtitle">
        {displayedText}
      </div>
      <div className="hero-cta">
        <button className="btn-futuristic" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
          Explore My Journey
        </button>
        <button className="btn-futuristic" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
          Get In Touch
        </button>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-profile">
            <img
              src="profile.png"
              alt="Akhil M"
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                boxShadow: '0 0 30px #00fff7, 0 0 60px #0ff',
                border: '3px solid #222',
                objectFit: 'cover',
                background: '#111'
              }}
            />
          </div>

          <div className="about-text">
            <p>{portfolioData.personal.summary}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const skillCategories = [
    { title: 'Programming Languages', skills: portfolioData.skills.programming, color: 'cyan' },
    { title: 'Web Development', skills: portfolioData.skills.web, color: 'purple' },
    { title: 'AI & Machine Learning', skills: portfolioData.skills.ai_ml, color: 'green' },
    { title: 'Tools & Technologies', skills: portfolioData.skills.tools, color: 'pink' }
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section Component
const ExperienceSection = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        <div className="experience-timeline">
          {portfolioData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">{exp.title}</h3>
                  <div className="experience-company">{exp.company}</div>
                </div>
                <div className="experience-period">{exp.period}</div>
              </div>
              <p className="experience-description">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {portfolioData.projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-content">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Education Section Component
const EducationSection = () => {
  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-grid">
          {portfolioData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3 className="education-degree">{edu.degree}</h3>
              <div className="education-institution">{edu.institution}</div>
              <div className="education-period">{edu.period}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#ffffff' }}>
            Ready to collaborate on your next project? Let's connect and create something amazing together!
          </p>
          
          <div className="social-links">
            <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" className="social-link">
              <span>G</span>
            </a>
            <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              <span>L</span>
            </a>
            <a href={`mailto:${portfolioData.social.email}`} className="social-link">
              <span>@</span>
            </a>
          </div>
          
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <span>{portfolioData.social.email}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Loading Component
const LoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div className="loading">
      <div className="loading-text">LOADING...</div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize particle system
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
      new ParticleSystem(canvas);
    }

    // Handle loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Handle scroll events for active section detection
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      const canvas = document.getElementById('particles-canvas');
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all sections
    setTimeout(() => {
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
      });
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <LoadingScreen isLoading={isLoading} />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));