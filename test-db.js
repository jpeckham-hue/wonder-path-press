const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.book.findMany().then(b => {
  console.dir(b, { depth: null });
  prisma.();
});
