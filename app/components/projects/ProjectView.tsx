import { McButton } from "../McButton";
import Tag from "./Tag";
import { Project } from "./types";
import SectionLabel from "./SectionLabel";

interface ProjectViewProps {
    project: Project;
    onBack: () => void;
}

export function ProjectView({ project }: ProjectViewProps) {
    const content = project.content;

    return (
        <div className="flex flex-col bg-[#0d0d0d] text-white min-h-full">
            {project.imageUrl && (
                <div className="w-full border-b-2 border-[#222] overflow-hidden max-h-[300px]">
                    <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full object-contain max-h-[300px]"
                    />
                </div>
            )}

            <div className="px-5 pt-4 pb-4 bg-[#111] border-b-2 border-[#222]">
                <h1
                    className="mb-2.5 text-white leading-loose font-normal text-2xl"
                    style={{ textShadow: "2px 2px #3a74c4" }}
                >
                    {project.name}
                </h1>

                <p className="text-[#bbb] leading-loose max-w-xl">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag, i) => (
                        <Tag tag={tag} key={i} />
                    ))}
                </div>
            </div>

            <div className="px-5 pb-6">
                {content?.techStack?.length ? (
                    <>
                        <SectionLabel> Tech Stack</SectionLabel>
                        <div className="flex flex-wrap gap-2">
                            {content.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 bg-[#1a1a1a] border border-[#333] text-[#ccc]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </>
                ) : null}

                {content?.features?.length ? (
                    <>
                        <SectionLabel> Features</SectionLabel>
                        <ul className="flex flex-col gap-2 list-none p-0">
                            {content.features.map((feat) => (
                                <li
                                    key={feat}
                                    className="flex items-start gap-2 text-[#ccc] leading-loose"
                                >
                                    <span className="shrink-0 text-[#80ff20]">■</span>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : null}

                {content?.implementation?.length ? (
                    <>
                        <SectionLabel> Implementation</SectionLabel>
                        <ul className="flex flex-col gap-2 list-none p-0">
                            {content.implementation.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-2 text-[#ccc] leading-loose"
                                >
                                    <span className="shrink-0 text-[#55aaff]">◆</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : null}

                {content?.links?.length ? (
                    <>
                        <SectionLabel> Links</SectionLabel>
                        <div className="flex flex-wrap gap-2.5">
                            {content.links.map((link) => (
                                <McButton
                                    key={link.label}
                                    variant="primary"
                                    href={link.url}
                                >
                                    ↗ {link.label}
                                </McButton>
                            ))}
                        </div>
                    </>
                ) : null}

                {content?.notes ? (
                    <>
                        <SectionLabel> Dev Notes</SectionLabel>
                        <div className="bg-[#111] border border-[#333] border-l-[3px] border-l-[#ffaa00] px-3.5 py-2.5">
                            <p className="text-[#bbb] leading-loose">
                                {content.notes}
                            </p>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}