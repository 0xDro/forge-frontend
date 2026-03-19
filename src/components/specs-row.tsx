import type { DesignSpecs } from "@/types/api";

interface SpecsRowProps {
  specs: DesignSpecs;
}

export function SpecsRow({ specs }: SpecsRowProps) {
  const items = [
    { label: "Resolution", value: `${specs.width_px} × ${specs.height_px}` },
    { label: "DPI", value: String(specs.dpi) },
    { label: "Format", value: specs.format.toUpperCase() },
  ];

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="glass-card px-4 py-2.5 text-center min-w-[100px]"
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">
            {item.label}
          </p>
          <p className="text-sm font-mono font-medium text-white tabular-nums">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
