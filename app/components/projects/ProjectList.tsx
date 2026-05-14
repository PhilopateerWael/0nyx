import { useState } from "react";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectView } from "./ProjectView";
import { PROJECTS } from "./types";
import { McButton } from "../McButton";

interface ProjectListProps {
    onClose?: () => void;
}

const ProjectList = ({ onClose }: ProjectListProps) => {
    const [openId, setOpenId] = useState<number | null>(null);

    const openProject = PROJECTS.find((p) => p.id === openId) ?? null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4">
            <div className="bg-[#c6c6c6] w-full max-w-3xl h-fit lg:max-h-[500px] max-h-full flex flex-col border-2 border-black shadow-[0_0_0_4px_#ffffff]">

                <div className="relative flex items-center px-3 py-2 border-b-2 border-black bg-[#b0b0b0]">

                    <div className="z-10">
                        {openProject && (
                            <McButton onClick={() => setOpenId(null)}>
                                &lt;
                            </McButton>
                        )}
                    </div>

                    <h1
                        className="absolute left-1/2 -translate-x-1/2 text-xl text-[#3f3f3f] pointer-events-none"
                        style={{ textShadow: "1px 1px 0 #ffffff99" }}
                    >
                        {openProject ? openProject.name : "Projects"}
                    </h1>

                    <div className="ml-auto z-10">
                        {onClose && (
                            <McButton onClick={onClose} variant="danger">
                                x
                            </McButton>
                        )}
                    </div>
                </div>

                <div className="bg-[#0c0c0c] overflow-y-auto flex-1">
                    {openProject ? (
                        <ProjectView
                            project={openProject}
                            onBack={() => setOpenId(null)}
                        />
                    ) : (
                        <div className="p-2 flex flex-col gap-2">
                            {PROJECTS.length === 0 ? (
                                <div className="p-5 text-center text-[#9a9a9a]">
                                    No projects found.
                                </div>
                            ) : (
                                PROJECTS.map((project) => (
                                    <ProjectListItem
                                        key={project.id}
                                        project={project}
                                        onOpen={setOpenId}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;