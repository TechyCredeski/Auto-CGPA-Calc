-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentList" (
    "id" TEXT NOT NULL,
    "MatricNo" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "CGPA" INTEGER NOT NULL,
    "Department" TEXT NOT NULL,

    CONSTRAINT "StudentList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentCourse" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "CourseCode" TEXT NOT NULL,
    "CourseTitle" TEXT NOT NULL,
    "Unit" TEXT NOT NULL,
    "Grade" TEXT NOT NULL,

    CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
