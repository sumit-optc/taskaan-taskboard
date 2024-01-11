import { Suspense } from "react";
import BoardList from "./_components/BoardList";
import Info from "./_components/Info";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";
import { getAvailableCount } from "@/lib/orgLimit";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function OrganizationIdPage() {
	const isPro = await checkSubscription();
	const availableCount = await getAvailableCount();

	const { orgId } = auth();

	if (!orgId) {
		return redirect("/select-org");
	}

	const boards = await db.board.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div className='w-full mb-20'>
			<Info isPro={isPro} />
			<Separator className='my-4' />
			<div className='px-2 md:px-4'>
				<Suspense fallback={<BoardList.Skeleton />}>
					<BoardList
						availableCount={availableCount}
						isPro={isPro}
						boards={boards}
					/>
				</Suspense>
			</div>
		</div>
	);
}
