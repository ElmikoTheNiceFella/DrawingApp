import "./App.css";
import { useDraw } from "./hooks/useDraw";
import {useState} from 'react';

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

function App() {

  const colors = ["#f56056", "#000", ""];

  const [color, setColor] = useState("#000")

  const { canvasRef, onMouseDown } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currentX, y: currentY } = currentPoint;
    const startPoint = prevPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className="h-screen grid place-content-center">
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={700}
        height={500}
        className="border-2 border-black"
      />
      <div onClick={() => setColor("#505050")} className="w-24 h-24 bg-[#505050]"></div>
    </div>
  );
}

export default App;
