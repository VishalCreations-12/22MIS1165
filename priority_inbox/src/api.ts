import axios from 'axios';
import * as dotenv from 'dotenv';
import { Notification } from './types';
dotenv.config();

const API_BASE_URL = 'http://4.224.186.213/evaluation-service';

export async function authenticate(): Promise<string> {
    const payload = {
        email: process.env.EMAIL,
        rollNo: process.env.ROLL_NO,
        accessCode: process.env.ACCESS_CODE
    };
    const response = await axios.post(`${API_BASE_URL}/auth`, payload);
    return response.data.token || response.data.access_token || response.data.data?.token;
}

export async function fetchNotifications(token: string): Promise<Notification[]> {
    const response = await axios.get(`${API_BASE_URL}/notifications`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data.data || response.data.notifications || response.data;
}

export async function sendLog(token: string, message: string) {
    const payload = {
        stack: 'frontend',
        level: 'info',
        package: 'api',
        message
    };
    await axios.post(`${API_BASE_URL}/logs`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}
