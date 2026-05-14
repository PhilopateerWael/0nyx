import SectionLabel from "./projects/SectionLabel";
import { McButton } from "./McButton";

export default function AboutPortfolio({ onClose }: { onClose?: () => void }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4">

            <div className="bg-[#c6c6c6] w-full max-w-3xl h-fit lg:max-h-[500px] max-h-full flex flex-col border-2 border-black shadow-[0_0_0_4px_#ffffff]">

                <div className="relative flex items-center px-3 py-2 border-b-2 border-black bg-[#b0b0b0] ">

                    <h1
                        className="absolute left-1/2 -translate-x-1/2 text-xl text-[#3f3f3f] pointer-events-none"
                        style={{ textShadow: "1px 1px 0 #ffffff99" }}
                    >
                        About
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
                        <SectionLabel>Explore the Portfolio</SectionLabel>

                        <div className="flex flex-col gap-4 text-[#bbb] leading-loose mb-6">
                            <p>
                                Scroll through the portfolio and interact with different elements.
                            </p>
                        </div>

                        <SectionLabel>About Assets</SectionLabel>

                        <div className="flex flex-col gap-4 text-[#bbb] leading-loose">

                            <p>
                                This portfolio uses third-party 3D assets created by independent artists.
                                All assets are used under Creative Commons Attribution (CC BY) licenses.
                            </p>

                            <div className="flex flex-col gap-3">

                                <div>
                                    <p className="text-[#ddd] font-semibold">
                                        Minecraft-styled Laptop 3D Model
                                    </p>
                                    <p>
                                        Created by FishyBusiness
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[#ddd] font-semibold">
                                        Trophy (Minecraft Item) 3D Model
                                    </p>
                                    <p>
                                        Created by Barkangel
                                    </p>
                                </div>

                            </div>

                            <p className="text-[#999]">
                                This project is not affiliated with Minecraft, Mojang, Riot Games, or League of Legends.
                                All trademarks belong to their respective owners.
                            </p>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}