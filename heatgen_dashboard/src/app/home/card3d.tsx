import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { buttonVariants } from "@/components/ui/button";
const Card3d = ({ title, description, imgUrl }: {title: string, description?: string, imgUrl: string}): React.ReactElement => {
	return (
		<CardContainer
			className="inter-var border-red-500"
			containerClassName="border-red-500 py-6"
		>
			<CardBody className="bg-gray-50 relative group/card border dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-stone-700/70 dark:border-red-500/[0.8] border-red-500/[0.8] w-auto sm:w-[24rem] h-auto rounded-xl p-4">
				<CardItem
					translateZ="50"
					className="text-xl font-bold text-neutral-600 dark:text-white"
				>
					{title}
				</CardItem>
				<CardItem
					as="p"
					translateZ="60"
					className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
				>
					{description}
				</CardItem>
				<CardItem translateZ="100" className="w-full mt-4">
					<Image
						src={imgUrl}
						priority
						height="1000"
						width="1000"
						className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
						alt="thumbnail"
					/>
				</CardItem>
				<div className="flex justify-between items-center mt-10">
					{/* <CardItem
							translateZ={20}
							as={Link}
							href="https://twitter.com/mannupaaji"
							target="__blank"
							className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
						>
							Try now →
						</CardItem> */}
					<CardItem
						translateZ={20}
						as="button"
						className="px-4 py-2 rounded-xl text-foreground text-xs font-bold"
					>
						<Link
							href={"/dashboard"}
							className={buttonVariants({
								variant: "default",
							})}
						>
							Get Started
						</Link>
					</CardItem>
				</div>
			</CardBody>
		</CardContainer>
	);
};

export default Card3d;
