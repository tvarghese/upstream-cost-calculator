export type Category = "family" | "ya" | "student";

export type CampusStudentPath = "package" | "with_family";

export type PaymentDestination = "JY" | "Ridgecrest";

export interface LineItem {
  label: string;
  amount: number;
  sub: string;
  dest: PaymentDestination;
  amountLabel?: string;
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
  campusStudents: number;
  campusStudentPath: CampusStudentPath;
}

export interface FamilyCostResult extends CostResult {
  totalFamPeople: number;
  householdPeople: number;
  famPerPerson: number;
  effectiveRGKids: number;
  royalGorgeTotal: number;
  comparisonNote: string | null;
}

export interface IndividualCostResult extends CostResult {
  yaRoomShare: number;
  yaMeals: number;
}
