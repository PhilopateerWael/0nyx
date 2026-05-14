import { McButton } from "./McButton";
import SectionLabel from "./projects/SectionLabel";

interface AboutModalProps {
    onClose?: () => void;
}

const TECH_STACK = [
    "React",
    "Next.js",
    "Three.js",
    "TypeScript",
    "Tailwind CSS",

    "Node.js",
    "Express.js",
    "Prisma",

    "PostgreSQL",
    "MongoDB",

    "Python",

    "Cloudflare",
    "Blender",
];

const education = ["Bachelor of Computer and Data Science", "Faculty of Computers and Data Science (Alexandria University)", , "Expected Graduation: 2028", "Current CGPA: 3.7 / 4.0"];

export default function AboutModal({ onClose }: AboutModalProps) {
    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4">
            <div className="bg-[#c6c6c6] w-full max-w-3xl h-fit lg:max-h-[500px] max-h-full flex flex-col border-2 border-black shadow-[0_0_0_4px_#ffffff]">

                <div className="relative flex items-center px-3 py-2 border-b-2 border-black bg-[#b0b0b0]">
                    <h1
                        className="absolute left-1/2 -translate-x-1/2 text-xl text-[#3f3f3f] pointer-events-none"
                        style={{ textShadow: "1px 1px 0 #ffffff99" }}
                    >
                        About Me
                    </h1>

                    <div className="ml-auto z-10">
                        {onClose && (
                            <McButton onClick={onClose} variant="danger">
                                x
                            </McButton>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-[#0d0d0d] text-white -mt-4">
                    <div className="px-5 pt-4 pb-6">

                        <SectionLabel> Introduction</SectionLabel>

                        <div className="flex flex-col gap-4 text-[#bbb] leading-loose max-w-3xl">
                            <p>
                                I'm a full stack developer focused on building
                                polished applications and interactive digital
                                experiences. I enjoy combining frontend design,
                                backend architecture, and performance-focused
                                engineering into projects that feel smooth and
                                intuitive to use.
                            </p>

                            <p>
                                My main stack revolves around React, Next.js,
                                Node.js, and relational/non-relational databases
                                like PostgreSQL and MongoDB. I enjoy working on
                                authentication systems, APIs, scalable backend
                                structures, and responsive interfaces.
                            </p>

                            <p>
                                I also spend time solving algorithmic problems
                                and participating in competitive programming,
                                which helped improve the way I approach
                                optimization, debugging, and system design
                                under constraints.
                            </p>

                            <p>
                                Recently I've been experimenting more with
                                interactive UI and 3D web experiences using
                                Three.js and Blender to build projects that
                                feel more immersive than traditional websites.
                            </p>

                            <p>
                                This portfolio itself became one of the
                                projects where I explored a more game-inspired
                                direction, mixing 3D environments with frontend
                                engineering and interface design.
                            </p>
                        </div>

                        <SectionLabel> Education</SectionLabel>

                        <div className="flex flex-col gap-2 text-[#ccc] leading-loose">
                            {education.map((line, i) => (
                                <span key={i}>{line}</span>
                            ))}
                        </div>

                        <SectionLabel> Tech Stack</SectionLabel>

                        <div className="flex flex-wrap gap-2">
                            {TECH_STACK.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 bg-[#111] border border-[#333] text-[#ccc]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <SectionLabel> Current Focus</SectionLabel>

                        <ul className="flex flex-col gap-2 list-none p-0">
                            <li className="flex items-start gap-2 text-[#d0d0d0] leading-loose">
                                <span className="shrink-0 text-[#80ff20]">■</span>
                                Building scalable full stack applications
                            </li>

                            <li className="flex items-start gap-2 text-[#d0d0d0] leading-loose">
                                <span className="shrink-0 text-[#55aaff]">◆</span>
                                Improving backend architecture and system design skills
                            </li>

                            <li className="flex items-start gap-2 text-[#d0d0d0] leading-loose">
                                <span className="shrink-0 text-[#cc77ff]">●</span>
                                Exploring interactive 3D web experiences
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
}