export type SessionType = "Tutoring" | "Group Study";
export type Level = "Algebra" | "Geometry" | "Trig" | "Precalc" | "SAT/PSAT";

export type Session = {
  id: string;
  title: string;
  type: SessionType;
  level: Level;
  day: string;
  time: string;
  location: string;
  spotsTotal: number;
  spotsLeft: number;
};

export const demoSessions: Session[] = [
  {
    id: "s1",
    title: "1:1 Algebra Help",
    type: "Tutoring",
    level: "Algebra",
    day: "Monday",
    time: "4:00–4:30 PM",
    location: "Room 204 / Online",
    spotsTotal: 6,
    spotsLeft: 3,
  },
  {
    id: "s2",
    title: "Geometry Proofs Workshop",
    type: "Group Study",
    level: "Geometry",
    day: "Tuesday",
    time: "5:00–5:45 PM",
    location: "Library Table B",
    spotsTotal: 10,
    spotsLeft: 7,
  },
  {
    id: "s3",
    title: "Trig Essentials (Unit Circle)",
    type: "Tutoring",
    level: "Trig",
    day: "Wednesday",
    time: "4:15–4:45 PM",
    location: "Online",
    spotsTotal: 6,
    spotsLeft: 5,
  },
  {
    id: "s4",
    title: "Precalc Problem Set Sprint",
    type: "Group Study",
    level: "Precalc",
    day: "Thursday",
    time: "4:30–5:15 PM",
    location: "Room 118",
    spotsTotal: 12,
    spotsLeft: 9,
  },
  {
    id: "s5",
    title: "SAT/PSAT Math Strategies",
    type: "Group Study",
    level: "SAT/PSAT",
    day: "Friday",
    time: "4:00–4:45 PM",
    location: "Online",
    spotsTotal: 20,
    spotsLeft: 14,
  },
];
