interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
}

function SectionTitle({
  title,
  subtitle,
  alignment = "center",
  className = "",
}: SectionTitleProps) {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div
      className={`flex flex-col max-w-4xl gap-3 ${alignmentClasses[alignment]} ${className}`}
    >
      {subtitle && (
        <span className="text-sm font-medium text-primary uppercase tracking-wide">
          {subtitle}
        </span>
      )}
      <h2 className="scroll-m-20 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;
