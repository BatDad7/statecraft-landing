# Statecraft: The Situation Room 🏛️

**Status:** 🟢 Live Production  
**Live URL:** [https://statecraft-landing.vercel.app](https://statecraft-landing.vercel.app)

Statecraft: The Situation Room is a high-fidelity, interactive landing page designed for the modern AP Government classroom. It transforms abstract constitutional concepts into a "Situation Room" experience, combining real-world data with immersive simulation gameplay.

---

## 🧠 Architecture Overview: The "Neural Link"

This project utilizes a sophisticated automated loop to keep the "Intelligence Briefing" fresh and relevant without manual intervention:

1.  **Sensing (Google Trends):** A custom **Make.com** scenario monitors global and national trends via Google Trends.
2.  **Reasoning (Gemini 3 Flash Preview):** Relevant trends are processed through **Gemini 3 Flash Preview** (via Make.com) to synthesize high-stakes educational briefings aligned with AP Gov curriculum.
3.  **Persistence (Upstash Redis):** The synthesized "Intel" is pushed to a secure API endpoint and persisted in **Upstash Redis** (Phase 4 Storage).
5.  **Agentic QA (Gemini):** A custom TypeScript script audits the production site using Gemini 3 Flash Preview to ensure "Situation Room" immersion and curriculum alignment standards.

---

## 🛠️ Tech Stack

*   **Framework:** Next.js 14 (App Router)
*   **Styling:** Tailwind CSS + Framer Motion (Animations)
*   **Icons:** Lucide React
*   **Database:** Upstash Redis
*   **Deployment:** Vercel
*   **Automation:** Make.com + Gemini API

---

## 🔐 Environment Variables

To run this project locally, create a `.env.local` file and provide the following variables:

```bash
# Security key for the /api/intel endpoint
CR_INTEL_SECRET_KEY=your_secret_key

# Upstash Redis Connection (Found in Upstash Console)
UPSTASH_REDIS_REST_URL=https://your-database-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token
```

---

## 🚀 Quick Start

1.  **Clone and Install:**
    ```bash
    git clone https://github.com/BatDad7/statecraft-landing.git
    cd statecraft-landing
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Run QA Tests:**
    ```bash
    # Standard Jest tests
    npm test

    # Link validator
    npm run test:links

    # Smoke Test (System Health)
    npm run test:smoke

    # Vision Check (Agentic QA Audit - Requires GEMINI_API_KEY)
    npm run test:ux

    # Full "Mission Ready" Suite
    npm run test:full
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the application.

3.  **Run Tests:**
    ```bash
    npm test
    ```

---

## 📡 API Reference

### `POST /api/intel`

Updates the live intelligence feed on the landing page. Requires a Bearer Token in the `Authorization` header.

**Headers:**
*   `Authorization: Bearer <CR_INTEL_SECRET_KEY>`
*   `Content-Type: application/json`

**Body:**
```json
{
  "headline": "Active Simulation: The Federal Budget Crisis (AP Unit 2)",
  "date": "2025-12-22",
  "activity": "Students are navigating legislative gridlock and executive veto points."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Secure Uplink Established & Persisted",
  "data": { ... }
}
```

---

## 📜 License

Project developed for Statecraft Simulations. All rights reserved.
