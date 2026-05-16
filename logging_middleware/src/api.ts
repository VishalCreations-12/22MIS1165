import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = 'http://4.224.186.213/evaluation-service';

export async function register() {
    const payload = {
        email: process.env.EMAIL,
        name: process.env.NAME,
        mobileNo: process.env.MOBILE_NO,
        githubUsername: process.env.GITHUB_USERNAME,
        rollNo: process.env.ROLL_NO,
        accessCode: process.env.ACCESS_CODE
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/register`, payload);
        console.log('Registration successful');
        return response.data;
    } catch (error: any) {
        console.error('Registration failed:', error?.response?.data || error?.message);
        throw error;
    }
}

export async function authenticate() {
    const payload = {
        email: process.env.EMAIL,
        rollNo: process.env.ROLL_NO,
        accessCode: process.env.ACCESS_CODE
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/auth`, payload);
        console.log('Authentication successful');
        return response.data.token || response.data.access_token || response.data.data?.token; 
    } catch (error: any) {
        console.error('Authentication failed:', error?.response?.data || error?.message);
        throw error;
    }
}
