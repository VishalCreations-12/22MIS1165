import axios from 'axios';
import { Stack, LogLevel, Package } from './types';

const API_BASE_URL = 'http://4.224.186.213/evaluation-service';

export async function Log(stack: Stack, level: LogLevel, pkg: Package, message: string, token: string) {
    try {
        const payload = {
            stack,
            level,
            package: pkg,
            message
        };

        const response = await axios.post(`${API_BASE_URL}/logs`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(`[${level.toUpperCase()}] Log sent successfully: ${message}`);
        return response.data;
    } catch (error: any) {
        console.error(`Failed to send log: ${error?.response?.data?.message || error?.message}`);
        throw error;
    }
}
