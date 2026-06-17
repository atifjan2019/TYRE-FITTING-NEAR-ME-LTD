import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faTruck,
  faWrench,
  faCircleDot,
  faGauge,
  faGaugeHigh,
  faHouse,
  faBolt,
  faVanShuttle,
  faLock,
  faCarBattery,
  faPhone,
  faSterlingSign,
  faCircleCheck,
  faLocationDot,
  faClock,
  faShieldHalved,
  faMapLocationDot,
  faNewspaper,
  faStar,
  faCircleQuestion,
  faGear,
  faTableColumns,
  faWarehouse,
  faTree,
  faTent,
  faBuilding,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Maps a string icon name (stored in the DB / site-config) to a Font Awesome
 * icon. Keeps the database free of components while letting editors pick icons
 * by name. Falls back to a wrench if the name is unknown.
 */
const ICONS: Record<string, IconDefinition> = {
  truck: faTruck,
  wrench: faWrench,
  "circle-dot": faCircleDot,
  gauge: faGauge,
  house: faHouse,
  siren: faBolt,
  bus: faVanShuttle,
  lock: faLock,
  activity: faGaugeHigh,
  "battery-charging": faCarBattery,
  phone: faPhone,
  "badge-pound-sterling": faSterlingSign,
  "circle-check-big": faCircleCheck,
  "map-pin": faLocationDot,
  clock: faClock,
  "shield-check": faShieldHalved,
  map: faMapLocationDot,
  newspaper: faNewspaper,
  star: faStar,
  "circle-help": faCircleQuestion,
  "badge-check": faCircleCheck,
  settings: faGear,
  "layout-dashboard": faTableColumns,
  warehouse: faWarehouse,
  tree: faTree,
  tent: faTent,
  building: faBuilding,
  "triangle-alert": faTriangleExclamation,
};

export function Icon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const icon = (name && ICONS[name]) || faWrench;
  // `className` (e.g. "h-6 w-6") sizes the rendered SVG.
  return <FontAwesomeIcon icon={icon} className={className} />;
}
