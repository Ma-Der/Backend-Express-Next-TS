-- CreateTable
CREATE TABLE "Auth" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventStartTime" TIMESTAMP(3) NOT NULL,
    "eventEndTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventId_key" ON "Event"("eventId");
