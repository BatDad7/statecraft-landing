export interface APUnit {
  id: string;
  name: string;
  focus: string;
  pain_point: string;
}

interface PacingPeriod {
  startMonth: number; // 0-11
  startDay: number;
  endMonth: number;
  endDay: number;
  unit: APUnit;
}

export const PACING_CALENDAR: PacingPeriod[] = [
  {
    startMonth: 7, // August
    startDay: 15,
    endMonth: 8, // September
    endDay: 30,
    unit: {
      id: "UNIT_1",
      name: "Foundations of American Democracy",
      focus: "Federalism, Constitution, Brutus No. 1",
      pain_point: "Students struggling with abstract theory vs practice."
    }
  },
  {
    startMonth: 9, // October
    startDay: 1,
    endMonth: 9,
    endDay: 31,
    unit: {
      id: "UNIT_2",
      name: "Interactions Among Branches of Government",
      focus: "Gridlock, Vetoes, Checks and Balances",
      pain_point: "Explaining why Congress moves so slowly."
    }
  },
  {
    startMonth: 10, // November
    startDay: 1,
    endMonth: 10,
    endDay: 30,
    unit: {
      id: "UNIT_3",
      name: "Civil Liberties and Civil Rights",
      focus: "Bill of Rights, Due Process, SCOTUS cases",
      pain_point: "Balancing safety (order) vs individual liberty."
    }
  },
  {
    startMonth: 11, // December
    startDay: 1,
    endMonth: 0, // January (wrap around logic handled in helper)
    endDay: 31,
    unit: {
      id: "UNIT_4_5",
      name: "American Political Ideologies & Participation",
      focus: "Polling, Elections, Media Bias, Voter Turnout",
      pain_point: "Connecting data/polls to actual election outcomes."
    }
  },
  {
    startMonth: 1, // February
    startDay: 1,
    endMonth: 4, // May
    endDay: 15,
    unit: {
      id: "REVIEW",
      name: "Exam Review / Application",
      focus: "FRQ Writing, Argumentation, Synthesis",
      pain_point: "Students forgetting Unit 1 concepts before the May exam."
    }
  }
];

export function getCurrentTopic(date: Date = new Date()): APUnit {
  const month = date.getMonth();
  const day = date.getDate();

  // Simple current events fallback
  const defaultUnit: APUnit = {
    id: "CURRENT_EVENTS",
    name: "Current Events",
    focus: "General Political Context",
    pain_point: "Keeping students engaged during off-season."
  };

  for (const period of PACING_CALENDAR) {
    // Check if date falls within range
    // Handle wrap-around year (Dec-Jan)
    if (period.startMonth > period.endMonth) {
      if (
        (month === period.startMonth && day >= period.startDay) ||
        (month > period.startMonth) ||
        (month < period.endMonth) ||
        (month === period.endMonth && day <= period.endDay)
      ) {
        return period.unit;
      }
    } else {
      // Standard intra-year range
      const isAfterStart = month > period.startMonth || (month === period.startMonth && day >= period.startDay);
      const isBeforeEnd = month < period.endMonth || (month === period.endMonth && day <= period.endDay);
      
      if (isAfterStart && isBeforeEnd) {
        return period.unit;
      }
    }
  }

  return defaultUnit;
}
