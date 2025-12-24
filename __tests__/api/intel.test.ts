import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/intel/route";
import { Redis } from "@upstash/redis";

// Mock environment variable
const MOCK_SECRET = "statecraft_secret_123";
process.env.CR_INTEL_SECRET_KEY = MOCK_SECRET;

// Properly mock the Redis client
jest.mock("@upstash/redis", () => {
  const mockRedis = {
    get: jest.fn(),
    set: jest.fn(),
    lpush: jest.fn(),
  };
  return {
    Redis: {
      fromEnv: jest.fn(() => mockRedis),
    },
  };
});

// Helper to get the mock instance
const getMockRedis = () => {
  return Redis.fromEnv() as unknown as {
    get: jest.Mock;
    set: jest.Mock;
    lpush: jest.Mock;
  };
};

describe("Intelligence API (/api/intel)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/intel", () => {
    it("returns fallback data when Redis is empty", async () => {
      const mockRedis = getMockRedis();
      mockRedis.get.mockResolvedValue(null);

      const response = await GET();
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.headline).toBe("ESTABLISHING SECURE UPLINK... [STAND BY]");
      expect(json.ap_unit).toBe("Unit 0");
      expect(mockRedis.get).toHaveBeenCalledWith("daily_intel");
    });

    it("returns stored data when Redis has content", async () => {
      const mockRedis = getMockRedis();
      const mockData = {
        headline: "Live Update",
        date: "2025-12-22",
        activity: "Test Activity",
        ap_unit: "Unit 2",
        concept: "Checks and Balances",
        foundational_doc: "Federalist 51",
        seo_slug: "checks-and-balances-update"
      };
      mockRedis.get.mockResolvedValue(mockData);

      const response = await GET();
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.headline).toBe("Live Update");
      expect(json).toEqual(mockData);
    });
  });

  describe("POST /api/intel", () => {
    it("successfully persists and archives data with valid token", async () => {
      const mockRedis = getMockRedis();
      mockRedis.set.mockResolvedValue("OK");
      mockRedis.lpush.mockResolvedValue(1);

      const body = {
        headline: "New Intelligence",
        date: "2025-12-22",
        activity: "Deployment successful.",
        ap_unit: "Unit 5",
        concept: "Linkage Institutions",
        foundational_doc: "Letter from Birmingham Jail",
        seo_slug: "linkage-institutions-v5"
      };

      const request = new NextRequest("http://localhost:3000/api/intel", {
        method: "POST",
        headers: {
          authorization: `Bearer ${MOCK_SECRET}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(mockRedis.set).toHaveBeenCalledWith("daily_intel", body);
      expect(mockRedis.lpush).toHaveBeenCalledWith("intel_archive", body);
    });

    it("blocks unauthorized requests with 401", async () => {
      const request = new NextRequest("http://localhost:3000/api/intel", {
        method: "POST",
        headers: {
          authorization: "Bearer wrong_token",
        },
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(401);
      expect(json.error).toBe("Unauthorized");
    });

    it("returns 400 for invalid/missing payload", async () => {
      const request = new NextRequest("http://localhost:3000/api/intel", {
        method: "POST",
        headers: {
          authorization: `Bearer ${MOCK_SECRET}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ headline: "Missing fields" }),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.error).toContain("Invalid payload");
    });
  });
});
