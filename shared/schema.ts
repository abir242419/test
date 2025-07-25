import { z } from "zod";

export const quotationCalculationSchema = z.object({
  guestName: z.string().min(1),
  villaName: z.string().min(1),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  nightlyRates: z.array(z.number().min(0)),
  totalPax: z.number().min(1)
});