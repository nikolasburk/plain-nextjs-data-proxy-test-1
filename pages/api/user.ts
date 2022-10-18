import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
  console.log(`Invoking /user (via ${req.method || "unknown"})`);
  const name = req.query.name as string | undefined;
  console.log(`Creating new user with name: ${name || "---"}`);

  const user = await prisma.user.create({
    data: {
      name,
    },
  });
  const userCount = await prisma.user.count();

  const message = `Created user with name: ${
    user.name || "---"
  }. There are ${userCount} users in the database.`;
  console.log(message);

  // console.log(`Closing all connections in Prisma Client's connection pool ...`)
  // await prisma.$disconnect();
  // console.log(`Closed all connections.`)

  res.status(200).json(message);
}

