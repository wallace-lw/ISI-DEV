import cors from "@fastify/cors";
import Fastify from "fastify";
import registerRoutes from "./routes";
import { errorHandler } from "./utils";
import prisma from "./utils/db";

const app = Fastify({ logger: true });

app.register(cors, {
	origin: "*",
	methods: ["GET", "POST", "PATCH", "DELETE"],
});

app.setErrorHandler(errorHandler);

app.register(registerRoutes);

app.get("/health", async () => {
	await prisma.$queryRaw`SELECT 1`;
	return { status: "ok" };
});

export default app;
