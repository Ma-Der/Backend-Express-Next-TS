import { PrismaClient } from "@prisma/client";

export class MLMHandler {
    private static prisma = new PrismaClient();

    public static async loggedIn(userId: string, referrerId: string) {
        const updatedInferiorsInReferrerUser = await this.prisma.user.update({
            where: {
                userId: referrerId
            },
            data: {
                inferiors: { push: userId }
            }
        });

        return updatedInferiorsInReferrerUser;
    }
    
    public static async generateRefLink(userId: string) {
        const referrer = await this.prisma.user.findFirst({
            where: {
                userId: userId
            }
        });
        if(!referrer) throw new Error('Such user does not exist.');

        const baseUrl = `http://localhost:3000`;
        const refLink = `${baseUrl}/?referrerId=${userId}`;
        
        return { referrerUser: referrer, refLink };
    }
}