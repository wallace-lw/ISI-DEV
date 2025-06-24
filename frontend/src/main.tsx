import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Toaster } from "./components/ui/sonner";
import "./index.css";

const root = document.getElementById("root")!;
const queryClient = new QueryClient();

createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<Toaster richColors />
		</QueryClientProvider>
	</StrictMode>,
);
