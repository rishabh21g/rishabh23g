export type ContributionDay = {
  date: string; // YYYY-MM-DD
  contributionCount: number;
  weekday: number; // 0..6
};

export type ContributionWeek = {
  firstDay: string;
  contributionDays: ContributionDay[]; 
};

export type ContributionMonth = {
  name: string; // "Apr"
  firstDay: string;
  totalWeeks: number;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
  months: ContributionMonth[];
};