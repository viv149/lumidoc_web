const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();



async function main() {
    // Create admin user
    const adminHashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            name: "Admin User",
            email: "admin@example.com",
            password: adminHashedPassword,
            role: "ADMIN",
        },
    });

    console.log("✅ Admin user seeded successfully!");

    // Create Vivek user
    const vivekHashedPassword = await bcrypt.hash("vivek123", 10);
    await prisma.user.upsert({
        where: { email: "viveksharma14091994@gmail.com" },
        update: {},
        create: {
            name: "Vivek Sharma",
            email: "viveksharma14091994@gmail.com",
            password: vivekHashedPassword,
            role: "USER",
        },
    });

    console.log("✅ Vivek user seeded successfully!");
}

main()
    .catch((error) => {
        console.error("❌ Error seeding users:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
