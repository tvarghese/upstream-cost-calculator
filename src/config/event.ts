import { ROYAL_GORGE_ADDON } from "./rates";

export const EVENT = {
  eyebrow: "UPSTREAM 2026 · Dec 29 – Jan 2 · Ridgecrest, NC",
  title: "Registration Cost Calculator",
  subtitle: "Estimate what you pay to JY USA and to Ridgecrest",
} as const;

export const NOTICES = {
  MaDstersZion: {
    title: "Campus students who are MADsters are already part of UPSTREAM.",
    body: "Do not register MADsters for UPSTREAM again, and do not count them in this calculator. Campus students who are not MADsters and want both ZION and UPSTREAM can be added in the family section.",
  },
  studentRoom:
    "Campus students are assigned to the Royal Gorge bunk room only. Organizers will group 12 students per room.",
  yaRoomSharing:
    "Same-gender groups can share a room — cost splits evenly among everyone in the room.",
  royalGorgeIndividual:
    "Organizers will assign 12 people to each Royal Gorge bunk room. No need to coordinate - your cost is fixed at",
  familyMeals:
    "Do not include MADsters. They are already part of UPSTREAM and do not register again. Add other campus students who want both ZION and UPSTREAM in the next section.",
  campusStudentsMadsters:
    "Campus students who are MADsters are already part of UPSTREAM. Do not register them for UPSTREAM again, and do not count them here.",
  campusStudentsIntro:
    "Count only campus students who are not MADsters and want to attend both ZION and UPSTREAM. Then compare the two ways to register them.",
  campusStudentPackage:
    "They stay in Royal Gorge, not in your family room. Royal Gorge lodging and UPSTREAM meals are included in the $550.",
  campusStudentWithFamily:
    "They are counted as 18+ in your family room. No Royal Gorge bunk is added for them. If you need more beds, choose Walnut (1 queen and 2 bunks).",
  familyRoom:
    "Room cost is fixed for the whole room regardless of how many stay in it.",
  royalGorgeAddon: `Older kids (18+, not in MaDsters) who want to stay with friends in the Royal Gorge bunk room can do so for a flat $${ROYAL_GORGE_ADDON} add-on per person. This is in addition to your regular family room cost. You can send more than one. If bunk beds are chosen, this add-on is paid to JY USA and included in your Total to JY USA.`,
  royalGorgeAddonNote:
    "Room assignment in Royal Gorge is handled by organizers (12 per bunk room).",
  roomSharing:
    "Include yourself. The room cost divides equally — more people = lower cost each.",
} as const;
