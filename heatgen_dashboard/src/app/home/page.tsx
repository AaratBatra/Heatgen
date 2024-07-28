"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import "./home.css";
import Card3d from "./card3d";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import h337 from "heatmap.js";
import { Sparkle } from "@/components/Sparkle";
import { GeminiEffect } from "@/components/GeminiEffect";
import Architecture from "@/components/Architecure";
import { motion, Variants } from "framer-motion";
import {Team} from "@/components/Team";
const cardVariants: Variants = {
	offscreen: {
		y: 300,
		opacity: 0
	},
	onscreen: {
		y: 0,
		opacity: 1,
		//rotate: -10,
		transition: {
			type: "spring",
			bounce: 0.4,
			duration: 0.8,
		},
	},
};
function Home() {
	const heatmapContainer = useRef<HTMLDivElement>(null);
	const heatmapInstance = useRef<any>(null); // Use useRef to store the heatmap instance

	useEffect(() => {
		if (heatmapContainer.current) {
			heatmapInstance.current = h337.create({
				container: heatmapContainer.current,
				radius: 50,
			});

			const handleMouseMove = (e: MouseEvent) => {
				const x = e.layerX;
				const y = e.layerY;
				heatmapInstance.current.addData({ x, y, value: 1 });
			};

			heatmapContainer.current.addEventListener(
				"mousemove",
				handleMouseMove
			);

			return () => {
				if (heatmapContainer.current) {
					heatmapContainer.current.removeEventListener(
						"mousemove",
						handleMouseMove
					);
				}
				heatmapInstance.current = null;
			};
		}
	}, []);
	// let heatmap: any = null;
	// useEffect(() => {
	// 	if (heatmapContainer.current) {
	// 		heatmap = h337.create({
	// 			container: heatmapContainer.current,
	// 			radius: 50,
	// 		});
	//     const handleMouseMove = (e: any) => {
	//       let x = e.clientX;
	//       let y = e.clientY;
	//       heatmap.addData({x: x, y: y, value: 1})
	//     }
	//     heatmapContainer.current.addEventListener('mousemove', handleMouseMove);
	//     return () => {
	//       heatmapContainer.current?.removeEventListener('mousemove', handleMouseMove);
	//       heatmap = null;
	//     }
	// 	}
	// }, []);

	const [toggleExpand, setToggleExpand] = useState<boolean>(false);
	return (
		<>
			<div
				id="main"
				className="container flex flex-col items-center max-md:px-2"
			>
				<h1 className="heading text-6xl mt-4 mb-1">Heatgen</h1>
				<Sparkle />
				<motion.div
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ once: true, amount: 0.2 }}
					variants={cardVariants}
					className="w-[70%] max-md:w-full"
				>
					<Card className="bg-gray-50/10 backdrop-blur-sm mt-4 w-full">
						<CardHeader>
							<CardTitle>
								What is{" "}
								<span className="text-red-500">Heatgen</span>?
							</CardTitle>
							<CardDescription></CardDescription>
						</CardHeader>
						<CardContent className="transition-all duration-1000">
							<p>
								Ever wondered how exactly e-commerce and other
								large scale websites get to know what products
								or sections on their website are popular and
								in-demand?
							</p>
							<p>
								How can this analysis be done in an instant say,{" "}
								<span className="text-red-500 font-bold">
									10 seconds or less?
								</span>
							</p>
							<Button
								className="mt-2"
								onClick={() => setToggleExpand(!toggleExpand)}
							>
								View More{" "}
								{toggleExpand ? (
									<ChevronDown />
								) : (
									<ChevronRight />
								)}
							</Button>
							{toggleExpand && (
								<>
									<p>
										According to the article titled "What
										Are Heatmaps? How They Work and Ways You
										Can Use Them" by Heap and "Visualize
										your website’s performance with
										heatmaps" by webflow{" "}
									</p>
									<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
										<li>
											"Attention heatmaps combine many
											types of interactive data like the
											number of clicks, their patterns,
											pages visited, and so on, to provide
											an aggregated perspective of a
											visitor's activity"
										</li>
										<li>
											"Mouse-tracking heatmaps monitor a
											cursor's overall movement on a
											webpage. They show where visitors
											hover or hesitate before clicking or
											scrolling to highlight how users
											interact with the site" ​​
										</li>
										<li>
											"Heatmaps visually represent user
											interactions, they highlight
											specific behaviors based on various
											clicks, scrolls, and tracking
											trends"
										</li>
										<li>
											"Heatmaps are effective at giving
											you a snapshot of user engagement
											across your site and mobile app"
										</li>
									</ul>

									<p>
										Thus, heatmaps are indeed powerful for
										gettin valuable insights for your
										website along with much more potential
										now that Artifitial Intelligence is at
										our disposal.
									</p>
								</>
							)}
						</CardContent>
					</Card>
				</motion.div>
				<motion.div
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ once: true, amount: 0.2 }}
					variants={cardVariants}
					className="w-[70%] max-md:w-full"
				>
					<Card className="bg-gray-50/10 backdrop-blur-sm mt-4 w-full">
						<CardHeader>
							<CardTitle className="text-red-500">
								Our Aim
							</CardTitle>
							<CardDescription></CardDescription>
						</CardHeader>
						<CardContent className="transition-all duration-1000">
							<p>
								We aim to create a free and open source tool
								that website owners of any scale can use in
								order to not only view their heatmaps in
								real-time but also get real-time analysis at
								their disposal so that they can improvise and
								further plan their marketing.
							</p>
						</CardContent>
					</Card>
				</motion.div>
				<motion.div
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ once: true, amount: 0.2 }}
					variants={cardVariants}
					className="w-[70%] max-md:w-full"
				>
					<Card className="bg-gray-50/10 backdrop-blur-sm mt-4 w-full">
						<CardHeader>
							<CardTitle>
								Simple yet{" "}
								<span className="text-red-500 font-bold">
									complex
								</span>
							</CardTitle>
							<CardDescription>
								We offer you two components
							</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-2 max-md:grid-cols-1">
							<Card3d
								title={"Real-time heatmap"}
								description={
									"get a real-time heatmap of your website"
								}
								imgUrl={"/heatmap_display.jpeg"}
							/>
							<Card3d
								title={"Real-time dashboard"}
								description={
									"get valuable insights in real-time"
								}
								imgUrl={"/dashboard_example.jpg"}
							/>
						</CardContent>
					</Card>
				</motion.div>
				<motion.div
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ once: true, amount: 0.2 }}
					variants={cardVariants}
					className="w-[70%] max-md:w-full"
				>
					<Card className="bg-gray-50/10 backdrop-blur-sm mt-4 w-full">
						<CardHeader>
							<CardTitle>A small demo</CardTitle>
							<CardDescription>
								Hover your cursor on this area. Tip- rapidly
								move your cursor over a very small range.
							</CardDescription>
						</CardHeader>
						<CardContent className="h-[500px]">
							<div
								className="w-full h-full bg-stone-800 border rounded-lg border-border border-dashed"
								ref={heatmapContainer}
							></div>
						</CardContent>
					</Card>
				</motion.div>
				<Architecture />
				<Team />
				<GeminiEffect />
			</div>
		</>
	);
}

export default Home;
