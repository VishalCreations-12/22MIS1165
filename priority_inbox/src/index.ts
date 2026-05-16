import { authenticate, fetchNotifications, sendLog } from './api';
import { Notification } from './types';

const PRIORITY_WEIGHTS: Record<string, number> = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

function getWeight(type: string): number {
    return PRIORITY_WEIGHTS[type] || 0;
}

function sortNotifications(notifications: Notification[]): Notification[] {
    return notifications.sort((a, b) => {
        const weightA = getWeight(a.type);
        const weightB = getWeight(b.type);
        if (weightA !== weightB) {
            return weightB - weightA;
        }
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
}

async function main() {
    try {
        const token = await authenticate();
        if (!token) throw new Error('Authentication failed');

        const notifications = await fetchNotifications(token);
        const sorted = sortNotifications(notifications);
        const top10 = sorted.slice(0, 10);

        console.log('\n--- Top 10 Priority Notifications ---');
        top10.forEach((n, i) => {
            console.log(`${i + 1}. [${n.type}] ${n.message} (${new Date(n.timestamp).toLocaleString()})`);
        });

        await sendLog(token, 'Successfully processed priority inbox top 10');
    } catch (error: any) {
        console.error('Error:', error?.response?.data || error?.message);
    }
}

main();
