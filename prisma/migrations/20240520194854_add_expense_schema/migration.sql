-- CreateTable
CREATE TABLE "Expenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    CONSTRAINT "Expenses_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budgets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
