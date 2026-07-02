export const NIGHTS = 4;

export const ROYAL_GORGE_RATE = 234;
export const ROYAL_GORGE_OCC = 12;
export const ROYAL_GORGE_PERSON = ROYAL_GORGE_RATE / ROYAL_GORGE_OCC;
export const ROYAL_GORGE_ADDON = 100;

export const MEAL_RATES = { adult: 147, child: 73.5 } as const;

export const REG_FEES = {
  family: { label: "Couple / Family", fee: 300 },
  ya: { label: "Individual Registration", fee: 150 },
  student: { label: "Campus Student", fee: 50 },
} as const;

export const ROOMS_YA = [
  {
    id: "pritchell",
    name: "Pritchell",
    desc: "Single / Double / 2 Queen",
    rate: 94,
    maxOcc: 3,
  },
  {
    id: "mountlaurel",
    name: "Mount Laurel",
    desc: "Premium",
    rate: 144,
    maxOcc: 4,
  },
  {
    id: "royalgorge",
    name: "Royal Gorge (Bunk)",
    desc: "Organizers assign 12 per room",
    rate: null,
  },
] as const;

export const ROOMS_FAM = [
  {
    id: "walnut",
    name: "Walnut",
    desc: "1 Queen + 2 Bunks · only 13 rooms · first come, first served",
    rate: 114,
    limited: true,
  },
  {
    id: "mountlaurel",
    name: "Mount Laurel",
    desc: "Premium",
    rate: 144,
    limited: false,
  },
  {
    id: "pritchell",
    name: "Pritchell",
    desc: "Single / Double / 2 Queen",
    rate: 94,
    limited: false,
  },
] as const;

export const ROOM_REFERENCE = [
  { name: "Pritchell", rate: 94, note: "up to 3 (YA) / families welcome" },
  { name: "Mt Laurel", rate: 144, note: "up to 4 (YA) / families welcome" },
  { name: "Walnut", rate: 114, note: "families only · 13 rooms" },
  { name: "Royal Gorge", rate: null, note: "YA / older kids · 12/room" },
] as const;
