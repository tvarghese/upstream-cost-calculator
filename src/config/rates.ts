export const NIGHTS = 4;

export const ROYAL_GORGE_RATE = 234;
export const ROYAL_GORGE_OCC = 12;
export const ROYAL_GORGE_PERSON = ROYAL_GORGE_RATE / ROYAL_GORGE_OCC;
export const ROYAL_GORGE_ADDON = ROYAL_GORGE_PERSON * NIGHTS;

export const MEAL_RATES = { adult: 147, child: 73.5 } as const;

export const REG_FEES = {
  family: { label: "Family", fee: 300 },
  ya: { label: "Individual Registration", fee: 150 },
  student: { label: "Campus Student", fee: 50 },
} as const;

/** ZION + UPSTREAM together. Paid to JY. Includes UPSTREAM registration, Royal Gorge lodging, and meals. */
export const ZION_BOTH_FEE = 550;
/** ZION only. Paid to JY. UPSTREAM registration is the family fee. */
export const ZION_ONLY_FEE = 350;

export const ROOMS_YA = [
  {
    id: "pritchell",
    name: "Pritchell Single Double",
    desc: "1 Single Bed, 1 Double Bed · sleeps 3",
    rate: 94,
    maxOcc: 3,
  },
  {
    id: "mountlaurel",
    name: "Mount Laurel West 2 Queen",
    desc: "2 Queen Beds · sleeps 4 · handicap accessible",
    rate: 144,
    maxOcc: 4,
  },
  {
    id: "royalgorge",
    name: "Youth Royal Gorge Bunks",
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
    minPeople: 5,
  },
  {
    id: "mountlaurel",
    name: "Mount Laurel",
    desc: "2 Queen Beds",
    rate: 144,
    limited: false,
    minPeople: 2,
  },
  {
    id: "pritchell",
    name: "Pritchell",
    desc: "Single, Double",
    rate: 94,
    limited: false,
    minPeople: 2,
    maxPeople: 4,
  },
] as const;

export function getFamilyRoomsForPeople(people: number) {
  return ROOMS_FAM.filter((r) => {
    if (people < r.minPeople) return false;
    if ("maxPeople" in r && people > r.maxPeople) return false;
    return true;
  });
}

export function cheapestFamilyRoom(people: number) {
  const available = getFamilyRoomsForPeople(people);
  return available.reduce<(typeof available)[number] | undefined>((best, room) => {
    if (!best || room.rate < best.rate) return room;
    return best;
  }, undefined);
}

export function resolveFamilyRoom(
  people: number,
  preferredId: string,
  preferCheapest: boolean,
): string {
  const available = getFamilyRoomsForPeople(people);
  if (available.length === 0 || available.some((room) => room.id === preferredId)) {
    return preferredId;
  }
  if (preferCheapest) {
    return cheapestFamilyRoom(people)?.id ?? preferredId;
  }
  return available.find((room) => room.id === "mountlaurel")?.id ?? available[0].id;
}

export const ROOM_REFERENCE = [
  {
    name: "Pritchell Single Double",
    rate: 94,
    note: "up to 3 (YA) / families welcome",
    beds: "1 Single Bed, 1 Double Bed",
    bedCount: 2,
    sleeps: 3,
    accessible: false,
    amenities: [
      { label: "Private Bathroom", included: true },
      { label: "Desk", included: true },
      { label: "Iron & Board", included: true },
      { label: "Hairdryer", included: false },
    ],
  },
  {
    name: "Mount Laurel West 2 Queen",
    rate: 144,
    note: "up to 4 (YA) / families welcome",
    beds: "2 Queen Beds",
    bedCount: 2,
    sleeps: 4,
    accessible: true,
    amenities: [
      { label: "Private Bathroom", included: true },
      { label: "Mini Fridge", included: true },
      { label: "Coffee Maker", included: true },
      { label: "Desk", included: true },
      { label: "Hairdryer", included: true },
      { label: "Iron & Board", included: true },
    ],
  },
  {
    name: "Walnut 1 Queen Bed and 2 Bunks",
    rate: 114,
    note: "families only · 13 rooms",
    beds: "1 Queen Bed, 2 sets of Bunks",
    bedCount: 5,
    sleeps: 6,
    accessible: false,
    amenities: [
      { label: "Private Bathroom", included: true },
      { label: "Hairdryer", included: false },
    ],
  },
  {
    name: "Youth Royal Gorge Bunks",
    rate: null,
    note: "YA / older kids · 12/room",
    beds: "6 sets of Bunks",
    bedCount: null,
    sleeps: 12,
    accessible: false,
    amenities: [
      { label: "Private Bathroom", included: true },
      { label: "Hairdryer", included: false },
    ],
  },
] as const;
