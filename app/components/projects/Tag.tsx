const Tag = ({ tag }: { tag: { label: string } }) => {
    return (
        <span
            key={tag.label}
            className="px-1.5 py-0.5 border"
            style={{
                color: "#80ff20",
                borderColor: "#80ff20",
            }}
        >
            {tag.label}
        </span>
    )
}

export default Tag