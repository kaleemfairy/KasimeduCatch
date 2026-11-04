import { getItem, kg, rupees } from "./catalog";
import { SITE } from "./site";
import { basketTotals, type BasketLine } from "./store";

const RULE = "----------------------------------------";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.phoneE164}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

function orderLines(lines: BasketLine[]) {
  return lines.flatMap((line, index) => {
    const item = getItem(line.itemId);
    if (!item) return [];
    const cut = item.cuts[line.cutIndex]?.name.split(" (")[0];
    return `${index + 1}. ${item.name} - ${kg(line.weight)} (${cut}) -> ${rupees(item.price * line.weight)}`;
  });
}

function totalLines(lines: BasketLine[]) {
  const { dispatch, total } = basketTotals(lines);
  return [...(dispatch ? [`Chennai Dispatch: ${rupees(dispatch)}`] : []), `*Total: ${rupees(total)}*`];
}

export function basketMessage(lines: BasketLine[], zone: string, slot: string) {
  return [
    "*New Order from SSS Seafood Website:*",
    RULE,
    ...orderLines(lines),
    RULE,
    ...totalLines(lines),
    "Delivery Address: [Customer to type]",
    `Delivery Zone: ${zone}`,
    `Preferred Slot: ${slot}`,
    "Please confirm catch availability!",
  ].join("\n");
}

export function dawnMessage(fields: {
  name: string;
  phone: string;
  variety: string;
  cut: string;
  quantity: string;
  address: string;
  landing: string;
}) {
  return [
    "*4 AM Dawn Auction Order - SSS Seafood Website:*",
    RULE,
    `${fields.variety} - ${fields.quantity} kg (${fields.cut})`,
    RULE,
    `Name: ${fields.name}`,
    `WhatsApp: ${fields.phone}`,
    `Delivery Address: ${fields.address}`,
    `Dock arrival: ${fields.landing}`,
    "Please send the live scale photo before delivery.",
  ].join("\n");
}

export function dispatchMessage(
  lines: BasketLine[],
  fields: { name: string; phone: string; address: string; zone: string; slot: string; notes: string },
) {
  return [
    "*Harbour Pre-Order from SSS Seafood Website:*",
    RULE,
    ...(lines.length ? [...orderLines(lines), RULE, ...totalLines(lines)] : ["Catch: Please suggest from tomorrow's landing"]),
    `Name: ${fields.name}`,
    `WhatsApp: ${fields.phone}`,
    `Delivery Address: ${fields.address}`,
    `Delivery Zone: ${fields.zone}`,
    `Preferred Slot: ${fields.slot}`,
    ...(fields.notes ? [`Notes: ${fields.notes}`] : []),
    "Please confirm catch availability!",
  ].join("\n");
}

/** Accepts 10-digit Indian mobiles, with or without +91 and spaces. */
export function isIndianMobile(value: string) {
  return /^(\+?91)?[6-9]\d{9}$/.test(value.replace(/[\s-]/g, ""));
}
