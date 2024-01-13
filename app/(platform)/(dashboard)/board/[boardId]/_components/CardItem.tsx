"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModel } from "@/hooks/useCardModel";
import { fetcher } from "@/lib/fetcher";
import { Draggable } from "@hello-pangea/dnd";
import { AuditLog, Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

interface CardItemProps {
	data: Card;
	index: number;
}

export default function CardItem({ data, index }: CardItemProps) {
	const cardModel = useCardModel();

	const { data: auditLogsData } = useQuery<AuditLog[]>({
		queryKey: ["card-logs", data.id],
		queryFn: () => fetcher(`/api/cards/${data.id}/logs`),
	});

	const creator = auditLogsData?.[auditLogsData?.length - 1];

	return (
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role='button'
					onClick={() => cardModel.onOpen(data.id)}
					className='truncate border-2 border-transparent hover:border-black py-1 px-2 text-sm bg-white rounded-md shadow-sm flex items-center'>
					{data.title}

					{!auditLogsData ? (
						<Skeleton className='ml-auto h-7 w-7 rounded-full' />
					) : (
						<Avatar className='ml-auto h-7 w-7'>
							<AvatarImage src={creator?.userImage} />
						</Avatar>
					)}
				</div>
			)}
		</Draggable>
	);
}
