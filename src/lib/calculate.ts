import {
  cheapestFamilyRoom,
  getFamilyRoomsForPeople,
  MEAL_RATES,
  NIGHTS,
  REG_FEES,
  ROYAL_GORGE_ADDON,
  ROYAL_GORGE_OCC,
  ROYAL_GORGE_PERSON,
  ROYAL_GORGE_RATE,
  ROOMS_FAM,
  ROOMS_YA,
  ZION_BOTH_FEE,
  ZION_ONLY_FEE,
} from "../config/rates";
import { fmt } from "./format";
import type {
  CampusStudentPath,
  FamilyCostResult,
  FamilyInput,
  IndividualCostResult,
  IndividualInput,
  LineItem,
} from "./types";

export function lodgingHeadcount(
  familyMembers: number,
  campusStudents: number,
  path: CampusStudentPath,
): number {
  if (campusStudents > 0 && path === "with_family") {
    return familyMembers + campusStudents;
  }
  return familyMembers;
}

export function calculateIndividual(input: IndividualInput): IndividualCostResult {
  const { category, yaRoom, yaCount } = input;
  const regFee = REG_FEES[category].fee;
  const yaRoomData = ROOMS_YA.find((r) => r.id === yaRoom)!;

  let yaRoomShare = 0;
  if (yaRoom === "royalgorge") {
    yaRoomShare = ROYAL_GORGE_PERSON * NIGHTS;
  } else if (yaRoomData.rate !== null && "maxOcc" in yaRoomData) {
    const sharing = Math.min(yaCount, yaRoomData.maxOcc);
    yaRoomShare = (yaRoomData.rate * NIGHTS) / sharing;
  }

  const yaMeals = MEAL_RATES.adult;
  const royalGorgeShare = yaRoom === "royalgorge" ? yaRoomShare : 0;
  const ridgecrestRoomShare = yaRoom === "royalgorge" ? 0 : yaRoomShare;
  const jyTotal = regFee + royalGorgeShare;
  const ridgecrestTotal = ridgecrestRoomShare + yaMeals;
  const grandTotal = jyTotal + ridgecrestTotal;

  const lineItems: LineItem[] = [
    {
      label: "JY USA Registration",
      amount: regFee,
      sub: REG_FEES[category].label,
      dest: "JY",
    },
    ...(royalGorgeShare > 0
      ? [
          {
            label: "Royal Gorge Bunk – your share",
            amount: royalGorgeShare,
            sub: `$${ROYAL_GORGE_RATE}/night ÷ ${ROYAL_GORGE_OCC} people = $${ROYAL_GORGE_PERSON}/night × ${NIGHTS} nights`,
            dest: "JY" as const,
          },
        ]
      : []),
    ...(ridgecrestRoomShare > 0
      ? [
          {
            label: `Room – ${yaRoomData.name} (your share)`,
            amount: ridgecrestRoomShare,
            sub: `$${yaRoomData.rate}/night × ${NIGHTS} nights ÷ ${Math.min(yaCount, "maxOcc" in yaRoomData ? yaRoomData.maxOcc : 4)} people sharing`,
            dest: "Ridgecrest" as const,
          },
        ]
      : []),
    {
      label: "Meals",
      amount: yaMeals,
      sub: `1 person (12+) × $${MEAL_RATES.adult}`,
      dest: "Ridgecrest",
    },
  ];

  return {
    regFee,
    jyTotal,
    ridgecrestTotal,
    grandTotal,
    lineItems,
    yaRoomShare,
    yaMeals,
  };
}

function comparisonRoom(people: number, preferredId: string) {
  const available = getFamilyRoomsForPeople(people);
  if (available.length === 0 || available.some((room) => room.id === preferredId)) {
    return { id: preferredId, assumed: false };
  }
  const cheapest = cheapestFamilyRoom(people);
  return { id: cheapest?.id ?? preferredId, assumed: Boolean(cheapest) };
}

function familyMembersOf(input: FamilyInput) {
  return (
    input.adults +
    input.disciples +
    input.older18plus +
    input.kids7to11 +
    input.kidsUnder7
  );
}

function priceFamily(input: FamilyInput): Omit<FamilyCostResult, "comparisonNote"> {
  const {
    adults,
    disciples,
    older18plus,
    kids7to11,
    kidsUnder7,
    famRoom,
    royalGorgeKids,
    campusStudents,
    campusStudentPath,
  } = input;

  const regFee = REG_FEES.family.fee;
  const famRoomData = ROOMS_FAM.find((r) => r.id === famRoom)!;
  const famRoomTotal = famRoomData.rate * NIGHTS;

  const totalFamPeople = familyMembersOf(input);
  const withCampus = campusStudents > 0;
  const onPackage = withCampus && campusStudentPath === "package";
  const withFamily = withCampus && campusStudentPath === "with_family";
  const studentWord = campusStudents === 1 ? "campus student" : "campus students";

  const mealAdults12plus = adults + disciples + older18plus;
  const campusMeals = withFamily ? campusStudents * MEAL_RATES.adult : 0;
  const famMealsTotal =
    mealAdults12plus * MEAL_RATES.adult + kids7to11 * MEAL_RATES.child + campusMeals;

  const effectiveRGKids = Math.min(royalGorgeKids, older18plus);
  const royalGorgeTotal = effectiveRGKids * ROYAL_GORGE_ADDON;
  const zionFee = onPackage
    ? campusStudents * ZION_BOTH_FEE
    : withFamily
      ? campusStudents * ZION_ONLY_FEE
      : 0;

  const jyTotal = regFee + royalGorgeTotal + zionFee;
  const ridgecrestTotal = famRoomTotal + famMealsTotal;
  const grandTotal = jyTotal + ridgecrestTotal;
  const householdPeople = totalFamPeople + campusStudents;
  const famPerPerson = householdPeople > 0 ? grandTotal / householdPeople : 0;

  const registrationSub = withFamily
    ? `Family. Includes ${campusStudents} ${studentWord} staying with the family. No separate UPSTREAM fee for them.`
    : "Family";

  const lineItems: LineItem[] = [
    {
      label: withCampus ? "UPSTREAM Registration" : "JY USA Registration",
      amount: regFee,
      sub: registrationSub,
      dest: "JY",
    },
    ...(onPackage
      ? [
          {
            label: "UPSTREAM Registration (campus students)",
            amount: 0,
            amountLabel: "Included",
            sub: `Included in ZION registration for ${campusStudents} ${studentWord}. They are not registered for UPSTREAM separately.`,
            dest: "JY" as const,
          },
        ]
      : []),
    ...(withCampus
      ? [
          {
            label: "ZION Registration",
            amount: zionFee,
            sub: onPackage
              ? `${campusStudents} × $${ZION_BOTH_FEE}. Includes UPSTREAM registration, Royal Gorge lodging, and UPSTREAM meals.`
              : `${campusStudents} × $${ZION_ONLY_FEE}. ZION only. UPSTREAM registration is covered by the family fee.`,
            dest: "JY" as const,
          },
        ]
      : []),
    {
      label: `Room – ${famRoomData.name}`,
      amount: famRoomTotal,
      sub: `$${famRoomData.rate}/night × ${NIGHTS} nights (whole room, fixed cost)${famRoomData.limited ? " · ⚑ Limited — 13 rooms only" : ""}`,
      dest: "Ridgecrest",
    },
    ...(effectiveRGKids > 0
      ? [
          {
            label: `Royal Gorge Add-on (${effectiveRGKids} older kid${effectiveRGKids > 1 ? "s" : ""})`,
            amount: royalGorgeTotal,
            sub: `${effectiveRGKids} × $${ROYAL_GORGE_ADDON} flat — stays with friends in bunk room`,
            dest: "JY" as const,
          },
        ]
      : []),
    {
      label: withCampus ? "UPSTREAM Meals" : "Meals",
      amount: famMealsTotal,
      sub: [
        mealAdults12plus > 0 &&
          `${mealAdults12plus} person${mealAdults12plus > 1 ? "s" : ""} (12+) × $${MEAL_RATES.adult}`,
        kids7to11 > 0 &&
          `${kids7to11} child${kids7to11 > 1 ? "ren" : ""} (7–11) × $${MEAL_RATES.child}`,
        kidsUnder7 > 0 && `${kidsUnder7} under 7 – free`,
        withFamily &&
          `${campusStudents} ${studentWord} × $${MEAL_RATES.adult}`,
        onPackage &&
          `${campusStudents} ${studentWord} included in ZION registration`,
      ]
        .filter(Boolean)
        .join("  +  "),
      dest: "Ridgecrest",
    },
  ];

  return {
    regFee,
    jyTotal,
    ridgecrestTotal,
    grandTotal,
    lineItems,
    totalFamPeople,
    householdPeople,
    famPerPerson,
    effectiveRGKids,
    royalGorgeTotal,
  };
}

function buildComparisonNote(
  campusStudents: number,
  otherPath: CampusStudentPath,
  otherTotal: number,
  selectedTotal: number,
  assumedRoomName: string | null,
  currentRoomName: string,
  otherHeadcount: number,
) {
  const who =
    campusStudents === 1 ? "this campus student" : `these ${campusStudents} campus students`;
  const choice =
    otherPath === "with_family"
      ? `registered for ZION only (${fmt(ZION_ONLY_FEE)}) and stayed in your family room`
      : `registered through ZION for both (${fmt(ZION_BOTH_FEE)}) and stayed in Royal Gorge`;
  const diff = otherTotal - selectedTotal;
  const money =
    diff === 0
      ? `the household total would be ${fmt(otherTotal)} (the same)`
      : `the household total would be ${fmt(otherTotal)} (${fmt(Math.abs(diff))} ${diff < 0 ? "less" : "more"})`;
  const room = assumedRoomName
    ? ` That includes switching to ${assumedRoomName}, because ${currentRoomName} does not fit ${otherHeadcount} people.`
    : "";
  return `If ${who} ${choice}, ${money}.${room}`;
}

export function calculateFamily(input: FamilyInput): FamilyCostResult {
  const selected = priceFamily(input);
  if (input.campusStudents <= 0) {
    return { ...selected, comparisonNote: null };
  }

  const otherPath: CampusStudentPath =
    input.campusStudentPath === "package" ? "with_family" : "package";
  const otherHeadcount = lodgingHeadcount(
    familyMembersOf(input),
    input.campusStudents,
    otherPath,
  );
  const otherRoom = comparisonRoom(otherHeadcount, input.famRoom);
  const other = priceFamily({
    ...input,
    campusStudentPath: otherPath,
    famRoom: otherRoom.id,
  });
  const currentRoom = ROOMS_FAM.find((room) => room.id === input.famRoom);
  const assumedRoom = otherRoom.assumed
    ? ROOMS_FAM.find((room) => room.id === otherRoom.id)
    : undefined;

  return {
    ...selected,
    comparisonNote: buildComparisonNote(
      input.campusStudents,
      otherPath,
      other.grandTotal,
      selected.grandTotal,
      assumedRoom?.name ?? null,
      currentRoom?.name ?? "the current room",
      otherHeadcount,
    ),
  };
}
