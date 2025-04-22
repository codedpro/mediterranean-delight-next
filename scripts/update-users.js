const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Find all users with null email
    const usersWithNullEmail = await prisma.user.findMany({
      where: {
        email: null
      }
    });

    console.log(`Found ${usersWithNullEmail.length} users with null email`);

    // Update each user to have a default email
    for (const user of usersWithNullEmail) {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          email: `user-${user.id}@example.com`
        }
      });
    }

    console.log('Successfully updated users');
  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 