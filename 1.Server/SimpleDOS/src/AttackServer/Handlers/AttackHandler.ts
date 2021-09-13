import axios from 'axios';

export type TUrl = 'http://localhost:3000/getFirstImage' | 'http://localhost:3000/getSecondImage';

export class AttackHandler {
    public static attackOnFirstEndpoint(url: string) {
        return axios.get(url)
            .then(res => res.statusText)
            .catch(err => console.log(err.message));
    }
    public static attackOnSecondEndpoint(url: string) {
        return axios.get(url)
            .then(res => res.statusText)
            .catch(err => console.log(err.message));
    }

    public static async attackStart(url: TUrl, attackAmount: number) {
        const attacks = [];


        if(url === 'http://localhost:3000/getFirstImage') {
            for(let i=0; i < attackAmount; i++) {
                attacks.push(this.attackOnFirstEndpoint(url));
            }
        } else if (url === 'http://localhost:3000/getSecondImage') {
            for(let i=0; i < attackAmount; i++) {
                attacks.push(this.attackOnSecondEndpoint(url));
            }
        } else throw Error('Wrong URL.');

        const allAttacksResults = await Promise.allSettled(attacks);
        console.log(allAttacksResults);

        const amountOfBlockedAttacks = AttackHandler.numberOfBlockedRequests(allAttacksResults);

        return amountOfBlockedAttacks;
    }

    private static numberOfBlockedRequests(attacks: any[]) {
        let numberOfBlockedAttacks = 0;

        for(let i=0; i < attacks.length; i++) {
            if(attacks[i]['status'] === 'fulfilled') {
                if(attacks[i]['value'] !== 'OK') numberOfBlockedAttacks++;
            }
        }

        return numberOfBlockedAttacks;
    }
}