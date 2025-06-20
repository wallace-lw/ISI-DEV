import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "lucide-react/dynamic";
import { Component, type ErrorInfo, Suspense } from "react";
import * as T from "./types";

export class ErrorBoundary extends Component<T.Props, T.State> {
	public state: T.State = { hasError: false };

	public static defaultProps = {
		fullScreen: false,
	};

	public static getDerivedStateFromError(_: Error): T.State {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div
					className={cn(
						"w-full flex items-center justify-center flex-col gap-4",
						this.props.fullScreen ? "h-screen" : "h-[calc(100vh-128px)]",
					)}
				>
					<DynamicIcon name="alarm-check" />

					<div className="text-center">
						<h1 className="text-2xl">Ops! Parece que algo deu errado.</h1>
						<p className="text-lg">Pedimos desculpas pela inconveniência. </p>
					</div>

					<div className="text-center">
						<Label>
							Nossa equipe já foi notificada sobre o erro e está trabalhando
							para corrigi-lo o mais rápido possível.
						</Label>

						<Label>
							Enquanto isso, você pode tentar novamente mais tarde ou entrar em
							contato conosco para relatar o problema.
						</Label>
					</div>
				</div>
			);
		}

		return <Suspense>{this.props.children}</Suspense>;
	}
}
