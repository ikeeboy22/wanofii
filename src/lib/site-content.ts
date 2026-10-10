import { defaultData, type SiteContent } from "@/lib/store";

export function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function getSupabaseHeaders(key: string) {
  const headers: Record<string, string> = { apikey: key };
  // New sb_secret keys are API keys, not JWTs, and must not be sent as Bearer tokens.
  if (!key.startsWith("sb_secret_")) headers.Authorization = `Bearer ${key}`;
  return headers;
}

export async function readSiteContent(): Promise<SiteContent> {
  const config = getSupabaseConfig();
  if (!config) return defaultData;

  const response = await fetch(
    `${config.url}/rest/v1/wanofii_content?id=eq.1&select=content`,
    {
      headers: getSupabaseHeaders(config.key),
      cache: "no-store",
    },
  );

  if (!response.ok) throw new Error("Could not read site content from the database.");
  const rows = (await response.json()) as Array<{ content?: SiteContent }>;
  return rows[0]?.content ?? defaultData;
}

export function isSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;
  const content = value as Partial<SiteContent>;
  return (
    typeof content.whatsapp === "string" &&
    !!content.hero &&
    typeof content.hero.title === "string" &&
    typeof content.hero.gold === "string" &&
    typeof content.hero.sub === "string" &&
    typeof content.hero.desc === "string" &&
    Array.isArray(content.services) &&
    content.services.length <= 30 &&
    content.services.every(
      (service) =>
        Number.isInteger(service.id) &&
        typeof service.name === "string" &&
        typeof service.description === "string" &&
        typeof service.seo === "string" &&
        typeof service.price === "string" &&
        typeof service.img === "string" &&
        typeof service.active === "boolean",
    )
  );
}
