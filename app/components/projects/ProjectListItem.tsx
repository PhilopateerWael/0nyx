import Tag from "./Tag";
import { Project } from "./types";

interface ProjectListItemProps {
    project: Project;
    onSelect?: (id: number) => void;
    onOpen?: (id: number) => void;
}

export function ProjectListItem({ project, onOpen }: ProjectListItemProps) {
    return (
        <div
            onClick={() => onOpen?.(project.id)}
            className="relative flex items-center gap-3 px-2 py-2 cursor-pointer border-b border-[#1a1a1a] select-none hover:bg-[#1a1a1a] transition-colors duration-75"
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white truncate font-medium">
                        {project.name}
                    </span>
                </div>

                <p className="text-[#888] text-sm leading-snug line-clamp-2">
                    {project.description}
                </p>

                <div className="flex gap-1 mt-1 flex-wrap text-xs">
                    {project.tags.map((tag, i) => (
                        <Tag tag={tag} key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}