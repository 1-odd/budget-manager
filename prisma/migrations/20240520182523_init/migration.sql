-- CreateTable
CREATE TABLE "Budgets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL
);
