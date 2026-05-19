const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed script for staging/pilot...");

  // 1. Setup Admin Account
  const adminEmail = "admin@peaceportal.local";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail }});
  
  if (!existingAdmin) {
    const admin = await prisma.user.create({
      data: {
        name: "System Admin",
        email: adminEmail,
        password: "hashed_password_placeholder", // Replace with valid bcrypt in testing
        role: "SUPER_ADMIN",
        profileCompleted: true,
      }
    });
    
    await prisma.adminProfile.create({
      data: {
        userId: admin.id,
        scope: "SUPER_ADMIN",
        managedRegions: ["ALL"],
      }
    });
    console.log("✅ Admin created");
  }

  // 2. Setup Counsellor Account
  const counsellorEmail = "dr.smith@peaceportal.local";
  let counsellor = await prisma.user.findUnique({ where: { email: counsellorEmail }});
  
  if (!counsellor) {
    counsellor = await prisma.user.create({
      data: {
        name: "Dr. Sarah Smith",
        email: counsellorEmail,
        password: "hashed_password_placeholder",
        role: "COUNSELLOR",
        profileCompleted: true,
      }
    });

    await prisma.counsellorProfile.create({
      data: {
        userId: counsellor.id,
        bio: "Specializing in anxiety and academic stress.",
        specializations: ["Anxiety", "Depression", "Academic Stress"],
        languages: ["English", "Urdu"],
        hourlyRate: 50,
        isVerified: true,
        verificationNotes: "Verified via NGO partner.",
      }
    });
    console.log("✅ Counsellor created");
  }

  // 3. Generate Synthetic Anonymous Sessions
  console.log("Generating synthetic anonymous sessions...");
  for (let i = 0; i < 5; i++) {
    const isEscalated = i === 0; // Make one a crisis
    
    const session = await prisma.anonymousSession.create({
      data: {
        token: crypto.randomBytes(16).toString('hex'),
        topic: isEscalated ? "Crisis Alert" : "General Anxiety",
        status: isEscalated ? "ESCALATED" : "OPEN",
        crisisSeverity: isEscalated ? "CRITICAL" : "LOW",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      }
    });

    // Create synthetic encrypted messages
    // (In reality, we would use encryption.service.ts here, but for seed we use raw)
    await prisma.anonymousMessage.create({
      data: {
        sessionId: session.id,
        sender: "ANONYMOUS",
        content: "U2FsdGVkX1+synthetic_encrypted_payload_for_demo", // Encrypted mock
        expiresAt: session.expiresAt
      }
    });
  }
  console.log("✅ Synthetic Sessions generated");

  console.log("🏁 Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
