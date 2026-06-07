import { MapPin } from "lucide-react";

/**
 * Stylised coverage-map placeholder for the availability page.
 * Replace with a real static map <Image> (e.g. /uploads/coverage-map.png) when
 * you have one — keep the pins overlaid for the "live fitters" feel.
 */
export function CoverageMap() {
  // Pin positions (% top/left) scattered like the competitor's map.
  const pins = [
    { top: "12%", left: "44%" },
    { top: "26%", left: "30%" },
    { top: "40%", left: "8%" },
    { top: "55%", left: "62%" },
    { top: "74%", left: "84%" },
    { top: "84%", left: "28%" },
  ];

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border bg-[#f3efe7]"
      role="img"
      aria-label="Map showing mobile tyre fitters near you"
    >
      {/* Faux road network */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(35deg, #f3cf7a 0 3px, transparent 3px 64px), repeating-linear-gradient(-20deg, #f3cf7a 0 3px, transparent 3px 90px), repeating-linear-gradient(80deg, #e8e3d8 0 2px, transparent 2px 40px)",
        }}
      />
      {/* Fitter pins */}
      {pins.map((p, i) => (
        <MapPin
          key={i}
          className="absolute h-8 w-8 -translate-x-1/2 -translate-y-full fill-accent text-white drop-shadow"
          style={{ top: p.top, left: p.left }}
          aria-hidden
        />
      ))}
    </div>
  );
}
