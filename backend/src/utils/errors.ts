import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export enum AppErrorCode {
	VALIDATION = "VALIDATION",
	DATABASE = "DATABASE",
	NOT_FOUND = "NOT_FOUND",
	CONFLICT = "CONFLICT",
	UNPROCESSABLE = "UNPROCESSABLE",
	INTERNAL = "INTERNAL",
}

export class AppError extends Error {
	constructor(
		public code: AppErrorCode,
		public message: string,
		public statusCode: number,
	) {
		super(message);
	}
}

export const errorHandler = (
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	if (error instanceof AppError) {
		reply.status(error.statusCode).send({
			error: error.message,
			code: error.code,
			status: error.statusCode,
		});
	} else {
		request.log.error(error);

		reply.status(500).send({
			error: "Internal server error",
			code: AppErrorCode.INTERNAL,
			status: 500,
		});
	}
};
