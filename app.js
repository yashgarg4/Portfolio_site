// Gemini API Configuration
const GEMINI_API_KEY = "AIzaSyDCohfEa_vCSUj39CeWAD2NHzidlwzS44o";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// portfolio context for AI responses
const PORTFOLIO_CONTEXT = `
You are Yash Garg's AI assistant on his portfolio website. Here's his information:

PERSONAL INFO:
- Name: Yash Garg
- Title: Full-Stack Developer & AI Engineer
- Phone: +91 7428846924
- Email: yashgargg4@gmail.com
- Summary: Versatile Full-Stack Developer & AI Engineer with experience building cross-platform applications, intelligent automation tools, and agentic AI systems.

CURRENT ROLE:
- Position: Associate Engineer – JioGames at Jio Platforms Limited, Mumbai
- Duration: December 2023 – Present
- Key achievements: Built cross-platform games with JioGames SDK, developed automated scraping tools, created responsive ad layouts, validated 150+ games and resolved 600+ issues, authored SDK documentation, optimized workflows reducing build cycles to 4-5 per game.

SKILLS:
- Programming Languages: JavaScript, Python, C#, Java, HTML, CSS
- AI & Agentic Systems: LLMs, Agentic AI, CrewAI, Multi-Agent Systems, LiteLLM, Gemini LLM
- Frameworks & Libraries: React, Node.js, Express, Streamlit, Pandas
- Tools & Platforms: Docker & Kubernetes, Git & GitHub, MongoDB & MySQL, Unity, Android Studio

PROJECTS:
1. AI Travel Planner App: Built with Streamlit, CrewAI, Python, Gemini LLM. Generates personalized multi-day itineraries with map-based sightseeing, cost estimation, cultural tips.
2. AI Job Application Assistant: Built with Streamlit, CrewAI, Python, LLMs. Parses resumes and JDs, generates tailored resumes and cover letters.
3. AI Financial Analyst Assistant: Built with Python, CrewAI, LLM, Streamlit. Automates financial analysis and company research.

EDUCATION:
- Bachelor of Technology in Information Technology
- Maharaja Surajmal Institute of Technology, Delhi
- Graduated: August 2023, CGPA: 9.06

CERTIFICATIONS:
- Programming with JavaScript
- Become a Full-Stack Developer
- Containers with Docker and Kubernetes

ACCOMPLISHMENTS:
- Best Debutant Award, Jio Platforms Limited

Provide helpful, professional responses about Yash Garg's background, skills, experience, and projects. Be engaging and informative while maintaining a professional tone.
`;

// Global variables for chatbot
let isChatboxOpen = false;
let conversationHistory = [];

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing modern portfolio...");

  // =====================
  // NAVIGATION FUNCTIONALITY
  // =====================

  // Get all navigation elements
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");
  const themeToggle = document.getElementById("themeToggle");

  console.log("Navigation elements found:", {
    mobileMenuToggle: !!mobileMenuToggle,
    navMenu: !!navMenu,
    navLinks: navLinks.length,
    navbar: !!navbar,
    themeToggle: !!themeToggle,
  });

  // Smooth scrolling function
  function smoothScrollTo(targetId) {
    console.log("Smooth scrolling to:", targetId);
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const offsetTop = targetSection.offsetTop - navbarHeight - 20;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      return true;
    }
    console.warn("Target section not found:", targetId);
    return false;
  }

  // Navigation links smooth scrolling
  navLinks.forEach((link, index) => {
    console.log(`Setting up nav link ${index}:`, link.getAttribute("href"));

    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      console.log("Nav link clicked:", targetId);

      if (targetId && targetId.startsWith("#")) {
        const success = smoothScrollTo(targetId);
        if (success) {
          // Update active state
          navLinks.forEach((l) => l.classList.remove("active"));
          this.classList.add("active");
        }
      }

      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        if (mobileMenuToggle) {
          const icon = mobileMenuToggle.querySelector("i");
          if (icon) {
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
          }
        }
      }
    });
  });

  // Hero section buttons
  const heroButtons = document.querySelectorAll('.hero-actions a[href^="#"]');
  console.log("Hero buttons found:", heroButtons.length);

  heroButtons.forEach((button, index) => {
    console.log(
      `Setting up hero button ${index}:`,
      button.getAttribute("href")
    );

    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      console.log("Hero button clicked:", targetId);

      if (targetId && targetId.startsWith("#")) {
        smoothScrollTo(targetId);
      }
    });
  });

  // Mobile menu toggle
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Mobile menu toggle clicked");
      navMenu.classList.toggle("active");
      const icon = this.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });
  }

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener("click", function (e) {
      e.preventDefault();
      const currentTheme = document.body.getAttribute("data-color-scheme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.body.setAttribute("data-color-scheme", newTheme);

      const icon = this.querySelector("i");
      if (icon) {
        if (newTheme === "dark") {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
        } else {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
        }
      }

      console.log("Theme switched to:", newTheme);
    });
  }

  // Active navigation link highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const correspondingLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  }

  // Navbar background on scroll
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(26, 29, 41, 0.98)";
      } else {
        navbar.style.backgroundColor = "rgba(26, 29, 41, 0.95)";
      }
    });
  }

  // =====================
  // CONTACT FORM FUNCTIONALITY
  // =====================

  const contactForm = document.getElementById("contactForm");
  const downloadResumeBtn = document.querySelector(".download-resume-btn");
  const contactNameInput = document.getElementById("contactName");
  const contactEmailInput = document.getElementById("contactEmail");
  const contactSubjectInput = document.getElementById("contactSubject");
  const contactMessageInput = document.getElementById("contactMessage");

  console.log("Contact form elements found:", {
    contactForm: !!contactForm,
    downloadResumeBtn: !!downloadResumeBtn,
    contactNameInput: !!contactNameInput,
    contactEmailInput: !!contactEmailInput,
    contactSubjectInput: !!contactSubjectInput,
    contactMessageInput: !!contactMessageInput,
  });

  // Ensure form inputs are interactive
  const formInputs = [
    contactNameInput,
    contactEmailInput,
    contactSubjectInput,
    contactMessageInput,
  ].filter(Boolean);
  formInputs.forEach((input) => {
    if (input) {
      // Remove any disabled attributes
      input.removeAttribute("disabled");
      input.removeAttribute("readonly");

      // Ensure proper styling
      input.style.pointerEvents = "auto";
      input.style.userSelect = "text";

      // Add focus styling
      input.addEventListener("focus", function () {
        this.style.borderColor = "#32b8cd";
        this.style.outline = "none";
      });

      input.addEventListener("blur", function () {
        this.style.borderColor = "rgba(255, 255, 255, 0.2)";
      });
    }
  });

  // Contact form submission
  if (contactForm) {
    console.log("Setting up contact form functionality");
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get("name") || contactNameInput?.value || "";
      const email = formData.get("email") || contactEmailInput?.value || "";
      const subject =
        formData.get("subject") || contactSubjectInput?.value || "";
      const message =
        formData.get("message") || contactMessageInput?.value || "";

      console.log("Contact form submitted:", { name, email, subject, message });

      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      // Show success message
      const submitBtn = this.querySelector(".contact-submit-btn");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = "#10b981";
      submitBtn.disabled = true;

      // Reset form after delay
      setTimeout(() => {
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = "#32b8cd";
        submitBtn.disabled = false;

        // Show additional feedback
        alert(
          `Thank you ${name}! Your message has been received. I'll get back to you soon at ${email}.`
        );
      }, 2000);
    });
  }

  // Download resume button
  if (downloadResumeBtn) {
    console.log("Setting up download resume functionality");
    downloadResumeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Download resume clicked");

      // Add visual feedback
      const originalTransform = this.style.transform;
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = originalTransform || "scale(1)";
      }, 150);

      alert(
        "📄 Resume Download\n\nThis would initiate the resume download. Contact Yash at yashgargg4@gmail.com to request his latest resume."
      );
    });
  }

  // =====================
  // AI ASSISTANT CHATBOT FUNCTIONALITY
  // =====================

  const chatBubble = document.getElementById("chatBubble");
  const chatbox = document.getElementById("chatbox");
  const chatboxClose = document.getElementById("chatboxClose");
  const chatInput = document.getElementById("chatInput");
  const sendButton = document.getElementById("sendButton");
  const chatboxMessages = document.getElementById("chatboxMessages");
  const typingIndicator = document.getElementById("typingIndicator");
  const chatNotification = document.getElementById("chatNotification");

  console.log("Chatbot elements found:", {
    chatBubble: !!chatBubble,
    chatbox: !!chatbox,
    chatboxClose: !!chatboxClose,
    chatInput: !!chatInput,
    sendButton: !!sendButton,
    chatboxMessages: !!chatboxMessages,
    typingIndicator: !!typingIndicator,
    chatNotification: !!chatNotification,
  });

  // Toggle chatbox visibility
  function toggleChatbox() {
    console.log("Toggling chatbox, current state:", isChatboxOpen);
    isChatboxOpen = !isChatboxOpen;

    if (isChatboxOpen) {
      if (chatbox) {
        chatbox.classList.remove("hidden");
        console.log("Chatbox opened");
        setTimeout(() => {
          if (chatInput) {
            chatInput.focus();
          }
        }, 300);
      }
      if (chatNotification) {
        chatNotification.style.display = "none";
      }
    } else {
      if (chatbox) {
        chatbox.classList.add("hidden");
        console.log("Chatbox closed");
      }
    }
  }

  // Event listeners for chatbox toggle
  if (chatBubble) {
    console.log("Setting up chat bubble click handler");

    // Remove any existing event listeners and add new one
    chatBubble.style.pointerEvents = "auto";
    chatBubble.style.cursor = "pointer";

    chatBubble.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Chat bubble clicked");
      toggleChatbox();
    });

    chatBubble.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.95)";
    });

    chatBubble.addEventListener("mouseup", function () {
      this.style.transform = "scale(1)";
    });

    chatBubble.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  }

  if (chatboxClose) {
    console.log("Setting up chatbox close handler");
    chatboxClose.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Chatbox close button clicked");
      toggleChatbox();
    });
  }

  // Close chatbox when clicking outside
  document.addEventListener("click", function (e) {
    if (
      isChatboxOpen &&
      chatbox &&
      !chatbox.contains(e.target) &&
      !chatBubble.contains(e.target)
    ) {
      console.log("Clicking outside chatbox, closing");
      toggleChatbox();
    }
  });

  // Add message to chat
  function addMessage(text, sender) {
    console.log("Adding message:", {
      text: text.substring(0, 50) + "...",
      sender,
    });

    if (!chatboxMessages) {
      console.error("chatboxMessages element not found");
      return;
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    const avatarDiv = document.createElement("div");
    avatarDiv.className = "message-avatar";
    if (sender === "assistant") {
      avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
    } else {
      avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
    }

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";

    const textP = document.createElement("p");
    textP.textContent = text;

    const timeSpan = document.createElement("span");
    timeSpan.className = "message-time";
    timeSpan.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    contentDiv.appendChild(textP);
    contentDiv.appendChild(timeSpan);

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);

    chatboxMessages.appendChild(messageDiv);

    setTimeout(() => {
      chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    }, 100);

    conversationHistory.push({
      sender,
      text,
      timestamp: new Date().toISOString(),
    });
  }

  // Show/hide typing indicator
  function showTypingIndicator() {
    if (typingIndicator) {
      typingIndicator.classList.remove("hidden");
      setTimeout(() => {
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
      }, 100);
    }
  }

  function hideTypingIndicator() {
    if (typingIndicator) {
      typingIndicator.classList.add("hidden");
    }
  }

  // Get AI response from Gemini API
  async function getAIResponse(userMessage) {
    console.log("Getting AI response for:", userMessage);

    if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      return "Hi! I'm Yash's AI assistant. To enable full AI functionality, please configure the Gemini API key in the JavaScript file. In the meantime, I can tell you that Yash is a Full-Stack Developer & AI Engineer at JioGames with expertise in JavaScript, Python, AI systems, and has built several impressive projects including an AI Travel Planner and Job Application Assistant. Feel free to ask me anything about his experience!";
    }

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${PORTFOLIO_CONTEXT}\n\nUser question: ${userMessage}\n\nPlease provide a helpful, professional response about Yash Garg's portfolio, background, or experience. Keep responses conversational but professional, and under 200 words.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts[0]
      ) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);

      const lowerMessage = userMessage.toLowerCase();

      if (
        lowerMessage.includes("skill") ||
        lowerMessage.includes("technology") ||
        lowerMessage.includes("tech")
      ) {
        return "Yash has expertise in JavaScript, Python, C#, Java, and specializes in AI & Agentic Systems including LLMs, CrewAI, and Multi-Agent Systems. He's proficient with React, Node.js, Docker, Kubernetes, and has experience with Unity and Android development. His focus areas include full-stack development and AI system integration.";
      } else if (lowerMessage.includes("project")) {
        return "Yash has built several impressive AI projects: an AI Travel Planner using CrewAI and Gemini LLM that generates personalized itineraries, an AI Job Application Assistant that matches resumes to job descriptions, and an AI Financial Analyst Assistant for automated financial analysis. All projects showcase his expertise in multi-agent AI systems.";
      } else if (
        lowerMessage.includes("experience") ||
        lowerMessage.includes("job") ||
        lowerMessage.includes("work")
      ) {
        return "Yash currently works as Associate Engineer at JioGames (Jio Platforms Limited) in Mumbai since December 2023. He's built cross-platform games, developed automated scraping tools, created responsive ad layouts, and validated 150+ games while resolving 600+ issues. He received the Best Debutant Award for his outstanding contributions.";
      } else if (
        lowerMessage.includes("education") ||
        lowerMessage.includes("study") ||
        lowerMessage.includes("degree")
      ) {
        return "Yash graduated with a Bachelor of Technology in Information Technology from Maharaja Surajmal Institute of Technology, Delhi in August 2023 with an impressive CGPA of 9.06. He also holds certifications in JavaScript Programming, Full-Stack Development, and Docker/Kubernetes.";
      } else if (
        lowerMessage.includes("contact") ||
        lowerMessage.includes("reach") ||
        lowerMessage.includes("email")
      ) {
        return "You can reach Yash at yashgargg4@gmail.com or call him at +91 7428846924. Feel free to connect with him for opportunities, collaborations, or just to discuss technology and AI innovations!";
      } else {
        return "I'd be happy to help you learn more about Yash! He's a Full-Stack Developer & AI Engineer currently working at JioGames. You can ask me about his skills, projects, work experience, education, or how to contact him. What would you like to know?";
      }
    }
  }

  // Send message functionality
  async function sendMessage() {
    if (!chatInput) {
      console.error("Chat input not found");
      return;
    }

    const message = chatInput.value.trim();
    console.log("Sending message:", message);

    if (!message) return;

    chatInput.value = "";
    if (sendButton) {
      sendButton.disabled = true;
    }

    addMessage(message, "user");
    showTypingIndicator();

    try {
      const response = await getAIResponse(message);
      hideTypingIndicator();
      addMessage(response, "assistant");
    } catch (error) {
      hideTypingIndicator();
      addMessage(
        "I apologize, but I'm having trouble connecting right now. Please try again later or contact Yash directly at yashgargg4@gmail.com.",
        "assistant"
      );
      console.error("AI Response Error:", error);
    }

    if (sendButton) {
      sendButton.disabled = false;
    }
  }

  // Event listeners for sending messages
  if (sendButton) {
    console.log("Setting up send button click handler");
    sendButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Send button clicked");
      sendMessage();
    });
  }

  if (chatInput) {
    console.log("Setting up chat input handlers");

    // Ensure input is interactive
    chatInput.removeAttribute("disabled");
    chatInput.removeAttribute("readonly");
    chatInput.style.pointerEvents = "auto";
    chatInput.style.userSelect = "text";

    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        console.log("Enter key pressed in chat input");
        sendMessage();
      }
    });

    chatInput.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = Math.min(this.scrollHeight, 100) + "px";
    });
  }

  // =====================
  // PROJECT BUTTONS FUNCTIONALITY
  // =====================

  const projectButtons = document.querySelectorAll(".project-btn");
  console.log("Project buttons found:", projectButtons.length);

  projectButtons.forEach((button, index) => {
    console.log(
      `Setting up project button ${index}:`,
      button.textContent.trim()
    );

    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const buttonText = this.textContent.trim();
      console.log("Project button clicked:", buttonText);

      const originalTransform = this.style.transform;
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = originalTransform || "scale(1)";
      }, 150);

      if (buttonText.includes("Live Demo")) {
        alert(
          "🚀 Live Demo\n\nThis would connect to the live project demo. Contact Yash at yashgargg4@gmail.com for project access and demonstrations."
        );
      } else if (buttonText.includes("Code")) {
        alert(
          "💻 Source Code\n\nThis would connect to the GitHub repository. Contact Yash at yashgargg4@gmail.com for code access and collaboration opportunities."
        );
      }
    });

    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // =====================
  // ANIMATION AND INTERACTION EFFECTS
  // =====================

  function animateOnScroll() {
    const statCards = document.querySelectorAll(".stat-card");
    const projectCards = document.querySelectorAll(".project-card");
    const skillCards = document.querySelectorAll(".skill-category-card");
    const certificationBadges = document.querySelectorAll(
      ".certification-badge"
    );
    const educationCard = document.querySelector(".education-card");
    const contactItems = document.querySelectorAll(".contact-item");

    const allCards = [
      ...statCards,
      ...projectCards,
      ...skillCards,
      ...certificationBadges,
      ...contactItems,
    ];
    if (educationCard) allCards.push(educationCard);

    allCards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const cardVisible = 150;

      if (cardTop < window.innerHeight - cardVisible) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  function initializeAnimations() {
    const statCards = document.querySelectorAll(".stat-card");
    const projectCards = document.querySelectorAll(".project-card");
    const skillCards = document.querySelectorAll(".skill-category-card");
    const certificationBadges = document.querySelectorAll(
      ".certification-badge"
    );
    const educationCard = document.querySelector(".education-card");
    const contactItems = document.querySelectorAll(".contact-item");

    const allCards = [
      ...statCards,
      ...projectCards,
      ...skillCards,
      ...certificationBadges,
      ...contactItems,
    ];
    if (educationCard) allCards.push(educationCard);

    allCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
  }

  initializeAnimations();

  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const throttledAnimateOnScroll = throttle(animateOnScroll, 100);
  const throttledUpdateActiveNavLink = throttle(updateActiveNavLink, 100);

  window.addEventListener("scroll", throttledAnimateOnScroll);
  window.addEventListener("scroll", throttledUpdateActiveNavLink);

  setTimeout(() => {
    animateOnScroll();
    updateActiveNavLink();
  }, 500);

  // Add click-to-copy functionality for contact info
  const contactLinks = document.querySelectorAll(".contact-item a");
  contactLinks.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const text = this.textContent.trim();

      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then(function () {
            showCopyFeedback(item, text);
          })
          .catch(function () {
            console.log("Could not copy to clipboard");
            showCopyFeedback(item, text);
          });
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          showCopyFeedback(item, text);
        } catch (err) {
          console.log("Could not copy to clipboard");
          showCopyFeedback(item, text);
        }
        document.body.removeChild(textArea);
      }
    });
  });

  function showCopyFeedback(element, originalText) {
    const originalColor = element.style.color;
    element.textContent = "Copied!";
    element.style.color = "#10b981";

    setTimeout(() => {
      element.textContent = originalText;
      element.style.color = originalColor;
    }, 1500);
  }

  // Show notification on page load
  setTimeout(() => {
    if (chatNotification && !isChatboxOpen) {
      chatNotification.style.display = "flex";
    }
  }, 3000);

  // Hide notification after some time
  setTimeout(() => {
    if (chatNotification) {
      chatNotification.style.display = "none";
    }
  }, 10000);

  // Add parallax effect to hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".hero-gradient");
    if (parallax) {
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });

  console.log(
    "Modern portfolio website with AI Assistant loaded successfully!"
  );
  console.log("✅ Navigation links configured");
  console.log("✅ AI Chatbot configured");
  console.log("✅ Project buttons configured");
  console.log("✅ Contact form configured");
  console.log("✅ Skills & Technologies section configured");
  console.log("✅ Certifications section configured");
  console.log("✅ Education section configured");
  console.log("✅ All interactive elements configured");
  console.log(
    "Note: To enable full AI functionality, please replace GEMINI_API_KEY with your actual API key from https://makersuite.google.com/app/apikey"
  );
});
