import "./App.css";
import { useDraw } from "./hooks/useDraw";

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

function App() {
  const { canvasRef, onMouseDown } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currentX, y: currentY } = currentPoint;
    const startPoint = prevPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000";
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    ctx.fillStyle = "#000";
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
    </div>
  );
}

export default App;
