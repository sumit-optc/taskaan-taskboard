"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModel } from "@/hooks/useCardModel";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Description from "./Description";
import Header from "./Header";
import Actions from "./Actions";
import { AuditLog } from "@prisma/client";
import Activity from "./Activity";

export default function CardModel() {
	const id = useCardModel((state) => state.id);
	const isOpen = useCardModel((state) => state.isOpen);
	const onClose = useCardModel((state) => state.onClose);

	const { data: cardData } = useQuery<CardWithList>({
		queryKey: ["card", id],
		queryFn: () => fetcher(`/api/cards/${id}`),
	});
	const { data: auditLogsData } = useQuery<AuditLog[]>({
		queryKey: ["card-logs", id],
		queryFn: () => fetcher(`/api/cards/${id}/logs`),
	});

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
				<div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
					<div className='col-span-3'>
						<div className='w-full space-y-6'>
							{!cardData ? (
								<Description.Skeleton />
							) : (
								<Description data={cardData} />
							)}
							{!auditLogsData ? (
								<Activity.Skeleton />
							) : (
								<Activity items={auditLogsData} />
							)}
						</div>
					</div>
					{!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
				</div>
			</DialogContent>
		</Dialog>
	);
}
