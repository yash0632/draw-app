import { PrismaClient } from "../generated/prisma/client.js";
import { withAccelerate } from '@prisma/extension-accelerate'
import dotenv from 'dotenv'
dotenv.config()

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const client = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client



export async function checkDBConnection() {
  try {
    await client.$connect();
    console.log('✅ Prisma connected to the database.');
  } catch (err) {
    console.error('❌ Prisma failed to connect to the database:', err);
  } finally {
    await client.$disconnect();
  }
}
checkDBConnection();

export default client;
