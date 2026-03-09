const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const author = await prisma.author.create({
    data: {
      name: 'Luna Bright',
      bio: 'Luna Bright writes magical folklore for children.',
    },
  })

  await prisma.book.createMany({
    data: [
      {
        title: 'The Magic Tree',
        description: 'Join Oliver the Fox as he discovers a glowing forest where dreams grow on trees.',
        price: 14.99,
        image: '/book-cover.png',
        amazonLink: '#',
        tag: 'Best Seller',
        authorId: author.id,
      },
      {
        title: 'Starry Night Lullaby',
        description: 'A gentle rhyming tale to help little ones drift off to sleep among the constellations.',
        price: 12.99,
        image: '/book-cover.png',
        amazonLink: '#',
        tag: 'New Release',
        authorId: author.id,
      },
    ],
  })

  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
