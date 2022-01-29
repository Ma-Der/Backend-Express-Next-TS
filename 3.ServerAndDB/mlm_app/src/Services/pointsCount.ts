import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPoints(user: any, reward: number) {
    const userInDB = await prisma.user.findFirst({where: { userId: user.userId}});
    if(!userInDB) throw new Error('Such user does not exist.');

    if(user.referrer && reward >= 4) {
        const parentUser = await prisma.user.findFirst({where: {userId: user.referrer}});
        if(!parentUser) return;
        const updateUser = await prisma.user.update({
            where: {
                userId: user.referrer
            },
            data: {
                points: { increment: reward }
            }
        });
        await getPoints(updateUser, reward - 2);
    } else return;
}