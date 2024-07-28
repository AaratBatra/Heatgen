"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
const chartData = [{ browser: "safari", visitors: 100, fill: "var(--color-safari)" },]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

import Count from "./count"
import { useState, useEffect, useRef } from "react"
export function Component({n}: {n: number}) {
  //const [chartData, setChartData] = useState([]);
  //const chartData = useRef([{browser: "safari", visitors: 200, fill: "var(--color-safari)"}]);
  // useEffect(()=>{
  //   chartData.current[0].visitors = n;
  // }, [n])
  const [data, setData] = useState([{ browser: "safari", visitors: 20, fill: "var(--color-safari)" }]);

  useEffect(() => {
    setData([{ browser: "safari", visitors: n, fill: "var(--color-safari)" }]);
  }, [n]);
  const calculateStartAngle = (value: number) => {
    const minAngle = -540;
    const maxAngle = -180;
    const maxValue = 50; // Adjust 
    const angleRange = maxAngle - minAngle;
    const angle = maxAngle - ((value / maxValue) * angleRange);
    return Math.max(minAngle, Math.min(maxAngle, angle));
  };

  const startAngle = calculateStartAngle(n);
  return (
    <Card className="flex flex-col w-full bg-stone-900">
      <CardHeader className="items-center pb-0">
        <CardTitle>Hottest Area Interactions</CardTitle>
        <CardDescription>Total interactions on the hottest area</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={startAngle}
            endAngle={-180}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan><Count c={50} /></tspan>
                        {/* <Count c={50}/> */}
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {data[0].visitors.toLocaleString()}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter> */}
    </Card>
  )
}
