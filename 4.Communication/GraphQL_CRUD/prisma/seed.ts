import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export async function seed() {
    await client.user.createMany({
        data: {
            name: "Tom",
            password: "1324fdfds2345",
            email: "tom@tom.com",
        },
    });
}

seed();