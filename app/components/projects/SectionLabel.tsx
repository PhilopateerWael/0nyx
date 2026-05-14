function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-5 mb-2.5 pb-1.5 border-b border-[#333] text-[#ffaa00] tracking-wider">
            &gt; {children}
        </div>
    );
}
export default SectionLabel;