import ModelProvider from "@/components/providers/modelProvider";
import QueryProvider from "@/components/providers/queryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<QueryProvider>
				<Toaster />
				<ModelProvider />
				{children}
			</QueryProvider>
		</ClerkProvider>
	);
}
