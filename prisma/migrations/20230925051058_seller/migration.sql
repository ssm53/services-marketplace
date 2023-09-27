/*
  Warnings:

  - You are about to drop the column `PayRate` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `Pitch` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `Years` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `experience` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "PayRate",
DROP COLUMN "Pitch",
DROP COLUMN "Years",
ADD COLUMN     "experience" INTEGER NOT NULL,
ADD COLUMN     "pitch" TEXT,
ADD COLUMN     "rate" INTEGER NOT NULL;
