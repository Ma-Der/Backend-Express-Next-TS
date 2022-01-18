import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    
    const storeChain1 = await prisma.storeChain.create({
        data: {
            name: "CIOKSanddas",
            owner: "Bjorn Gudnassons"
        }
    });


    const shop1 = await prisma.shop.create({
        data: {
            name: "ciuszekses",
            address: 'Lawendowa 542',
            storeChainId: 1,
        }
    })

    const category1 = await prisma.category.create({
        data: {
            name: "Cat3",
            shopId: 1
        }
    })

    console.log(storeChain1)
    console.log(shop1)

   const shopValid = await prisma.shopValidation.create({
       data: {
        comment: 'nicer',
        rating: 4,
        shopId: 2
       }
   });

   const avgShopRating = await prisma.shopValidation.aggregate({
       where: {
           shopId: 1
       },
       _avg: {
           rating: true
       }
   });
   

   console.log(avgShopRating)
}

main()
.catch((e: Error) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect()
})