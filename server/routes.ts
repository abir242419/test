import { Router } from "express";
import { quotationCalculationSchema } from "../shared/schema";

export function createApp(app, storage) {
  const router = Router();

  router.post("/quotations/calculate", (req, res) => {
    try {
      const input = quotationCalculationSchema.parse(req.body);
      const result = calculateQuotation(input);
      res.json(result);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  });

  app.use("/api", router);
}

function calculateQuotation(input) {
  const checkIn = new Date(input.checkInDate);
  const checkOut = new Date(input.checkOutDate);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

  if (nights <= 0) throw new Error("Check-out date must be after check-in date");
  if (input.nightlyRates.length !== nights)
    throw new Error(`Expected ${nights} nightly rates`);

  const totalRoom = input.nightlyRates.reduce((a, b) => a + b, 0);
  const maxRate = Math.max(...input.nightlyRates);

  let gstRate = 0;
  let gstLabel = "GST Exempt (≤ ₹1,000)";
  if (maxRate > 7500) {
    gstRate = 0.18;
    gstLabel = "GST @ 18% (> ₹7,500)";
  } else if (maxRate > 1000) {
    gstRate = 0.12;
    gstLabel = "GST @ 12% (₹1,001–₹7,500)";
  }

  const gstAmount = totalRoom * gstRate;
  const finalAmount = totalRoom + gstAmount;

  return {
    nights,
    totalRoom,
    gstRate,
    gstLabel,
    gstAmount,
    finalAmount
  };
}