import express from "express";
import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const distinctLanguages = await prisma.seller.findMany({
      distinct: ["language"],
      select: {
        language: true,
      },
    });

    const allDistinctLanguages = distinctLanguages.map(
      (seller) => seller.language
    );

    return res.json({ allDistinctLanguages });
  } catch (error) {
    console.error("Error fetching distinct languages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;