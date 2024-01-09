"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/useAction";
import { useProModel } from "@/hooks/useProModel";
import Image from "next/image";
import { toast } from "sonner";

export default function ProModel() {
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
		execute({});
	};

	return (
		<Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
			<DialogContent className='max-w-md p-0 overflow-hidden'>
				<div className='aspect-video relative flex items-center justify-center'>
					<Image fill src='/hero3.png' alt='Hero' className='object-cover' />
				</div>
				<div className='text-neutral-700 mx-auto space-y-6 p-6'>
					<h2 className='font-semibold text-xl'>
						Upgrade to Taaskan Pro Today!
					</h2>
					<p className='text-xs font-semibold text-neutral-600'>
						Explore the best of Taaskan
					</p>
					<div className='pl-3'>
						<ul className='text-sm list-disc'>
							<li>Unlimited boards</li>
							<li>Advanced checklists</li>
							<li>Admin and security features</li>
							<li>And more...</li>
						</ul>
					</div>
					<Button
						disabled={isLoading}
						onClick={onClick}
						className='w-full'
						variant='premium'>
						Upgrade
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
