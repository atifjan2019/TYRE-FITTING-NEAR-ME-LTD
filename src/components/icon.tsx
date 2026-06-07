import {
  Truck,
  Wrench,
  CircleDot,
  Gauge,
  House,
  Siren,
  Bus,
  Lock,
  Activity,
  BatteryCharging,
  Phone,
  BadgePoundSterling,
  CircleCheckBig,
  MapPin,
  Clock,
  ShieldCheck,
  Map,
  Newspaper,
  Star,
  CircleHelp,
  BadgeCheck,
  Settings,
  LayoutDashboard,
  type LucideProps,
} from "lucide-react";

/**
 * Maps a string icon name (stored in the DB / site-config) to a lucide icon.
 * Keeps the database free of React components while letting editors pick icons
 * by name. Falls back to a wrench if the name is unknown.
 */
const ICONS = {
  truck: Truck,
  wrench: Wrench,
  "circle-dot": CircleDot,
  gauge: Gauge,
  house: House,
  siren: Siren,
  bus: Bus,
  lock: Lock,
  activity: Activity,
  "battery-charging": BatteryCharging,
  phone: Phone,
  "badge-pound-sterling": BadgePoundSterling,
  "circle-check-big": CircleCheckBig,
  "map-pin": MapPin,
  clock: Clock,
  "shield-check": ShieldCheck,
  map: Map,
  newspaper: Newspaper,
  star: Star,
  "circle-help": CircleHelp,
  "badge-check": BadgeCheck,
  settings: Settings,
  "layout-dashboard": LayoutDashboard,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  ...props
}: { name?: string | null } & Omit<LucideProps, "name">) {
  const Cmp = (name && ICONS[name as IconName]) || Wrench;
  return <Cmp {...props} />;
}
