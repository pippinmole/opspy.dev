import { env } from "@/env.mjs";
import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_API_KEY ?? "", {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
