-- CreateTable
CREATE TABLE "rural_producer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "farm" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area" DOUBLE PRECISION NOT NULL,
    "arable_area" DOUBLE PRECISION NOT NULL,
    "vegetation_area" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rural_producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CropToRuralProducer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "rural_producer_cpf_cnpj_key" ON "rural_producer"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "_CropToRuralProducer_AB_unique" ON "_CropToRuralProducer"("A", "B");

-- CreateIndex
CREATE INDEX "_CropToRuralProducer_B_index" ON "_CropToRuralProducer"("B");

-- AddForeignKey
ALTER TABLE "_CropToRuralProducer" ADD CONSTRAINT "_CropToRuralProducer_A_fkey" FOREIGN KEY ("A") REFERENCES "crop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CropToRuralProducer" ADD CONSTRAINT "_CropToRuralProducer_B_fkey" FOREIGN KEY ("B") REFERENCES "rural_producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
