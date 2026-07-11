/**
 * One-off targeted content fixes (em-dash sweep + seven-region consistency).
 * Scoped UPDATEs only - no deletes, no seeding. Prints before/after for audit.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "mobile-tyre-fitting":
    "New tyres supplied and fitted at your home, work or roadside. No need to visit a garage.",
  "mobile-tyre-repair":
    "Fast, safe tyre repairs that come to you, getting you moving without a costly replacement.",
  "tpms-service":
    "Tyre Pressure Monitoring System diagnosis, sensor replacement and reset. Keep that warning light off.",
  "caravan-tyre-fitting":
    "CP-rated and load-rated leisure tyres fitted where the caravan stands, at a storage compound, campsite, pitch or home, with a full DOT age and sidewall safety check.",
};

const FAQ_ANSWER_FIXES: { match: string; replace: string }[] = [
  {
    match: "Yes - we cover Bearsted, Headcorn, Coxheath, Boughton Monchelsea, Yalding and the surrounding villages.",
    replace: "Yes. We cover Bearsted, Headcorn, Coxheath, Boughton Monchelsea, Yalding and the surrounding villages.",
  },
  {
    match: "Yes - we can meet you at the station car parks or your workplace nearby and fit while you carry on with your day.",
    replace: "Yes. We can meet you at the station car parks or your workplace nearby and fit while you carry on with your day.",
  },
  {
    match: "Yes - we regularly attend the airport, NEC and Birmingham Business Park for both private cars and fleet vehicles.",
    replace: "Yes. We regularly attend the airport, NEC and Birmingham Business Park for both private cars and fleet vehicles.",
  },
  {
    match: "Yes - we cover Brighton, Hove, Portslade, Shoreham and the surrounding Sussex coast.",
    replace: "Yes. We cover Brighton, Hove, Portslade, Shoreham and the surrounding Sussex coast.",
  },
  {
    match: "Yes - roadside breakdowns on the A12 and A414 are prioritised and we carry a wide range of tyres on board.",
    replace: "Yes. Roadside breakdowns on the A12 and A414 are prioritised and we carry a wide range of tyres on board.",
  },
  {
    match: "Yes - we cover the city centre and the M8/M77/M74 routes, with roadside emergencies prioritised.",
    replace: "Yes. We cover the city centre and the M8/M77/M74 routes, with roadside emergencies prioritised.",
  },
  {
    match: "Yes. We are a fully mobile service - we come to your home, workplace or the roadside. There is no garage to visit.",
    replace: "Yes. We are a fully mobile service. We come to your home, workplace or the roadside. There is no garage to visit.",
  },
  {
    match: "Yes - our emergency tyre fitting service runs 24 hours a day, 365 days a year.",
    replace: "Yes. Our emergency tyre fitting service runs 24 hours a day, 365 days a year.",
  },
  {
    match: "London, Kent, Sussex, Essex, Birmingham & the West Midlands, and Scotland. Tell us your postcode and we'll confirm.",
    replace: "London, Kent, Sussex, Essex, Birmingham & the West Midlands, Scotland and Greater Manchester. Tell us your postcode and we'll confirm.",
  },
];

async function main() {
  for (const [slug, shortDescription] of Object.entries(SERVICE_DESCRIPTIONS)) {
    const before = await prisma.service.findUnique({ where: { slug }, select: { shortDescription: true } });
    if (!before) { console.log(`SKIP service ${slug}: not found`); continue; }
    if (before.shortDescription === shortDescription) { console.log(`OK   service ${slug}: already clean`); continue; }
    await prisma.service.update({ where: { slug }, data: { shortDescription } });
    console.log(`FIX  service ${slug}\n  was: ${before.shortDescription}\n  now: ${shortDescription}`);
  }

  const settings = await prisma.siteSetting.findUnique({ where: { id: "settings" } });
  if (settings) {
    const tagline = "24/7 Mobile Tyre Fitting. We Come To You";
    const defaultMetaDescription =
      "24/7 mobile tyre fitting that comes to you at home, work or roadside. Fast call-out across London, Kent, Sussex, Essex, the West Midlands, Scotland & Greater Manchester.";
    if (settings.tagline !== tagline || settings.defaultMetaDescription !== defaultMetaDescription) {
      await prisma.siteSetting.update({ where: { id: "settings" }, data: { tagline, defaultMetaDescription } });
      console.log(`FIX  settings.tagline\n  was: ${settings.tagline}\n  now: ${tagline}`);
      console.log(`FIX  settings.defaultMetaDescription\n  was: ${settings.defaultMetaDescription}\n  now: ${defaultMetaDescription}`);
    } else {
      console.log("OK   settings: already clean");
    }
  }

  for (const fix of FAQ_ANSWER_FIXES) {
    const res = await prisma.faq.updateMany({ where: { answer: fix.match }, data: { answer: fix.replace } });
    console.log(`${res.count > 0 ? "FIX " : "SKIP"} faq (${res.count} row): ${fix.replace.slice(0, 70)}...`);
  }

  // Post-check: any remaining " - " or em/en dashes in rendered service cards?
  const services = await prisma.service.findMany({ where: { published: true }, select: { slug: true, shortDescription: true } });
  const dirty = services.filter((s) => / - /.test(s.shortDescription) || /[–—]/.test(s.shortDescription));
  console.log(dirty.length ? `REMAINING DIRTY: ${dirty.map((d) => d.slug).join(", ")}` : "POST-CHECK: all shortDescriptions clean");
}

main().finally(() => prisma.$disconnect());
