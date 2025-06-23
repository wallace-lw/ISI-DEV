import "module-alias/register";
import "dotenv/config";
import app from "./app";

const PORT = Number.parseInt(process.env.PORT || "3000", 10);

const start = async () => {
	try {
		await app.listen({ port: PORT, host: "0.0.0.0" });
		console.log(`Server running on port ${PORT}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

start();
