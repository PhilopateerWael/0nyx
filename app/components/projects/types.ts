export interface ProjectTag {
    label: string;
}

export interface ProjectContent {
    techStack: string[];
    features: string[];
    implementation: string[];
    links: { label: string; url: string }[];
    notes: string;
}

export interface Project {
    id: number;
    name: string;

    tags: ProjectTag[];
    description: string;
    imageUrl?: string;

    content?: ProjectContent;
}

export const PROJECTS: Project[] = [
    {
        id: 0,
        name: "This Portfolio Website",

        tags: [
            { label: "Frontend" },
            { label: "3D" },
        ],

        description:
            "Interactive 3D developer portfolio built with Three.js, inspired by game environments and immersive UI design.",

        imageUrl:
            "https://placehold.co/600x300/1a1a2e/80ff20?text=Test",

        content: {
            techStack: [
                "React 18",
                "Three.js",
                "TypeScript",
                "Vite",
                "Tailwind CSS",
                "Blender",
            ],

            features: [
                "Interactive 3D portfolio environment",
                "Project showcase system",
                "Responsive UI overlay system",
                "Immersive game-inspired presentation",
            ],

            implementation: [
                "Built 3D scenes using Three.js integrated with React",
                "Imported and optimized assets in blender for web rendering",
                "Optimized rendering and interactivity performance and asset loading for smooth interaction",
                "Structured the portfolio as an immersive experience rather than a traditional static website",
            ],

            links: [
                { label: "GitHub", url: "https://github.com/PhilopateerWael/0nyx" },
            ],

            notes:
                "One of the most creatively enjoyable projects I've worked on. It gave me room to experiment with immersive UI, 3D environments, and game-inspired web design.",
        },
    },

    {
        id: 1,
        name: "Hot Deals",
        tags: [
            { label: "Full Stack" },
            { label: "Backend Heavy" },
        ],
        description:
            "Full-stack e-commerce platform built as part of DEPI program with admin system, loyalty points, and secure checkout flow.",
        imageUrl:
            "https://placehold.co/600x300/0d1a0d/80ff20?text=Test",

        content: {
            techStack: [
                "React",
                "TypeScript",
                "Vite",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Redux Toolkit",
                "Stripe",
                "Cloudinary",
                "JWT",
            ],

            features: [
                "User authentication with secure JWT system",
                "Product browsing and cart management",
                "Admin dashboard for product CRUD operations",
                "Loyalty points system per purchase",
                "Stripe payment integration",
                "Image upload and product management system",
            ],

            implementation: [
                "Designed full REST API architecture with Express.js",
                "Implemented secure authentication using JWT + cookie-based sessions",
                "Built product and order schema with MongoDB and Mongoose",
                "Handled race conditions in stock updates during checkout flow",
                "Implemented backend-first stock tracking to prevent overselling",
                "Integrated Stripe payment workflow with order validation system",
                "Deployed backend services and configured production environment",
                "Assisted in frontend integration and API consumption layer",
                "Used Zod for environment validation and fail-fast startup safety"
            ],

            links: [
                {
                    label: "Live Demo",
                    url: "https://e-commerce-lake-chi.vercel.app/",
                },
                {
                    label: "GitHub",
                    url: "https://github.com/Youssef-Atef-20/E-Commerce",
                },
            ],

            notes:
                "Built as a part of DEPI final project focusing heavily on backend logic, system reliability, and deployment.",
        },
    },

    {
        id: 2,
        name: "Refyne",
        tags: [
            { label: "Full Stack" },
            { label: "System Design" },
        ],
        description:
            "Windows optimization platform with subscriptions, secure client communication, and system performance tools.",
        imageUrl:
            "https://placehold.co/600x300/1a0d2e/cc77ff?text=Test",

        content: {
            techStack: [
                "React",
                "Tailwind CSS",
                "Express.js",
                "MongoDB",
                "Stripe",
                "OAuth2 (Google, Discord)",
                "WebSockets (Cloudflare Durable Objects)",
                "End-to-End Encryption",
            ],

            features: [
                "Subscription-based SaaS system",
                "Google & Discord OAuth authentication",
                "Secure payment and billing system",
                "Real-time WebSocket communication with client",
                "Windows optimization tool integration",
                "Encrypted client-server communication",
            ],

            implementation: [
                "Designed full SaaS architecture from frontend to backend",
                "Built responsive React UI with Tailwind CSS",
                "Implemented OAuth2 authentication flow for Google and Discord",
                "Developed Express.js backend with MongoDB data layer",
                "Integrated Stripe for subscription and billing management",
                "Used Cloudflare Durable Objects for persistent WebSocket connections",
                "Built custom client with end-to-end encrypted communication layer",
                "Coordinated system design for secure performance optimization pipeline",
            ],

            links: [
                { label: "Live Site", url: "https://refyne.gg/" },
            ],

            notes:
                "Co-founded and built from scratch. Focus on system security, performance optimization, and scalable SaaS architecture.",
        },
    },

    {
        id: 3,
        name: "Friends",
        tags: [
            { label: "Full Stack" },
            { label: "Real-time" },
        ],
        description:
            "Modern social platform with real-time messaging, follow/block system, and secure authentication.",
        imageUrl:
            "https://placehold.co/600x300/1a0a1a/cc77ff?text=Test",

        content: {
            techStack: [
                "Next.js",
                "Prisma",
                "PostgreSQL",
                "BetterAuth",
                "Socket.io",
                "Tailwind CSS",
            ],

            features: [
                "User authentication system with BetterAuth",
                "Follow and block user system",
                "Real-time messaging between users",
                "User profiles and feed",
                "Middleware-protected server actions",
            ],

            implementation: [
                "Designed relational database schema using Prisma ORM",
                "Implemented authentication system using BetterAuth",
                "Built follow/block relationship logic at database level",
                "Developed real-time messaging system using WebSockets",
                "Created custom Next.js middleware for route protection and auth validation",
            ],

            links: [
                {
                    label: "Live App",
                    url: "https://friends-0nyx.vercel.app/",
                },
                {
                    label: "GitHub",
                    url: "https://github.com/PhilopateerWael/friends",
                },
            ],

            notes:
                "Still in Optimization Phase.",
        },
    },
];