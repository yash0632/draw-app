import { PrismaClient } from "../generated/prisma/client.js";
const client = new PrismaClient();

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

export default client;
