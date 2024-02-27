/*
  Warnings:

  - A unique constraint covering the columns `[courseCode]` on the table `StudentResult` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentResult_courseCode_key" ON "StudentResult"("courseCode");
