import { motion, Variants } from "framer-motion";
import ArchCard from "./ArchCard";

type CardInfo = {
    title: string
    content: string
    imgUrl: string
}
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

const archData: CardInfo[] = [
    {
        title: "SDK for Host Websites",
        content: "Our SDK, developed in React, allows website owners to easily integrate our heatmap tracking system. It captures user interactions and sends data for real-time analysis.",
        imgUrl: "/sdk_for_react.png"
    },
    {
        title: "Flask Server for Statistical Analysis",
        content: "The Flask server is dedicated to generating in-depth statistical analysis from the collected heatmap data, providing valuable insights into user behavior.",
        imgUrl: "/flask.jpg"
    },
    {
        title: "Node.js Server for Management",
        content: "The Node.js server manages all hosts running the SDK, facilitates communication between the Flask server and the dashboard, and handles user management for website owners.",
        imgUrl: "/node.jpg"
    },
    {
        title: "Next.js Dashboard",
        content: "Our Next.js dashboard offers website owners real-time heatmaps and detailed analytics, enabling them to understand user interactions and optimize their websites effectively.",
        imgUrl: "/dashboard_example.jpg"
    }
]

export default function Architecture() {
  return (<motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.2 }} variants={cardVariants} className="w-[70%] max-md:w-full flex flex-col mt-8">
        <h1 className="text-2xl font-bold text-red-500">Architecture</h1>
        {archData.map(({title, content, imgUrl}, index)=>{
            return <ArchCard key={index} title={title} content={content} imgUrl={imgUrl} index={index} />
        })}
    </motion.div>)
  
}
