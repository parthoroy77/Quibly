import { PrismaClient } from "./client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    // errorFormat: "pretty",
    // log: ["query", "info"],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// eslint-disable-next-line
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const db = globalForPrisma.prisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
