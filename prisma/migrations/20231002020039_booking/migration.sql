-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "sellerIdBooking" INTEGER NOT NULL,
    "userIdBooking" INTEGER NOT NULL,
    "sellerName" TEXT,
    "sellerEmail" TEXT NOT NULL,
    "sellerRate" INTEGER NOT NULL,
    "sellerLanguage" TEXT,
    "sellerExperience" TEXT,
    "userName" TEXT,
    "userEmail" TEXT NOT NULL,
    "bookingDate" TEXT,
    "bookingTime" TEXT,
    "bookingDuration" INTEGER NOT NULL DEFAULT 0,
    "bookingPrice" INTEGER NOT NULL DEFAULT 0,
    "bookingRequest" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userIdBooking_fkey" FOREIGN KEY ("userIdBooking") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
