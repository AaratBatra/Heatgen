import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import h337 from "heatmap.js";
import { useHeatmap } from "../heatmapContext";
//import { socket } from "../socket";

const Heatmap = ({children, socket}) => {
  const { setIsEmitting } = useHeatmap();
  const heatmapContainer = useRef(document.querySelector('body'));
  const heatmapInstance = useRef(null);
  const onHeat = (heatData)=>{
    console.log(heatData.length);
    heatmapInstance.current.setData({
      max: 50,
      min: 0,
      data: heatData,
    })
  };

  useEffect(()=>{
    setIsEmitting(false);
    if (heatmapContainer.current) {
      heatmapInstance.current = h337.create({
				container: heatmapContainer.current,
				radius: 20,
			});
    }
    socket.on('heat', onHeat);
    return ()=>{
      socket.off('heat', onHeat);
    }
  }, [])


  return (
    <>
      {children}
    </>
  )
}

export default Heatmap
