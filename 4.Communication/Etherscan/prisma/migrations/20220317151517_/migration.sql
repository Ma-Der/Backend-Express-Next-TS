-- CreateTable
CREATE TABLE "Etherscan" (
    "id" SERIAL NOT NULL,
    "etherPrice" TEXT NOT NULL,
    "marketCap" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "medGasPrice" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "gasPriceInTransaction" TEXT NOT NULL,
    "tax" TEXT NOT NULL,
    "etherscanId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Etherscan_id_key" ON "Etherscan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_id_key" ON "Transactions"("id");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_etherscanId_fkey" FOREIGN KEY ("etherscanId") REFERENCES "Etherscan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
