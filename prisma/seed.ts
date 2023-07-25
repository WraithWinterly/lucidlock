import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = {
    id: "user_2S661mzeuE8newqemyHCMw8f8sJ",
  };

  const dreams = [
    {
      title: "Dream 1",

      userId: user.id,
    },
    {
      title: "Dream 2",

      userId: user.id,
    },
    {
      title: "Dream 3",

      userId: user.id,
    },
    {
      title: "Dream 4",

      userId: user.id,
    },
    // Add more dreams if needed
  ];

  for (const dream of dreams) {
    const content = await prisma.dreamContent.create({
      data: { content: "Lorem Ipsum" },
    });
    await prisma.dream.create({
      data: { ...dream, DreamContent: { connect: { id: content.id } } },
    });
  }

  console.log("Seeding completed");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
