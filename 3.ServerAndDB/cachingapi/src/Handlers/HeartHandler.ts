import axios from 'axios';
const redis = require('redis');
import { rapidHost, rapidKey } from '../Config/envVar';

export class HeartHandler {
    private static client = redis.createClient();
    public static async getCard(cardName: string) {
        this.client.connect();
        const cardValue = await this.client.get(cardName);
        
        if(cardValue) {
            return JSON.parse(cardValue);
        } else { 
            const card = await this.getHeartstoneCard(cardName);
        
            const result = card.map((card: any) => {
                return {
                    name: card.name,
                    rarity: card.rarity ? card.rarity : 'not classified',
                    text: card.text ? card.text : 'no text'
                }
            });
            this.client.set(cardName, JSON.stringify(result));
            return result;
        }
    }
    
    private static async getHeartstoneCard(cardName: string) {
        const url = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search`;

        const card = await axios.get(`${url}/${cardName}`, {
            headers: {
                'x-rapidapi-host': rapidHost,
                'x-rapidapi-key': rapidKey
            }
        });
        
        return card.data;
    }
}