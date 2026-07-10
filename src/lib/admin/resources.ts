/**
 * Admin resource definitions (config-driven CRUD).
 * ---------------------------------------------------------------------------
 * The whole /admin section is generated from these configs, so adding a new
 * field to a content type is a ONE-LINE change here - no new components needed.
 * Each resource maps to a Prisma model (`model`) and lists the editable fields.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "stringList" // one item per line; stored as a JSON string[]
  | "date";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  colSpan?: 1 | 2;
  /** Static options for a select. */
  options?: { value: string; label: string }[];
  /** Load select options from another model (value = id, label = labelField). */
  optionsFrom?: { model: PrismaModel; labelField: string };
}

/** Prisma delegate names we expose in the admin. */
export type PrismaModel =
  | "service"
  | "blogPost"
  | "review"
  | "faq"
  | "lead";

export interface ResourceConfig {
  key: string; // URL segment, e.g. /admin/towns
  model: PrismaModel;
  labelSingular: string;
  labelPlural: string;
  icon: string; // lucide icon name
  /** Columns shown in the list table. */
  listColumns: { name: string; label: string }[];
  orderBy: Record<string, "asc" | "desc">[];
  /** Optional Prisma `include` for the list query (e.g. to show related rows). */
  include?: Record<string, unknown>;
  /**
   * Optional "View" link to the live public page of a row. Kept as plain data
   * (NOT a function) so the whole config stays serialisable and can cross the
   * server/client boundary into <AdminForm>. The list page builds the URL from
   * this via `buildViewUrl`.
   */
  viewPath?: {
    /** Public path prefix, e.g. "/guides". The row's slug is appended. */
    base: string;
    /** Row field holding the slug. Defaults to "slug". */
    slugField?: string;
    /** If set, only show the link when this boolean row field is truthy
     * (e.g. "published", since unpublished pages 404 on the live site). */
    onlyWhen?: string;
  };
  fields: FieldConfig[];
}

// Reusable SEO field group appended to most resources.
const SEO_FIELDS: FieldConfig[] = [
  {
    name: "seoTitle",
    label: "SEO title",
    type: "text",
    colSpan: 2,
    help: "Overrides the default page <title>. ~60 characters.",
  },
  {
    name: "seoDescription",
    label: "SEO meta description",
    type: "textarea",
    colSpan: 2,
    help: "~155 characters shown in search results.",
  },
  { name: "ogImage", label: "Social share image (OG)", type: "image", colSpan: 2 },
];

const PUBLISH_FIELD: FieldConfig = {
  name: "published",
  label: "Published (visible on the site)",
  type: "boolean",
};

const ORDER_FIELD: FieldConfig = {
  name: "order",
  label: "Sort order",
  type: "number",
  help: "Lower numbers appear first.",
};

export const RESOURCES: Record<string, ResourceConfig> = {
  leads: {
    key: "leads",
    model: "lead",
    labelSingular: "Booking",
    labelPlural: "Bookings",
    icon: "inbox",
    listColumns: [
      { name: "name", label: "Name" },
      { name: "phone", label: "Phone" },
      { name: "postcode", label: "Postcode" },
      { name: "type", label: "Type" },
      { name: "status", label: "Status" },
      { name: "createdAt", label: "Received" },
    ],
    orderBy: [{ createdAt: "desc" }],
    fields: [
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        help: "Track where this enquiry is in your pipeline.",
        options: [
          { value: "new", label: "New" },
          { value: "contacted", label: "Contacted" },
          { value: "booked", label: "Booked" },
          { value: "closed", label: "Closed / lost" },
        ],
      },
      {
        name: "type",
        label: "Source form",
        type: "select",
        options: [
          { value: "booking", label: "Booking / quote form" },
          { value: "availability", label: "Availability search" },
        ],
      },
      { name: "name", label: "Name", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "postcode", label: "Postcode / location", type: "text" },
      { name: "tyreSize", label: "Tyre size", type: "text" },
      { name: "service", label: "Service requested", type: "text" },
      { name: "message", label: "Message", type: "textarea", colSpan: 2 },
      {
        name: "adminNotes",
        label: "Internal notes",
        type: "textarea",
        colSpan: 2,
        help: "Private - never shown on the website.",
      },
      {
        name: "source",
        label: "Came from (page)",
        type: "text",
        colSpan: 2,
        help: "The page the visitor submitted from.",
      },
    ],
  },

  services: {
    key: "services",
    model: "service",
    labelSingular: "Service",
    labelPlural: "Services",
    icon: "wrench",
    listColumns: [
      { name: "title", label: "Title" },
      { name: "slug", label: "Slug" },
      { name: "published", label: "Published" },
    ],
    orderBy: [{ order: "asc" }, { title: "asc" }],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug (URL)", type: "text", required: true },
      PUBLISH_FIELD,
      ORDER_FIELD,
      {
        name: "shortDescription",
        label: "Short description",
        type: "textarea",
        required: true,
        colSpan: 2,
      },
      { name: "priceFrom", label: "Price from (free text)", type: "text" },
      {
        name: "icon",
        label: "Icon name (lucide)",
        type: "text",
        help: "e.g. wrench, truck, gauge. See lucide.dev.",
      },
      {
        name: "features",
        label: "Feature bullets (one per line)",
        type: "stringList",
        colSpan: 2,
      },
      { name: "body", label: "Body content", type: "richtext", colSpan: 2 },
      { name: "heroImage", label: "Hero image", type: "image", colSpan: 2 },
      ...SEO_FIELDS,
    ],
  },

  posts: {
    key: "posts",
    model: "blogPost",
    labelSingular: "Blog post",
    labelPlural: "Blog posts",
    icon: "newspaper",
    listColumns: [
      { name: "title", label: "Title" },
      { name: "published", label: "Published" },
    ],
    orderBy: [{ publishedAt: "desc" }],
    // Articles live at /guides/[slug]. Only published posts have a live page
    // (getPostBySlug filters published), so unpublished rows hide the link.
    viewPath: { base: "/guides", slugField: "slug", onlyWhen: "published" },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug (URL)", type: "text", required: true },
      PUBLISH_FIELD,
      { name: "publishedAt", label: "Publish date", type: "date" },
      { name: "author", label: "Author", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea", colSpan: 2 },
      {
        name: "tags",
        label: "Tags (one per line)",
        type: "stringList",
        colSpan: 2,
      },
      { name: "coverImage", label: "Cover image", type: "image", colSpan: 2 },
      { name: "body", label: "Body content", type: "richtext", colSpan: 2 },
      ...SEO_FIELDS,
    ],
  },

  reviews: {
    key: "reviews",
    model: "review",
    labelSingular: "Review",
    labelPlural: "Reviews",
    icon: "star",
    listColumns: [
      { name: "author", label: "Author" },
      { name: "rating", label: "Rating" },
      { name: "location", label: "Location" },
      { name: "published", label: "Published" },
    ],
    orderBy: [{ featured: "desc" }, { date: "desc" }],
    fields: [
      { name: "author", label: "Author name", type: "text", required: true },
      { name: "rating", label: "Rating (1-5)", type: "number", required: true },
      { name: "text", label: "Review text", type: "textarea", required: true, colSpan: 2 },
      { name: "location", label: "Location (free text)", type: "text" },
      { name: "source", label: "Source (Google, Trustpilot…)", type: "text" },
      { name: "date", label: "Date", type: "date" },
      { name: "featured", label: "Featured", type: "boolean" },
      PUBLISH_FIELD,
      ORDER_FIELD,
      {
        name: "serviceId",
        label: "Attach to service (optional)",
        type: "select",
        optionsFrom: { model: "service", labelField: "title" },
      },
    ],
  },

  faqs: {
    key: "faqs",
    model: "faq",
    labelSingular: "FAQ",
    labelPlural: "FAQs",
    icon: "circle-help",
    listColumns: [
      { name: "question", label: "Question" },
      { name: "category", label: "Category" },
      { name: "published", label: "Published" },
    ],
    orderBy: [{ order: "asc" }],
    fields: [
      { name: "question", label: "Question", type: "text", required: true, colSpan: 2 },
      { name: "answer", label: "Answer", type: "textarea", required: true, colSpan: 2 },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { value: "general", label: "General (homepage & /faq)" },
          { value: "service", label: "Service" },
          { value: "location", label: "Location" },
        ],
      },
      PUBLISH_FIELD,
      ORDER_FIELD,
      {
        name: "serviceId",
        label: "Attach to service (optional)",
        type: "select",
        optionsFrom: { model: "service", labelField: "title" },
      },
    ],
  },
};

export function getResource(key: string): ResourceConfig | undefined {
  return RESOURCES[key];
}

/** Ordered list for the admin sidebar. */
export const RESOURCE_ORDER = [
  "leads",
  "services",
  "posts",
  "reviews",
  "faqs",
] as const;
