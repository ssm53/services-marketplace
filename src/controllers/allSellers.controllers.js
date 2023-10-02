import express from "express";
import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma.js";


const router = express.Router();

router.get("/", async (req, res) => {
  const allSellers = await prisma.seller.findMany();

  return res.json({ allSellers });
});

export default router;
