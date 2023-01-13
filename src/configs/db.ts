import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
	log: [{ level: "query", emit: "event" }],
});

export default db;
