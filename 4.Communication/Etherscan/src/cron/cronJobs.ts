import cron from 'node-cron';
import { seedDatabase } from '../../prisma/seed';

export const cronSeedDatabase = () => {
    cron.schedule('*/5 * * * *', () => {
        seedDatabase().then(() => {});
    });
}
