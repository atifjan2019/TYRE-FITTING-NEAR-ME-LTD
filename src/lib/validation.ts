import { z } from "zod";

/**
 * Shared validation for the booking/quote form. Used by both the client form
 * (react-hook-form) and the /api/lead route, so the rules can't drift.
 */
export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20, "That phone number looks too long"),
  postcode: z.string().min(2, "Please enter your postcode or location"),
  tyreSize: z.string().max(60).optional().or(z.literal("")),
  service: z.string().max(80).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
  // Honeypot field - must stay empty (bots fill it). Not shown to users.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
