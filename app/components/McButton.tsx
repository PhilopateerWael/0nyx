type ButtonVariant = "default" | "primary" | "danger";

const BTN_STYLES: Record<ButtonVariant, string> = {
    default:
        "bg-[#555] border-t-[#888] border-l-[#888] border-r-[#222] border-b-[#222] hover:bg-[#666] active:border-t-[#222] active:border-l-[#222] active:border-r-[#888] active:border-b-[#888]",

    primary:
        "bg-[#5a7a3a] border-t-[#8fb860] border-l-[#8fb860] border-r-[#2a4a1a] border-b-[#2a4a1a] hover:bg-[#6b9147] active:border-t-[#2a4a1a] active:border-l-[#2a4a1a] active:border-r-[#8fb860] active:border-b-[#8fb860]",

    danger:
        "bg-[#7a2a2a] border-t-[#b05050] border-l-[#b05050] border-r-[#3a0a0a] border-b-[#3a0a0a] hover:bg-[#913535] active:border-t-[#3a0a0a] active:border-l-[#3a0a0a] active:border-r-[#b05050] active:border-b-[#b05050]",
};

export function McButton({
    children,
    onClick,
    variant = "default",
    className = "",
    href,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
    className?: string;
    href?: string;
}) {
    const cls = `
        cursor-pointer
        inline-flex items-center justify-center
        px-3 py-2
        text-white text-sm font-bold
        border-2
        select-none
        active:translate-y-[1px]
        ${BTN_STYLES[variant]}
        ${className}
    `;

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={cls}
            >
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={cls}>
            {children}
        </button>
    );
}
