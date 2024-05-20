-- CreateTable
CREATE TABLE "Budgets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "icon" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL
);
