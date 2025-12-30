export type DailyBrief = {
  headline: string;
  activity: string;
  topic_tag: string;
  date?: string;
  generated_at?: string;
  vertical?: string;
};

export function parseDailyBrief(
  raw: unknown,
  fallback: DailyBrief
): DailyBrief {
  if (!raw) return fallback;

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as DailyBrief;
      return parsed?.headline && parsed?.activity && parsed?.topic_tag
        ? parsed
        : fallback;
    } catch {
      return fallback;
    }
  }

  if (typeof raw === "object") {
    const obj = raw as DailyBrief;
    return obj?.headline && obj?.activity && obj?.topic_tag ? obj : fallback;
  }

  return fallback;
}


