/*
  Warnings:

  - You are about to alter the column `amount` on the `Expenses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL DEFAULT 0,
    "budgetId" INTEGER NOT NULL,
    "createdAt" TEXT NOT NULL,
    CONSTRAINT "Expenses_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budgets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Expenses" ("amount", "budgetId", "createdAt", "id", "name") SELECT "amount", "budgetId", "createdAt", "id", "name" FROM "Expenses";
DROP TABLE "Expenses";
ALTER TABLE "new_Expenses" RENAME TO "Expenses";
PRAGMA foreign_key_check("Expenses");
PRAGMA foreign_keys=ON;
