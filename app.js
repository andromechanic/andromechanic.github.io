const { useState, useEffect, useRef } = React;

// Portfolio Data
const portfolioData = {
  "personal": {
    "name": "AKHIL M",
    "title": "Mechanical Engineer → Web Developer → AI Enthusiast",
    "summary": "Dynamic professional transitioning from mechanical engineering to programming and AI, with expertise in building software solutions and leveraging AI technologies. Experienced in Python, Java, machine learning, and AI integration, with hands-on experience in web development using JavaScript and Vue.js. A problem solver passionate about developing innovative tools."
  },
  "skills": {
    "programming": ["Python","C", "Java", "JavaScript"],
    "web": ["HTML", "CSS", "JavaScript", "Vue.js", "Flask", "SQLite"],
    "ai_ml": ["Prompt Engineering", "Generative AI", "Machine Learning Techniques", "NLP","Fine Tuning LLMs"],
    "tools": ["Scikit-Learn","Tensorflow","PyTorch","Streamlit", "OpenAI", "Ollama" ,"CAD", "Fusion360", "Ansys"]
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

// Enhanced Particle System
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    for (let i = 0; i < 180; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: this.getRandomColor(),
        life: Math.random() * 200 + 100
      });
    }
    
    this.animate();
  }

  getRandomColor() {
    const colors = ['#00ffff', '#9d4edd', '#39ff14', '#ff10f0', '#00d4ff', '#ff6b35'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      if (particle.life <= 0) {
        particle.life = Math.random() * 200 + 100;
        particle.color = this.getRandomColor();
      }
      
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = particle.color;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
      
      // Connect nearby particles
      this.particles.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            this.ctx.save();
            this.ctx.globalAlpha = (100 - distance) / 100 * 0.2;
            this.ctx.strokeStyle = particle.color;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(otherParticle.x, otherParticle.y);
            this.ctx.stroke();
            this.ctx.restore();
          }
        }
      });
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Name Animation Controller
class NameAnimationController {
  constructor() {
    this.animationSequence = [
      { letter: 'A', index: 0, animation: 'rain-bounce', delay: 500 },
      { letter: 'K', index: 1, animation: 'slide-from-right', delay: 1500 },
      { letter: 'H', index: 2, animation: 'slide-from-right', delay: 2000 },
      { letter: 'I', index: 3, animation: 'slanted-interactive', delay: 500 },
      { letter: 'L', index: 4, animation: 'roll-from-right', delay: 0 },
      { letter: ' ', index: 5, animation: 'instant', delay: 0 },
      { letter: 'M', index: 6, animation: 'roll-from-right', delay: 200 }
    ];
    this.isIClicked = false;
  }

  startSequence() {
    this.animationSequence.forEach((item, index) => {
    if (item.letter !== 'L' && item.letter !== 'M' && item.letter !== ' ') { 
        setTimeout(() => {
            this.animateLetter(item.index, item.animation);
        }, item.delay);
    }
  });
  }

  animateLetter(index, animationType) {
    const letters = document.querySelectorAll('.hero-letter');
    if (letters[index]) {
      letters[index].classList.add(animationType);
      
      if (animationType === 'slanted-interactive') {
        letters[index].classList.add('interactive-letter');
      }
    }
  }

  handleLetterClick(index) {
    if (index === 3 && !this.isIClicked) {
      this.isIClicked = true;
      const letters = document.querySelectorAll('.hero-letter');
      
      letters[3].classList.remove('slanted-interactive');
      letters[3].classList.add('correct-orientation');
      
      setTimeout(() => {
        this.animateLetter(4, 'roll-from-right');
      }, 300);
      setTimeout(() => {
        this.animateLetter(6, 'roll-from-right');
      }, 500);
    }
  }
}

// Advanced Stacking Cards Controller
class StackingCardsController {
  constructor() {
    this.cards = [];
    this.isInitialized = false;
    this.skillsSection = null;
    this.progressDots = [];
    this.scrollHandler = this.handleScroll.bind(this); // Bind once
    this.init();
  }

  init() {
    // Moved setupScrollListener and setupCards into a setTimeout to ensure DOM is ready
    setTimeout(() => {
      this.setupCards();
      // Only set up scroll listener and mark as initialized if cards are found
      if (this.cards.length > 0) {
        this.setupScrollListener();
        this.isInitialized = true;
      } else {
        console.warn("No skill cards found for StackingCardsController.");
      }
    }, 1000); // Wait for DOM to be ready and React components to render
  }

  setupCards() {
    this.skillsSection = document.getElementById('skills');
    if (!this.skillsSection) {
      console.warn("Skills section not found by StackingCardsController.");
      return;
    }

    const skillCards = this.skillsSection.querySelectorAll('.skill-category');
    this.cards = Array.from(skillCards);

    if (this.cards.length === 0) return;

    this.createProgressIndicator();
    this.setInitialCardPositions();
  }

  createProgressIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'skills-progress-indicator';

    for (let i = 0; i < this.cards.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'progress-dot';
      dot.addEventListener('click', () => this.scrollToCard(i));
      this.progressDots.push(dot);
      indicator.appendChild(dot);
    }

    // Append to body only if it's not already there (to prevent duplicates on re-render)
    if (!document.querySelector('.skills-progress-indicator')) {
      document.body.appendChild(indicator);
    }
  }

  setInitialCardPositions() {
    this.cards.forEach((card, index) => {
      // Increased offsetY for more initial vertical spread
      const offsetY = index * 60; // Adjusted from 40 for more initial space
      const offsetZ = index * -50;
      const rotation = (index % 2 === 0 ? 1 : -1) * index * 3;
      const scale = 1 - (index * 0.04);

      card.style.transform = `
        translateY(${offsetY}px)
        translateZ(${offsetZ}px)
        rotateX(${rotation * 0.5}deg)
        rotateY(${rotation}deg)
        scale(${scale})
      `;
      card.style.zIndex = this.cards.length - index; // Ensure earlier cards are below
      card.classList.add('stacked'); // Keep this class for initial styling if needed
    });
  }

  setupScrollListener() {
    let ticking = false;

    // Use the bound scroll handler
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  handleScroll() {
    if (!this.skillsSection || this.cards.length === 0 || !this.isInitialized) return;

    const scrollTop = window.pageYOffset;
    const sectionTop = this.skillsSection.offsetTop;
    const sectionHeight = this.skillsSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Adjust these values to fine-tune when the stacking animation starts and ends
    const animationStartScroll = sectionTop - windowHeight * 0.8; // Start animation earlier
    const animationEndScroll = sectionTop + sectionHeight * 0.7; // End animation sooner within the section

    const totalAnimationScrollRange = animationEndScroll - animationStartScroll;
    const overallProgress = Math.max(0, Math.min(1, (scrollTop - animationStartScroll) / totalAnimationScrollRange));

    const numCards = this.cards.length;
    // How much of the overallProgress each card uses for its main entry animation
    const scrollRangePerCard = 0.6;
    // Delay in overallProgress before next card starts animating
    // This creates the "comes up from below and stacks over" effect
    const delayBetweenCards = 0.15; // Slightly reduced for a tighter sequence

    this.cards.forEach((card, index) => {
      const cardActivationStartProgress = index * delayBetweenCards;
      // Calculate individual card's progress based on overall scroll
      let currentCardAnimationProgress = 0;
      if (overallProgress >= cardActivationStartProgress) {
        currentCardAnimationProgress = Math.min(1, (overallProgress - cardActivationStartProgress) / scrollRangePerCard);
      }
      const easedEntryProgress = this.easeOutCubic(currentCardAnimationProgress);

      const slideUpStartOffset = 500; // Starting point for card animation (how far below it starts)
      // Controls the vertical space between cards once they are "stacked"
      const stackedVerticalGap = 60; // Adjusted from 40 for more space when stacked

      let currentY;
      let currentOpacity;
      let currentScale;
      let currentZIndex;
      let currentRotationX;
      let currentRotationY;
      let currentTranslateZ;

      // Base Y for this card in the settled stack (e.g., card 0 at 0, card 1 at -60, card 2 at -120 for stacking upwards)
      // To stack OVER, the card's final Y position should be higher (more negative) than the one below it.
      const finalBaseYForStack = -(index * stackedVerticalGap);

      if (easedEntryProgress === 0) {
        // Card is not yet animating: positioned below, scaled down, invisible
        currentY = finalBaseYForStack + slideUpStartOffset;
        currentOpacity = 0;
        currentScale = 0.8;
        currentZIndex = index + 1; // Lower z-index when hidden/far away
        currentRotationX = 0;
        currentRotationY = 0;
        currentTranslateZ = 0;
      } else {
        // Card is animating in or has fully settled
        currentY = finalBaseYForStack + (1 - easedEntryProgress) * slideUpStartOffset;
        currentOpacity = easedEntryProgress;
        currentScale = 0.8 + (0.2 * easedEntryProgress); // Scale up from 0.8 to 1

        // Apply a subtle 3D effect during animation, then settle flat
        const initialRotationX = (index % 2 === 0 ? 5 : -5); // Small initial tilt
        const initialRotationY = (index % 2 === 0 ? 8 : -8);
        const initialTranslateZ = -50; // Start slightly back

        currentRotationX = initialRotationX * (1 - easedEntryProgress);
        currentRotationY = initialRotationY * (1 - easedEntryProgress);
        currentTranslateZ = initialTranslateZ * (1 - easedEntryProgress);

        // Dynamic z-index: higher Z for animating cards or the current top card
        // Cards higher in the list should visually appear on top in the stack
        currentZIndex = (numCards - index) * 10; // Base z-index, higher index means lower in array, so subtract from numCards
        if (easedEntryProgress < 1) {
          currentZIndex += 100; // Give a boost while animating to ensure it's on top
        }
      }

      card.style.transform = `
        translateY(${currentY}px)
        translateZ(${currentTranslateZ}px)
        rotateX(${currentRotationX}deg)
        rotateY(${currentRotationY}deg)
        scale(${currentScale})
      `;
      card.style.opacity = Math.min(1, currentOpacity);
      card.style.zIndex = Math.round(currentZIndex); // Ensure zIndex is an integer
    });
  }

  updateProgressIndicator() {
    if (!this.skillsSection) return;

    const scrollTop = window.pageYOffset;
    const sectionTop = this.skillsSection.offsetTop;
    const sectionHeight = this.skillsSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate progress based on the middle of the skills section
    const progress = Math.max(0, Math.min(1,
      (scrollTop + windowHeight * 0.5 - sectionTop) / sectionHeight
    ));

    // Determine which card is "active" based on scroll progress
    // This is a simplified mapping, adjust if you want precise activation
    const activeIndex = Math.floor(overallProgress * this.cards.length); // Use overallProgress for better sync

    this.progressDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  scrollToCard(index) {
    if (!this.skillsSection || this.cards.length === 0) return;

    // Calculate the scroll position to bring the specific card into view
    // This might need adjustment based on how much you want to reveal
    const targetCardTop = this.cards[index].getBoundingClientRect().top + window.scrollY;
    // Adjust scroll position to center the card or bring it to a specific point
    const scrollPosition = targetCardTop - window.innerHeight / 3; // Example: bring to top third of viewport

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  destroy() {
    window.removeEventListener('scroll', this.scrollHandler);
    // Remove the progress indicator from the DOM on destroy
    const indicator = document.querySelector('.skills-progress-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
}


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
const HeroSection = ({ nameController }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = portfolioData.personal.title;
  
  // In HeroSection component
useEffect(() => {
    // Only start the name animation sequence once on mount
    if (nameController) {
        nameController.startSequence();
    }

    let typingTimer; // Declare a variable to hold the setInterval ID
    let initialDelayTimer; // Declare a variable to hold the initial setTimeout ID

    // This setTimeout wraps the typing animation
    initialDelayTimer = setTimeout(() => {
        let index = 0;
        typingTimer = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingTimer);
            }
        }, 100); // Keep your preferred speed (e.g., 100ms or 120ms)
    }, 3000); // Your initial delay for the typing animation

    // Cleanup function: This runs when the component unmounts or
    // before the useEffect runs again if dependencies change.
    return () => {
        if (initialDelayTimer) {
            clearTimeout(initialDelayTimer); // Clear the initial delay timer
        }
        if (typingTimer) {
            clearInterval(typingTimer); // Clear the typing interval
        }
    };
  }, [nameController, fullText]); // Dependencies: nameController and fullText

  const handleLetterClick = (index, event) => {
    if (nameController) {
      nameController.handleLetterClick(index);
    }
    
    const rect = event.target.getBoundingClientRect();
    createClickEffect(rect.left + rect.width/2, rect.top + rect.height/2);
  };

  const createClickEffect = (x, y) => {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    document.body.appendChild(effect);
    
    setTimeout(() => {
      effect.remove();
    }, 1000);
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-name-container">
        <div className="hero-name">
          {portfolioData.personal.name.split('').map((letter, index) => (
            <span
              key={index}
              className="hero-letter"
              onClick={(e) => handleLetterClick(index, e)}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
      </div>
      <div className="hero-subtitle">
        <span className="typing-text">{displayedText}</span>
      </div>
      <div className="hero-cta">
        <button className="btn-futuristic" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
          Explore My Journey
        </button>
        <button className="btn-futuristic secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
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
              alt="Akhil M's Profile Picture" 
              className="about-profile-image" 
            />
          </div>
          <div className="about-text">
            <p>{portfolioData.personal.summary}</p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Technologies Mastered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Skills Section with Advanced Stacking
const SkillsSection = () => {
  const skillCategories = [
    { title: 'Programming Languages', skills: portfolioData.skills.programming },
    { title: 'Web Development', skills: portfolioData.skills.web },
    { title: 'AI & Machine Learning', skills: portfolioData.skills.ai_ml },
    { title: 'Tools & Technologies', skills: portfolioData.skills.tools }
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-container">
          <div className="skills-stack">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
                <h3>{category.title}</h3>
                <div className="skill-tags">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="card-overlay"></div>
              </div>
            ))}
          </div>
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
              <div className="experience-number">{String(index + 1).padStart(2, '0')}</div>
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
              <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
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
              <div className="education-number">{String(index + 1).padStart(2, '0')}</div>
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
          <p className="contact-description">
            Ready to collaborate on your next project? Let's connect and create something amazing together!
          </p>
          
          <div className="social-links">
            <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" className="social-link">
              <span>GH</span>
            </a>
            <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              <span>LI</span>
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
      <div className="loading-animation">
        <div className="loading-text">INITIALIZING</div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const nameControllerRef = useRef(null);
  const stackingControllerRef = useRef(null);
  const particleSystemRef = useRef(null);

  useEffect(() => {
    // Initialize controllers
    nameControllerRef.current = new NameAnimationController();
    stackingControllerRef.current = new StackingCardsController();

    // Initialize particle system
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
      particleSystemRef.current = new ParticleSystem(canvas);
    }

    // Handle loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

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

    // Handle window resize
    const handleResize = () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.resize();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

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

    // Observe all sections after loading
    const observeSections = () => {
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
      });
    };

    const sectionTimer = setTimeout(observeSections, 100);

    // Cleanup function
    return () => {
      clearTimeout(loadTimer);
      clearTimeout(sectionTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      
      if (particleSystemRef.current) {
        particleSystemRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="app">
      <LoadingScreen isLoading={isLoading} />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <HeroSection nameController={nameControllerRef.current} />
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
