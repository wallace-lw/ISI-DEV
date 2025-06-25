/*
  Warnings:

  - Changed the type of `type` on the `Coupon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('FIXED', 'PERCENT');

-- AlterTable
ALTER TABLE "Coupon"
  ALTER COLUMN "type" TYPE "CouponType"
  USING CASE
    WHEN "type" = 'fixed' THEN 'FIXED'::"CouponType"
    WHEN "type" = 'percent' THEN 'PERCENT'::"CouponType"
  END;
