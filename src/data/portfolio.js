export const PORTFOLIO_DATA = {
  personal: {
    name: "Irshad Alam",
    title: "Software Engineer",
    email: "alam.irshad2511@gmail.com",
    phone: "+91 9508962364",
    location: "New Delhi, India",
    summary: "Full-stack Software Engineer with hands-on expertise across React, Node.js, and Next.js, building scalable applications from concept to deployment. Delivered diverse projects spanning a peer-to-peer campus marketplace, an AI-driven job application agent, and a client-facing corporate platform. Strong database fundamentals in SQL/MySQL, backed by daily algorithmic practice on LeetCode.",
    links: {
      github: "https://github.com/Irshad-dude",
      linkedin: "https://linkedin.com",
      leetcode: "https://leetcode.com/u/5bKXyW6obM/",
    }
  },
  skills: {
    languages: ["JavaScript", "Java", "C++", "Python", "SQL", "HTML", "CSS"],
    frameworks: ["React", "Next.js", "Node.js", "Express.js", "Java Spring Boot", "Tailwind CSS"],
    databases: ["MongoDB", "MySQL", "Relational Databases", "JSONBin"],
    tools: ["Git", "GitHub", "REST APIs", "Cloudinary", "Netlify", "Agile"]
  },
  experience: [
    {
      id: 1,
      company: "Dummy Developers",
      role: "Backend Development Intern",
      period: "Jun 2025 – Feb 2026",
      description: [
        "Designed and developed 10+ RESTful APIs using Java Spring Boot, integrating with relational databases to support 20+ data endpoints with optimized query performance.",
        "Implemented JWT-based authentication and validation middleware, reducing API error rates by 40% and strengthening application security across all endpoints.",
        "Collaborated with 3 cross-functional frontend developers to design API contracts, enabling seamless data exchange for 5 major features.",
        "Contributed to 4 real-world projects, delivering backend services that supported 500+ active users with 99% uptime."
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: "College Dress Marketplace",
      description: "A dedicated e-commerce platform for college students to buy and sell essential academic wear. Features hyper-local filtering to isolate the marketplace based on the user's registered college.",
      techStack: ["React", "Node.js",, "MongoDB", "Tailwind CSS", "Socket.io"],
      link: "https://collegedress1.netlify.app/",
      github: "https://github.com/Irshad-dude/College-Dress-Marketplace.git",
      image: "/projects/1.png"
    },
    {
      id: 2,
      title: "MetaMax Construction",
      description: "A professional corporate website showcasing construction company expertise across multiple sectors. Engineered with a dynamic admin panel for real-time project management and secure data handling.",
      techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      link: "https://metamaxconstruction.com/",
      github: "https://github.com/Irshad-dude/Metamax-Constrution.git",
      image: "/projects/2.png"
    },
    {
      id: 3,
      title: "Job Automation Agent",
      description: "An AI-powered tool that automates applying to LinkedIn 'Easy Apply' jobs. Uses NLP to parse form questions and injects optimal answers based on a provided master resume and user parameters.",
      techStack: ["JavaScript (ES6+)", "Selenium", "AI & Orchestration", "Chrome Extension APIs "],
      link: "https://github.com/Irshad-dude/Job-agent",
      github: "https://github.com/Irshad-dude/Job-agent",
      image: "/projects/3.png"
    },
    {
      id: 4,
      title: "Irshad Trader Portfolio",
      description: "Forex trading platform featuring optimized image storage and global CDN delivery via Cloudinary, cutting load times by ~35%. Includes real-time updates and interactive market analysis components.",
      techStack: ["React", "Node.js", "Cloudinary"],
      link: "https://www.tradewithirsh.in/",
      github: "https://github.com/Irshad-dude/Irshad-Trade-Portfolio.git",
      image: "/projects/4.png"
    },
    {
      id: 5,
      title: "MINEBOT AI Assistant",
      description: "An intelligent, responsive chatbot interface built to handle conversational queries and automate routine customer interactions. Features a modern, minimal glassmorphism UI.",
      techStack: ["React", "Node.js", "Express", "REST APIs"],
      link: "https://ir-01.netlify.app/",
      github: "#",
      image: "/projects/5.png"
    },
    {
      id: 6,
      title: "Zara UI Clone (Currently Building)",
      description: "A meticulously crafted e-commerce frontend clone inspired by Zara. Currently in active development, focusing on building a highly responsive and custom design architecture to allow users to intuitively navigate fashion collections and promotional campaigns.",
      techStack: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
      link: "https://zara32.netlify.app/",
      github: "https://github.com/Irshad-dude/Zara-Clone.git",
      image: "/projects/6.png"
    }
  ],
  education: {
    institution: "Geetanjali Institute of Technical Studies, Udaipur",
    degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
    period: "2023 – 2027",
    cgpa: "CGPA: 8.5"
  },
  achievements: [
    "300+ coding problems solved on LeetCode",
    "50-Day Continuous Coding Streak",
    "GDSC Code Battle Winner"
  ]
};
