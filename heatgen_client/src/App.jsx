import { useState, useEffect, useRef } from "react";
import { useHeatmap } from "./heatmapContext.jsx";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
//import { socket } from "./socket";

function App({ socket }) {
	const { isEmitting } = useHeatmap();
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [count, setCount] = useState(0);
	const [heatData, setHeatData] = useState([]);
	//const [somethingHappened, setSomethingHappened] = useState(false);
	//const somethingHappened = useRef(false);
	const heatmapContainer = useRef(document.querySelector("body"));
	const heatDataRef = useRef([]);
	let c = useRef(0);
	useEffect(() => {
		heatDataRef.current = heatData;
	}, [heatData]);
	useEffect(() => {
		console.log("hi");
		socket.on("connect", () => {
			console.log("connected");
			setIsConnected(true);
		});
		socket.on("disconnect", () => {
			console.log("disconnected");
			setIsConnected(false);
		});
		const handleMouseMove = (e) => {
			//somethingHappened.current = true
			if (c.current == 5) {
				setHeatData((prev) => [
					...prev,
					{ x: e.clientX, y: e.clientY, value: 1 },
				]);
				c.current = 0;
			} else {
				c.current += 1;
			}
		};
		const handleClick = (e) => {
			//somethingHappened.current = true
			setHeatData((prev) => [
				...prev,
				{ x: e.clientX, y: e.clientY, value: 1 },
			]);
		};
		const handleTouchMove = (e) => {
			//somethingHappened.current = true
			const touch = e.touches[0];
			setHeatData((prev) => [
				...prev,
				{ x: touch.clientX, y: touch.clientY, value: 1 },
			]);
		};
		heatmapContainer.current.addEventListener("mousemove", handleMouseMove);
		heatmapContainer.current.addEventListener("click", handleClick);
		heatmapContainer.current.addEventListener("touchmove", handleTouchMove);
		const intervalId = setInterval(() => {
			if (isEmitting) {
				//console.log(heatDataRef.current)
				if (heatDataRef) {
					socket.emit("heat", heatDataRef.current);
				}
				//somethingHappened.current = false
			}
		}, 10000);
		const cleanupInterval = setInterval(() => {
			setHeatData([]);
			heatDataRef.current = null;
		}, 100000);
		return () => {
			socket.off("connect", () => {
				console.log("connected");
				setIsConnected(true);
			});
			socket.off("disconnect", () => {
				console.log("disconnected");
				setIsConnected(false);
			});
			clearInterval(intervalId);
			clearInterval(cleanupInterval);
			heatmapContainer.current.removeEventListener(
				"mousemove",
				handleMouseMove
			);
			heatmapContainer.current.removeEventListener(
				"touchmove",
				handleTouchMove
			);
		};
	}, []);

	async function resetData() {
		try {
			const res = await fetch("http://localhost:5000/reset");
			const { message } = await res.json();
			console.log(message);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<button onClick={() => resetData()}>Reset Heatmap</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
		</>
	);
}

export default App;
