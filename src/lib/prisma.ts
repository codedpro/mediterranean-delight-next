import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    console.log("Creating new Prisma client instance");
    console.log("MongoDB Connection URL (with password hidden):", 
      process.env.DATABASE_URL?.replace(/mongodb\+srv:\/\/[^:]+:[^@]+@/, 'mongodb+srv://username:****@')
    );
    
    global.prisma = new PrismaClient({
      log: ["query", "error", "warn"],
    });
  }
  prisma = global.prisma;
}

// Test the connection with detailed error logging
prisma.$connect()
  .then(() => {
    console.log("Successfully connected to MongoDB");
    console.log("Database name:", process.env.DATABASE_URL?.split('/').pop()?.split('?')[0]);
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB. Error details:", {
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack
    });
    console.error("Connection URL (with password hidden):", 
      process.env.DATABASE_URL?.replace(/mongodb\+srv:\/\/[^:]+:[^@]+@/, 'mongodb+srv://username:****@')
    );
    
    // Check for common connection issues
    if (error.code === 'ENOTFOUND') {
      console.error("DNS resolution failed. Check your internet connection and the MongoDB Atlas cluster URL.");
    } else if (error.code === 'ECONNREFUSED') {
      console.error("Connection refused. Check if your IP address is whitelisted in MongoDB Atlas.");
    } else if (error.message.includes('authentication failed')) {
      console.error("Authentication failed. Check your MongoDB Atlas username and password.");
    }
  });

export { prisma }; 