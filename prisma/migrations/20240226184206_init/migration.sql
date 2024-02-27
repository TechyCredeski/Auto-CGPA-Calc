/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `StudentList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentList_studentId_key" ON "StudentList"("studentId");
