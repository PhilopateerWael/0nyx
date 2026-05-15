"use client";

import { useRef, useState } from "react";
import AboutMe from "./components/AboutMe";
import Achievements from "./components/Achievements";
import { modal } from "./types";
import { usePortfolioScene } from "./hooks/usePortfolioScene";
import ProjectList from "./components/projects/ProjectList";
import { McButton } from "./components/McButton";
import { CircleQuestionMark, Mail } from "lucide-react";
import AboutPortfolio from "./components/AboutPortfolio";
import ContactMe from "./components/ContactMe";

export default function Page() {
    const mountRef = useRef<HTMLDivElement | null>(null);

    const [selectedModal, setSelectedModal] = useState<modal | undefined>(undefined);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    let isModalOpen = selectedModal !== undefined;

    usePortfolioScene({
        mountRef,
        setSelectedModal,
        setLoadingProgress,
        setIsLoading,
        setLoadError,
        isModalOpen
    });

    function renderModal() {
        switch (selectedModal) {
            case modal.aboutMe:
                return <AboutMe onClose={() => setSelectedModal(undefined)} />;
            case modal.projects:
                return <ProjectList onClose={() => setSelectedModal(undefined)} />;
            case modal.achievements:
                return <Achievements onClose={() => setSelectedModal(undefined)} />;
            case modal.credits:
                return <AboutPortfolio onClose={() => setSelectedModal(undefined)} />;
            case modal.contact:
                return <ContactMe onClose={() => setSelectedModal(undefined)} />;
            default:
                return null;
        }
    }

    return (
        <div style={{ position: "relative", width: "100svw", height: "100svh", overflow: "hidden" }}>
            <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

            {isLoading && (
                <div className="absolute inset-0 z-100 flex items-center justify-center bg-black">
                    <div className="w-[300px] flex flex-col items-center gap-4">
                        <p className="text-2xl">Loading...</p>
                        <div className="h-4 w-full overflow-hidden bg-white/10 p-1 border border-white">
                            <div
                                className="h-full bg-white transition-all duration-150"
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {loadError && (
                <div className="absolute inset-0 z-100 flex items-center justify-center bg-black">
                    <span className="text-red-500 text-2xl">Failed to load assets. Please try again later.</span>
                </div>
            )}

            {renderModal()}
            
            <div className="fixed top-0 right-0 p-2 flex gap-2">
                <McButton variant="primary" onClick={() => setSelectedModal(modal.contact)}>
                    <Mail />
                </McButton>
                <McButton onClick={() => setSelectedModal(modal.credits)}>
                    <CircleQuestionMark />
                </McButton>
            </div>

            <div className="fixed bottom-0 w-full flex justify-center items-center text-[#000000c7] p-1 text-center max-sm:text-xs">
                scroll or use arrow keys to navigate through the portfolio.
            </div>
        </div>
    );
}