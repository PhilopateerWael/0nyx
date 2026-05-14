import SectionLabel from "./projects/SectionLabel";
import { McButton } from "./McButton";
import Socials from "./Socials";

export default function ContactMe({ onClose }: { onClose?: () => void }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4">

            <div className="bg-[#c6c6c6] w-full max-w-3xl h-fit lg:max-h-[500px] max-h-full flex flex-col border-2 border-black shadow-[0_0_0_4px_#ffffff]">

                <div className="relative flex items-center px-3 py-2 border-b-2 border-black bg-[#b0b0b0]">

                    <h1
                        className="absolute left-1/2 -translate-x-1/2 text-xl text-[#3f3f3f] pointer-events-none"
                        style={{ textShadow: "1px 1px 0 #ffffff99" }}
                    >
                        Contact Me
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

                        <SectionLabel>Get In Touch</SectionLabel>

                        <p className="text-[#bbb] leading-loose">
                            Feel free to reach out for collaboration, opportunities, or just to connect.
                        </p>

                        <Socials />
                    </div>
                </div>

            </div>
        </div>
    );
}