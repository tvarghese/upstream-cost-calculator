import {
  MEAL_RATES,
  NIGHTS,
  REG_FEES,
  ROYAL_GORGE_ADDON,
  ROYAL_GORGE_OCC,
  ROYAL_GORGE_PERSON,
  ROYAL_GORGE_RATE,
  ROOMS_FAM,
  ROOMS_YA,
} from "../config/rates";
import type {
  FamilyCostResult,
  FamilyInput,
  IndividualCostResult,
  IndividualInput,
  LineItem,
} from "./types";

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
  const ridgecrestTotal = yaRoomShare + yaMeals;
  const grandTotal = regFee + ridgecrestTotal;

  const lineItems: LineItem[] = [
    {
      label: "JY USA Registration",
      amount: regFee,
      sub: REG_FEES[category].label,
      dest: "JY",
    },
    {
      label:
        yaRoom === "royalgorge"
          ? "Royal Gorge Bunk – your share"
          : `Room – ${yaRoomData.name} (your share)`,
      amount: yaRoomShare,
      sub:
        yaRoom === "royalgorge"
          ? `$${ROYAL_GORGE_RATE}/night ÷ ${ROYAL_GORGE_OCC} people = $${ROYAL_GORGE_PERSON}/night × ${NIGHTS} nights`
          : `$${yaRoomData.rate}/night × ${NIGHTS} nights ÷ ${Math.min(yaCount, "maxOcc" in yaRoomData ? yaRoomData.maxOcc : 4)} people sharing`,
      dest: "Ridgecrest",
    },
    {
      label: "Meals",
      amount: yaMeals,
      sub: `1 person (12+) × $${MEAL_RATES.adult}`,
      dest: "Ridgecrest",
    },
  ];

  return {
    regFee,
    ridgecrestTotal,
    grandTotal,
    lineItems,
    yaRoomShare,
    yaMeals,
  };
}

export function calculateFamily(input: FamilyInput): FamilyCostResult {
  const {
    adults,
    disciples,
    older18plus,
    kids7to11,
    kidsUnder7,
    famRoom,
    royalGorgeKids,
  } = input;

  const regFee = REG_FEES.family.fee;
  const famRoomData = ROOMS_FAM.find((r) => r.id === famRoom)!;
  const famRoomTotal = famRoomData.rate * NIGHTS;

  const totalFamPeople =
    adults + disciples + older18plus + kids7to11 + kidsUnder7;
  const mealAdults12plus = adults + disciples + older18plus;
  const famMealsTotal =
    mealAdults12plus * MEAL_RATES.adult + kids7to11 * MEAL_RATES.child;

  const effectiveRGKids = Math.min(royalGorgeKids, older18plus);
  const royalGorgeTotal = effectiveRGKids * ROYAL_GORGE_ADDON;

  const ridgecrestTotal = famRoomTotal + famMealsTotal + royalGorgeTotal;
  const grandTotal = regFee + ridgecrestTotal;
  const famPerPerson = totalFamPeople > 0 ? grandTotal / totalFamPeople : 0;

  const lineItems: LineItem[] = [
    {
      label: "JY USA Registration",
      amount: regFee,
      sub: "Couple / Family",
      dest: "JY",
    },
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
            dest: "Ridgecrest" as const,
          },
        ]
      : []),
    {
      label: "Meals",
      amount: famMealsTotal,
      sub: [
        mealAdults12plus > 0 &&
          `${mealAdults12plus} person${mealAdults12plus > 1 ? "s" : ""} (12+) × $${MEAL_RATES.adult}`,
        kids7to11 > 0 &&
          `${kids7to11} child${kids7to11 > 1 ? "ren" : ""} (7–11) × $${MEAL_RATES.child}`,
        kidsUnder7 > 0 && `${kidsUnder7} under 7 – free`,
      ]
        .filter(Boolean)
        .join("  +  "),
      dest: "Ridgecrest",
    },
  ];

  return {
    regFee,
    ridgecrestTotal,
    grandTotal,
    lineItems,
    totalFamPeople,
    famPerPerson,
    effectiveRGKids,
    royalGorgeTotal,
  };
}
