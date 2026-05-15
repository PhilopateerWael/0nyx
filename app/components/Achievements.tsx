import { McButton } from "./McButton";

interface AchievementsModalProps {
    onClose?: () => void;
}

const ACHIEVEMENTS = [
    {
        title: "DEPI React Front-End Developer Certificate",
        description:
            "Completed a structured frontend program focused on React, component design, and modern web development practices, along with teamwork, communication, and collaborative project work.",
    },
    {
        title: "CS50P - Introduction to Programming with Python",
        description:
            "Completed Harvard’s introductory programming course covering Python fundamentals, problem solving, and basic algorithms.",
    },
    {
        title: "ICPC ECPC Qualifications - Collegiate Programming Contest (Day 3)",
        description:
            "Ranked 29th overall and 6th within FCDS (Faculty of Computers and Data Science), representing Alexandria University in a competitive programming contest focused on algorithms, data structures, and optimization under time constraints.",
    },
];

export default function AchievementsModal({ onClose }: AchievementsModalProps) {
    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4">
            <div className="bg-[#c6c6c6] w-full max-w-2xl h-fit lg:max-h-[450px] max-h-full flex flex-col border-2 border-black shadow-[0_0_0_4px_#ffffff]">

                <div className="relative flex items-center px-3 py-2 border-b-2 border-black bg-[#b0b0b0]">
                    <h1
                        className="absolute left-1/2 -translate-x-1/2 text-xl text-[#3f3f3f] pointer-events-none"
                        style={{ textShadow: "1px 1px 0 #ffffff99" }}
                    >
                        Achievements
                    </h1>

                    <div className="ml-auto z-10">
                        {onClose && (
                            <McButton onClick={onClose} variant="danger">
                                x
                            </McButton>
                        )}
                    </div>
                </div>

                <div className="bg-[#0c0c0c] text-white p-2 overflow-y-auto flex-1">
                    <div className="flex flex-col">
                        {ACHIEVEMENTS.map((item) => (
                            <div
                                key={item.title}
                                className="relative flex items-center gap-3 px-2 py-2 border-b border-[#1a1a1a] select-none hover:bg-[#1a1a1a] transition-colors duration-75"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-white font-medium">
                                            {item.title}
                                        </span>
                                    </div>

                                    <p className="text-[#888] text-sm leading-snug">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}