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

export const COLLEGE_GOV_CALENDAR: PacingPeriod[] = [
  // Fall Semester
  { startMonth: 7, startDay: 20, endMonth: 8, endDay: 30, unit: { id: "INTRO_FALL", name: "Foundations & Constitution", focus: "Constitutional Design, Federalism", pain_point: "Theory vs. Practice" } },
  { startMonth: 9, startDay: 1, endMonth: 9, endDay: 31, unit: { id: "INSTITUTIONS_FALL", name: "Legislative & Executive", focus: "Process, Gridlock, Powers", pain_point: "Institutional Friction" } },
  { startMonth: 10, startDay: 1, endMonth: 10, endDay: 30, unit: { id: "COURTS_RIGHTS_FALL", name: "Judiciary & Civil Rights", focus: "Judicial Review, Liberties", pain_point: "Legal Interpretation" } },
  { startMonth: 11, startDay: 1, endMonth: 11, endDay: 20, unit: { id: "BEHAVIOR_FALL", name: "Political Behavior", focus: "Voting, Parties, Media", pain_point: "Polarization" } },
  
  // Spring Semester
  { startMonth: 0, startDay: 15, endMonth: 1, endDay: 28, unit: { id: "INTRO_SPRING", name: "Foundations & Constitution", focus: "Constitutional Design, Federalism", pain_point: "Theory vs. Practice" } },
  { startMonth: 2, startDay: 1, endMonth: 2, endDay: 31, unit: { id: "INSTITUTIONS_SPRING", name: "Legislative & Executive", focus: "Process, Gridlock, Powers", pain_point: "Institutional Friction" } },
  { startMonth: 3, startDay: 1, endMonth: 3, endDay: 30, unit: { id: "COURTS_RIGHTS_SPRING", name: "Judiciary & Civil Rights", focus: "Judicial Review, Liberties", pain_point: "Legal Interpretation" } },
  { startMonth: 4, startDay: 1, endMonth: 4, endDay: 20, unit: { id: "BEHAVIOR_SPRING", name: "Political Behavior", focus: "Voting, Parties, Media", pain_point: "Polarization" } },
];

export function getTopicForCalendar(calendar: 'ap-gov' | 'college-gov' = 'ap-gov', date: Date = new Date()): APUnit {
  const selectedCalendar = calendar === 'college-gov' ? COLLEGE_GOV_CALENDAR : PACING_CALENDAR;
  
  const month = date.getMonth();
  const day = date.getDate();

  const defaultUnit: APUnit = {
    id: "CURRENT_EVENTS",
    name: "Political Context",
    focus: "Current Events Analysis",
    pain_point: "Connecting theory to news."
  };

  for (const period of selectedCalendar) {
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
      const isAfterStart = month > period.startMonth || (month === period.startMonth && day >= period.startDay);
      const isBeforeEnd = month < period.endMonth || (month === period.endMonth && day <= period.endDay);
      
      if (isAfterStart && isBeforeEnd) {
        return period.unit;
      }
    }
  }

  return defaultUnit;
}

// Backward compatibility wrapper
export function getCurrentTopic(date: Date = new Date()): APUnit {
  return getTopicForCalendar('ap-gov', date);
}
