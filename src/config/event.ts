import { ROYAL_GORGE_ADDON } from "./rates";

export const EVENT = {
  eyebrow: "UPSTREAM 2026 · Dec 29 – Jan 2 · Ridgecrest, NC",
  title: "Registration Cost Calculator",
  subtitle: "Estimate what you pay to JY USA and to Ridgecrest",
} as const;

export const NOTICES = {
  MaDstersZion: {
    title: "MaDsters & Zion participants have a different registration form and process.",
    body: "Do not include children attending MaDsters or Zion in this calculator - they have their own registration process with separate costs.",
  },
  studentRoom:
    "Campus students are assigned to the Royal Gorge bunk room only. Organizers will group 12 students per room.",
  yaRoomSharing:
    "Same-gender groups can share a room — cost splits evenly among everyone in the room.",
  royalGorgeIndividual:
    "Organizers will assign 12 people to each Royal Gorge bunk room. No need to coordinate - your cost is fixed at",
  familyMeals:
    "Do not include children attending MaDsters or Zion - they register on a different registration form.",
  familyRoom:
    "Room cost is fixed for the whole room regardless of how many stay in it.",
  royalGorgeAddon: `Older kids (18+, not in MaDsters) who want to stay with friends in the Royal Gorge bunk room can do so for a flat $${ROYAL_GORGE_ADDON} add-on per person. This is in addition to your regular family room cost. You can send more than one. If bunk beds are chosen, this add-on is paid to JY USA and included in your Total to JY USA.`,
  royalGorgeAddonNote:
    "Room assignment in Royal Gorge is handled by organizers (12 per bunk room).",
  roomSharing:
    "Include yourself. The room cost divides equally — more people = lower cost each.",
} as const;
