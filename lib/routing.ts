export type DomainTarget = "apgov" | "gov" | "other";

export function classifyHost(host: string): DomainTarget {
  const h = (host || "").toLowerCase();
  if (h.includes("apgov.statecraftsims.com") || h.includes("apgov.statecraftsim.com")) {
    return "apgov";
  }
  // IMPORTANT: `apgov.*` contains `gov.*` as a substring, so this must be checked after apgov.
  if (h.includes("gov.statecraftsims.com") || h.includes("gov.statecraftsim.com")) {
    return "gov";
  }
  return "other";
}

export function getGovRewritePath(host: string, pathname: string): string | null {
  const domain = classifyHost(host);
  if (domain !== "gov") return null;
  if (pathname === "/") return "/higher-ed";
  return null;
}


