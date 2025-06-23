import Fastify from "fastify";
import cors from "@fastify/cors";
import prisma from "./utils/db";
import registerRoutes from "./routes";
import { errorHandler } from "./utils";

const app = Fastify({ logger: true });

// Configurar CORS
app.register(cors, {
	origin: "*",
	methods: ["GET", "POST", "PATCH", "DELETE"],
});

app.setErrorHandler(errorHandler);

// Registrar rotas
app.register(registerRoutes);

// Health check
app.get("/health", async () => {
	await prisma.$queryRaw`SELECT 1`;
	return { status: "ok" };
});

export default app;
