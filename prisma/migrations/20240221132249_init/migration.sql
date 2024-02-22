/*
  Warnings:

  - You are about to drop the column `CGPA` on the `StudentList` table. All the data in the column will be lost.
  - You are about to drop the column `Department` on the `StudentList` table. All the data in the column will be lost.
  - You are about to drop the column `MatricNo` on the `StudentList` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `StudentList` table. All the data in the column will be lost.
  - You are about to drop the `StudentCourse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cgpa` to the `StudentList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `StudentList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matricNo` to the `StudentList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `StudentList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `StudentList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentList" DROP COLUMN "CGPA",
DROP COLUMN "Department",
DROP COLUMN "MatricNo",
DROP COLUMN "Name",
ADD COLUMN     "cgpa" INTEGER NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "matricNo" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "studentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "StudentCourse";

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "matric" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentResult" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "unit" INTEGER NOT NULL,
    "grade" TEXT NOT NULL,

    CONSTRAINT "StudentResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_matric_key" ON "Student"("matric");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "StudentList" ADD CONSTRAINT "StudentList_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("matric") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentResult" ADD CONSTRAINT "StudentResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("matric") ON DELETE RESTRICT ON UPDATE CASCADE;
