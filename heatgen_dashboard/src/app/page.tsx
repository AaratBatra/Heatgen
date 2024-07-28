"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "./landing.css";

// ui imports
import { Button, buttonVariants  } from "@/components/ui/button";
export default function Home() {
	const wrapper = useRef<HTMLDivElement>(null);
	const wait = async () =>
		await new Promise((resolve) =>
			setTimeout(() => {
				wrapper.current ? wrapper.current.classList.add("show") : "";
				resolve;
			}, 3500)
		);
	wait();
	return (
		<div className="main">
			<div ref={wrapper} id="main" className="container fade-in flex flex-col items-center">
				<h1 className="heading text-6xl">Heatgen</h1>
				<p className="subheading text-2xl">
					Get real-time heatmaps for your website
				</p>
        <Button size={'lg'} className="mx-auto mt-24">
          <Link href="/home">Dive In</Link>
        </Button>
			</div>

			<Image
				src={"/marble.svg"}
				width={1000}
				height={1000}
				alt="marble"
				className="marble"
			></Image>
		</div>
	);
}
