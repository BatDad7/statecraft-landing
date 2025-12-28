# Statecraft Vertical Expansion Strategy

**Objective:** Transform the current single-page AP Gov application into a "Vertical Factory" capable of spinning up new, targeted landing pages (International Security, Foreign Policy) with minimal code changes.

---

## Phase 1: The "Config-Driven" Architecture

We will move away from hardcoded text in components and adopt a **Configuration Injection** pattern.

### 1. The Vertical Configuration Schema
We will define a strict TypeScript interface that every vertical must satisfy.

```typescript
// types/vertical.ts
export interface VerticalConfig {
  slug: string; // "ap-gov", "intl-security"
  meta: {
    title: string;
    description: string;
  };
  theme: {
    primaryColor: string; // "terminal-green", "cyan-500", "amber-500"
    accentColor: string;
    bgPattern: "tactical-grid" | "world-map" | "hex-mesh";
  };
  content: {
    hero: {
      headline: string;
      subhead: string;
      badge: string; // "College Board Aligned" vs "ISA Accredited"
      cta_primary: string;
      cta_secondary: string;
    };
    simulator: {
      title: string; // "Domestic Policy Simulator" vs "Global Conflict Simulator"
      scenario: string; // "Speaker threatens shutdown" vs "Rogue state tests missile"
      action_left: { label: string; unit_ref: string }; // "Veto Bill"
      action_right: { label: string; unit_ref: string }; // "Leak Memo"
    };
    ai_firewall: {
      fake_prompt: string; // "Explain Fed 10" vs "Explain Security Dilemma"
      real_insight: string; // "Lobbyist pressure" vs "Backchannel diplomacy"
    };
  };
  pacing_calendar: PacingPeriod[]; // Unique calendar for each vertical
  ai_prompt_context: string; // System instruction for the Daily Briefing
}
```

### 2. The Registry (`data/verticals.ts`)
A central file exporting the configurations.

```typescript
import { apGovConfig } from './configs/ap-gov';
import { irConfig } from './configs/ir';

export const VERTICALS: Record<string, VerticalConfig> = {
  'ap-gov': apGovConfig,
  'intl-security': irConfig,
  // Add new verticals here
};
```

---

## Phase 2: Component Refactoring

We will refactor existing components to accept `config` props.

*   **`HeroSectionClient.tsx`** → Becomes generic.
    *   *Before:* `<h1>Teach <span className="text-terminal-green">Government</span>...</h1>`
    *   *After:* `<h1>{config.hero.headline}</h1>` (with dynamic color classes).
*   **`CrisisSimulator.tsx`** → Becomes `VignetteSimulator.tsx`.
    *   Accepts `scenario`, `actions`, and `colors` as props.
*   **`StandardsMapper.tsx`** → Becomes `CurriculumMapper.tsx`.
    *   Dropdown options populated from `config.pacing_calendar`.

---

## Phase 3: The "Multi-Brain" AI Engine

We update the Cron Job to generate briefings for **ALL** active verticals daily.

**`lib/intel.ts` Refactor:**
```typescript
export async function generateBrief(verticalSlug: string) {
  const config = VERTICALS[verticalSlug];
  // 1. Get Topic from Config's Pacing Calendar
  // 2. Send Config's specific Prompt to Gemini
  // 3. Save to Redis key: `daily_brief:${verticalSlug}`
}
```

**Cron Route (`api/cron/daily-brief`):**
```typescript
export async function GET() {
  const results = await Promise.all(
    Object.keys(VERTICALS).map(slug => generateBrief(slug))
  );
  return NextResponse.json(results);
}
```

---

## Phase 4: The "Gemini Architect" Pipeline (Spin-Up Protocol)

This is how we create a new page in **5 minutes**:

1.  **You provide:** "Product: International Relations. Audience: College Profs. Tone: Realist/Strategic."
2.  **We run:** `npm run create-vertical "International Relations"`
3.  **The Script (powered by Gemini):**
    *   Generates `data/configs/ir.ts` with all copy/scenarios filled out.
    *   Generates a custom Pacing Calendar based on a standard IR syllabus.
4.  **We Review:** Check the JSON.
5.  **We Deploy:** The route `statecraftsims.com/intl-relations` is instantly live.

---

## Next Steps

To begin this transition:
1.  **Refactor `app/page.tsx`** to use a hardcoded `apGovConfig` object first (Concept Proof).
2.  **Move `app/page.tsx`** to `app/[slug]/page.tsx`.
3.  **Build the Generator Script.**

