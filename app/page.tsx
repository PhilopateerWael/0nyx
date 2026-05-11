"use client";

import { useRef, useState } from "react";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import { modal } from "./types";
import { usePortfolioScene } from "./hooks/usePortfolioScene";

export default function Page() {
    const mountRef = useRef<HTMLDivElement | null>(null);

    const [selectedModal, setSelectedModal] = useState<modal | undefined>(undefined);
    const [hoverMessage, setHoverMessage] = useState("");
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    usePortfolioScene({
        mountRef,
        setSelectedModal,
        setHoverMessage,
        setLoadingProgress,
        setIsLoading,
        setLoadError
    });

    function renderModal() {
        switch (selectedModal) {
            case modal.aboutMe:
                return <AboutMe />;
            case modal.projects:
                return <Projects />;
            case modal.achievements:
                return <Achievements />;
            default:
                return null;
        }
    }

    return (
        <div style={{ position: "relative", width: "100svw", height: "100svh", overflow: "hidden" }}>
            <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

            {isLoading && (
                <div className="absolute inset-0 z-100 flex items-center justify-center bg-black">
                    <div className="w-[320px]">
                        <div className="h-4 w-full overflow-hidden rounded-full bg-white/10">
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

            <div className={"z-10 absolute top-0 left-0 w-full h-full transition-all duration-300 " + (selectedModal !== undefined ? "pointer-events-auto bg-black/70 opacity-100" : "pointer-events-none opacity-0")}>
                {renderModal()}
            </div>

            <div className={"z-5 absolute bottom-32 left-0 w-full transition-opacity duration-150 pointer-events-none text-lg flex justify-center items-center bg-black/50 py-2 opacity-0 " + (hoverMessage && selectedModal == undefined ? "opacity-100 " : " ") + (hoverMessage == "PLEASE DON'T THE CAT" ? "text-red-500" : "text-white ")}>
                <span className="text-3xl h-8">{hoverMessage}</span>
            </div>
        </div>
    );
}