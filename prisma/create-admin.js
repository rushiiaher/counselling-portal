const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@counselling.local';
  const password = 'Admin@1234';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin already exists:', email);
    return;
  }

  const hashed = await bcrypt.hash(password, 12);

  const admin = await prisma.user.create({
    data: {
      name: 'System Admin',
      email,
      password: hashed,
      role: 'ADMIN',
      profileCompleted: true,
      adminProfile: {
        create: { scope: 'SUPER_ADMIN' }
      }
    }
  });

  console.log('Admin created:', admin.email);
  console.log('Password:', password);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
