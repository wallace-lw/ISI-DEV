import type * as T from "./types";

export const ErrorMessage = ({ message }: T.ErrorMessageProps) => {
	return <span className="text-red-600 font-semibold text-xs">{message}</span>;
};
