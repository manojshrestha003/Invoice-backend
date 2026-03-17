import * as dotenv from 'dotenv';
dotenv.config();

import prisma from './config/database';

async function testConnection() {
  try {
    console.log('🔄 Attempting to connect to the database...');

    // Explicitly connect
    await prisma.$connect();
    console.log('✅ Connection to the database successful (prisma.$connect)');

    // Run a simple query to verify data flow
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log('✅ Raw query successful:', result);

  } catch (error) {
    console.error('❌ Database connection failed:');
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    } else {
      console.error('   ', error);
    }
  } finally {
    await prisma.$disconnect();
    console.log('👋 Disconnected from database.');
  }
}

testConnection();
