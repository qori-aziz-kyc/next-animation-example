"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";

export default function Home() {
  function downloadURI(uri: string, name: string) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const stageRef = React.useRef(null);

  const handleExport = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    // we also can save uri as file
    // but in the demo on Konva website it will not work
    // because of iframe restrictions
    // but feel free to use it in your apps:
    downloadURI(uri, "stage.png");
  };
  const size = useWindowSize();

  return (
    <>
      <button type="button" onClick={handleExport}>
        Click here to log stage data URL
      </button>
      <Stage
        className="stage"
        width={size.width}
        height={size.height}
        ref={stageRef}
      >
        <Layer>
          <Rect x={200} y={200} width={50} height={50} fill="red" draggable />
          <Circle x={200} y={200} stroke="blue" radius={50} draggable />
        </Layer>
      </Stage>
    </>
  );
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
