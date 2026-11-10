// Suggested price shown to the owner.
const BASE = { apartment: 90, house: 140, office: 180 };
export function suggestPrice(req) {
  const perSqft = req.property_type === "office" ? 0.09 : 0.06;
  let price = BASE[req.property_type] + req.size_sqft * perSqft;
  if (req.frequency === "weekly") price *= 0.85;
  if (req.frequency === "biweekly") price *= 0.9;
  return Math.round(price);
}
