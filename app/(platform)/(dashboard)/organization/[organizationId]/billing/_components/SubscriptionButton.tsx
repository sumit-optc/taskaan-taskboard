"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { useProModel } from "@/hooks/useProModel";
import { toast } from "sonner";

interface SubscriptionButtonProps {
	isPro: boolean;
}

export default function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
	const proModel = useProModel();

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess: (data) => {
			window.location.href = data;
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const onClick = () => {
		if (isPro) {
			execute({});
		} else {
			proModel.onOpen();
		}
	};

	return (
		<Button
			variant={isPro ? "primary" : "premium"}
			onClick={onClick}
			disabled={isLoading}>
			{isPro ? "Manage subscription" : "Upgrade to pro"}
		</Button>
	);
}
