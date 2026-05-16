import { register, authenticate } from './api';
import { Log } from './logger';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    try {
        console.log('--- Step 1: Registration ---');
        try {
            await register();
        } catch (e: any) {
             console.log('User might already be registered or request failed, proceeding to authentication...');
        }

        console.log('\n--- Step 2: Authentication ---');
        const token = await authenticate();
        
        if (!token) {
            console.log('Warning: No token returned. Checking response format might be required.');
            return;
        }
        
        console.log(`Token received: ${token.substring(0, 15)}...`);

        console.log('\n--- Step 3: Logging Verification ---');
        await Log('backend', 'info', 'middleware', 'Testing logging middleware implementation', token);
        await Log('frontend', 'error', 'component', 'Testing error logging from frontend', token);

        console.log('\nAll tasks completed successfully!');
    } catch (error) {
        console.error('\nProcess failed:', error);
    }
}

main();
