'use client'
import "@/app/dashboard/dashboard.css";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Component } from "./components/miniChart";
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AnalyticsCard from "./components/AnalyticsCard";
import { TimeStampChart } from "./components/TImeStampChart";
import socket from "@/utils/socket";
import { useState, useEffect, useRef } from "react";

//total_interaction: number
//total_with_time: [{[string: number]}]
//total_int_in_hotzone: number
type TimestampData = {
    [key: string]: number;
};

type DataFromNode = {
    total_interaction: number;
    total_with_time: TimestampData;
    total_int_in_hotzone: number;
	visitors: number;
} | null;
const Dashboard = () => {
	const [connected, setConnected] = useState(socket.connected);
	const [data, setData] = useState<DataFromNode>(null)

	useEffect(()=>{
		socket.on('connect', ()=>{setConnected(true); console.log("ws connected")});
		socket.on('disconnect', ()=>{setConnected(false); console.log("ws disconnected")});
		socket.on('analytics_from_node', (datafromnode)=>setData(datafromnode))
		return () => {
			socket.off('connect', ()=>{setConnected(true); console.log("ws connected")});
			socket.off('disconnect', ()=>{setConnected(false); console.log("ws disconnected")});
			socket.off('analytics_from_node', (datafromnode)=>setData(datafromnode));
		}
	},[])
	return (
		<main className="p-4 max-md:p-1">
			<h1 className="text-4xl text-center text-red-500 font-extrabold">
				Dashboard
			</h1>

			<Button variant="ghost" asChild>
				<a
					id="website"
					href="#"
					target="_blank"
					className="text-2xl mx-auto"
				>
					www.example.com
				</a>
			</Button>
			<Card className="bg-stone-900 max-md:p-1">
				<CardHeader>
					<CardTitle className="text-3xl text-red-500 font-bold">
						Your Heatmaps
					</CardTitle>
					<CardDescription>
						Both desktop and mobile heatmaps of example.com
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-20 max-md:gap-4 max-md:p-1 max-w-[100%] mx-auto grid-cols-1 md:grid-cols-[1fr_450px]">
					
					<Label htmlFor="desktop" className="mt-12 md:hidden">Desktop:</Label>
					<ScrollArea
						id="desktop"
						className="desktop_heatmap w-[800px] h-[500px] max-md:w-full max-md:h-[400px] mt-1 mx-auto border border-border rounded-lg"
					>
						<iframe
							src="http://localhost:5173/heatmap"
							title="Website Preview"
							style={{
								border: "none",
								width: "1536px",
								height: "730px",
							}}
							sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
						></iframe>
						<ScrollBar orientation="horizontal"/>
					</ScrollArea>
					
					<Label htmlFor="mobile" className="mt-12 md:hidden">Mobile: </Label>
					<ScrollArea className="mobile-heatmap w-[430px] h-[500px] max-md:w-full max-md:h-[400px] mt-1 mx-auto border border-border rounded-lg" id="mobile">
						<iframe
							src="http://localhost:5173/heatmap"
							title="Website Preview"
							style={{
								border: "none",
								width: "430px",
								height: "1000px",
							}}
							sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
						></iframe>
						{/* <ScrollBar orientation="horizontal" /> */}
					</ScrollArea>
				</CardContent>
			</Card>
			<br />
			<h1 className="text-3xl text-center text-red-500 font-bold">
				Analytics
			</h1>
			<div className="flex flex-col gap-4 mt-5 w-full max-md:p-2 max-md:w-screen">
				<div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4 max-md:w-full">
					<AnalyticsCard title={"Total Visitors"} n={data ? data.visitors : 0} type={"visitors"} maxV={100}/>
					<AnalyticsCard title={"Total Interactions"} n={data ? data.total_interaction || 0 : 0} type={"clicks"} maxV={2500}/>
					<AnalyticsCard title={"Avg. Interactions"} n={data ? Math.floor((data.total_interaction/data.visitors)) : 0} type={"other"} maxV={1000}/>
					<Component n={data ? data.total_int_in_hotzone || 0 : 0}/>
				</div>
				<TimeStampChart timestampData={data?.total_with_time}/>
			</div>
		</main>
	);
};

export default Dashboard;
