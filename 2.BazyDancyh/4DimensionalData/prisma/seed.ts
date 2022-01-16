import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const storeChain1 = await prisma.storeChain.create({
        data: {
            name: "CIOKS",
            owner: "Bjorn Gudnasson"
        }
    });


    const shop1 = await prisma.shop.create({
        data: {
            name: "ciuszek",
            address: 'Lawendowa 5',
            storeChainId: 1,
        }
    })

    const category1 = await prisma.category.create({
        data: {
            name: "Cat1",
            shopId: 2
        }
    })

    console.log(storeChain1)
    console.log(shop1)
}

main()
.catch((e: Error) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect()
})