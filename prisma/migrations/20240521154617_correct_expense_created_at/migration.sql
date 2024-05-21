/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Expenses` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "createdAt" TEXT NOT NULL,
    CONSTRAINT "Expenses_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budgets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Expenses" ("amount", "budgetId", "id", "name") SELECT "amount", "budgetId", "id", "name" FROM "Expenses";
DROP TABLE "Expenses";
ALTER TABLE "new_Expenses" RENAME TO "Expenses";
PRAGMA foreign_key_check("Expenses");
PRAGMA foreign_keys=ON;
