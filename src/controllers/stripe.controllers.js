import express from "express";
// const app = express();
import Stripe from "stripe";
import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma.js";
import { filter } from "../utils/common.js";

const router = express.Router();

// put api key in .env.dev
const stripe = new Stripe(process.env.STRIPE_KEY);

router.post("/", async (req, res) => {
  const id = req.body;
  const booking = await prisma.booking.findUnique({
    where: {
      id: id.id,
    },
  });

  const unitAmount = booking.bookingPrice * 100; // Assuming the price is in dollars
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: booking.sellerName,
            description: booking.bookingRequest,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/",
    cancel_url: 'http://localhost:5173/failure',
  });
  return res.json(session.url);
});

export default router;
﻿