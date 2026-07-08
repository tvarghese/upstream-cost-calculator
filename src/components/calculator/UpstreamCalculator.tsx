import { useState } from "react";
import { EVENT } from "../../config/event";
import { calculateFamily, calculateIndividual } from "../../lib/calculate";
import type { Category } from "../../lib/types";
import { CategorySelector } from "./CategorySelector";
import { CostBreakdown } from "./CostBreakdown";
import { FamilySection } from "./FamilySection";
import { IndividualSection } from "./IndividualSection";
import { NoticeBanner } from "./NoticeBanner";
import { RoomReference } from "./RoomReference";

export function UpstreamCalculator() {
  const [category, setCategory] = useState<Category>("family");

  const [yaRoom, setYaRoom] = useState("pritchell");
  const [yaCount, setYaCount] = useState(1);

  const [adults, setAdults] = useState(2);
  const [disciples, setDisciples] = useState(0);
  const [older18plus, setOlder18plus] = useState(0);
  const [kids7to11, setKids7to11] = useState(0);
  const [kidsUnder7, setKidsUnder7] = useState(0);
  const [famRoom, setFamRoom] = useState("walnut");
  const [royalGorgeKids, setRoyalGorgeKids] = useState(0);

  const isFamily = category === "family";
  const isIndividual = category === "ya" || category === "student";

  const handleCategoryChange = (next: Category) => {
    setCategory(next);
    setRoyalGorgeKids(0);
    if (next === "student") setYaRoom("royalgorge");
    if (next === "ya" && yaRoom === "royalgorge") setYaRoom("pritchell");
  };

  const handleOlder18plusChange = (value: number) => {
    setOlder18plus(value);
    setRoyalGorgeKids((current) => Math.min(current, value));
  };

  const familyResult = isFamily
    ? calculateFamily({
        adults,
        disciples,
        older18plus,
        kids7to11,
        kidsUnder7,
        famRoom,
        royalGorgeKids,
      })
    : null;

  const individualResult = isIndividual
    ? calculateIndividual({
        category,
        yaRoom,
        yaCount,
      })
    : null;

  const costResult = familyResult ?? individualResult;

  return (
    <div className="calculator">
      <div className="calculator__inner">
        <header className="calculator__header">
          <div className="calculator__eyebrow">{EVENT.eyebrow}</div>
          <h1 className="calculator__title">{EVENT.title}</h1>
          <p className="calculator__subtitle">{EVENT.subtitle}</p>
        </header>

        <NoticeBanner />

        <div className="calculator__card">
          <CategorySelector category={category} onCategoryChange={handleCategoryChange} />

          {isIndividual && individualResult && (
            <IndividualSection
              category={category}
              yaRoom={yaRoom}
              yaCount={yaCount}
              yaRoomShare={individualResult.yaRoomShare}
              onYaRoomChange={setYaRoom}
              onYaCountChange={setYaCount}
            />
          )}

          {isFamily && familyResult && (
            <FamilySection
              adults={adults}
              disciples={disciples}
              older18plus={older18plus}
              kids7to11={kids7to11}
              kidsUnder7={kidsUnder7}
              famRoom={famRoom}
              royalGorgeKids={royalGorgeKids}
              totalFamPeople={familyResult.totalFamPeople}
              totalKids={familyResult.totalKids}
              isLargeFamily={familyResult.isLargeFamily}
              effectiveRGKids={familyResult.effectiveRGKids}
              royalGorgeTotal={familyResult.royalGorgeTotal}
              onAdultsChange={setAdults}
              onDisciplesChange={setDisciples}
              onOlder18plusChange={handleOlder18plusChange}
              onKids7to11Change={setKids7to11}
              onKidsUnder7Change={setKidsUnder7}
              onFamRoomChange={setFamRoom}
              onRoyalGorgeKidsChange={setRoyalGorgeKids}
            />
          )}

          {costResult && (
            <CostBreakdown
              lineItems={costResult.lineItems}
              jyTotal={costResult.jyTotal}
              ridgecrestTotal={costResult.ridgecrestTotal}
              grandTotal={costResult.grandTotal}
              perPerson={familyResult?.famPerPerson}
              totalPeople={familyResult?.totalFamPeople}
              isLargeFamily={familyResult?.isLargeFamily}
              isCapped={familyResult?.isCapped}
              uncappedTotal={familyResult?.uncappedTotal}
            />
          )}

          <RoomReference />
        </div>
      </div>
    </div>
  );
}
