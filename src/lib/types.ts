export type Category = "family" | "ya" | "student";

export type PaymentDestination = "JY" | "Ridgecrest";

export interface LineItem {
  label: string;
  amount: number;
  sub: string;
  dest: PaymentDestination;
}

export interface CostResult {
  regFee: number;
  jyTotal: number;
  ridgecrestTotal: number;
  grandTotal: number;
  lineItems: LineItem[];
}

export interface IndividualInput {
  category: "ya" | "student";
  yaRoom: string;
  yaCount: number;
}

export interface FamilyInput {
  adults: number;
  disciples: number;
  older18plus: number;
  kids7to11: number;
  kidsUnder7: number;
  famRoom: string;
  royalGorgeKids: number;
}

export interface FamilyCostResult extends CostResult {
  totalFamPeople: number;
  totalKids: number;
  famPerPerson: number;
  effectiveRGKids: number;
  royalGorgeTotal: number;
  isLargeFamily: boolean;
  isCapped: boolean;
  uncappedTotal: number;
}

export interface IndividualCostResult extends CostResult {
  yaRoomShare: number;
  yaMeals: number;
}
