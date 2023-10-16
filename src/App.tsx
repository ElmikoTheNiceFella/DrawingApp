import "./App.css";
import { useDraw } from "./hooks/useDraw";
import { useState, useEffect, useRef } from "react";

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

function App() {

  const cursor = useRef(null);

  const [size, setSize] = useState(5)

  const [color, setColor] = useState("#000");

  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currentX, y: currentY } = currentPoint;
    const startPoint = prevPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  const handleMouse = (e: MouseEvent) => {
    const cur = cursor.current! as HTMLDivElement;

    cur.style.left = e.clientX - size/2 + "px";
    cur.style.top = e.clientY - size/2 + "px";
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [cursor])

  return (
    <div className="h-screen grid place-content-center">
      <div
        style={{
          width: size * 2 + "px",
          height: size * 2 + "px",
        }}
        ref={cursor}
        className="absolute border-2 rounded-full select-none pointer-events-none border-black"
      ></div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={700}
        height={500}
        className="border-2 border-black"
      />
      <div id="buttons" className="flex w-[700px] m-auto justify-center">
        <div
          onClick={() => setColor("#000")}
          className="w-24 h-24 bg-[#000]"
        ></div>
        <div
          onClick={() => setColor("#fff")}
          className="w-24 h-24 border-2 border-black grid place-content-center text-xl select-none"
        >
          ERASER
        </div>
        <div
          onClick={clear}
          className="w-24 h-24 border-2 border-black grid place-content-center text-xl select-none"
        >
          CLEAR
        </div>
      </div>
    </div>
  );
}

export default App;
