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

  const sizes = [5,12,16,24,32,40,45]

  const colors = ["#202020","#6A9C89", "#C1D8C3", "#F5E8B7", "#CD5C08"];

  const [cursorPos, setCursorPos] = useState({x:"0px",y:"0px"});

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
    ctx.arc(startPoint.x, startPoint.y, size/2, 0, size/2 * Math.PI);
    ctx.fill();
  }

  const handleMouse = (e: MouseEvent) => {
    setCursorPos({
      x: e.clientX - size + "px",
      y: e.clientY - size + "px"
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [cursorPos])

  return (
    <div className="h-screen grid place-items-center">
      <div
        style={{
          width: size * 2 + "px",
          height: size * 2 + "px",
          left: cursorPos.x,
          top: cursorPos.y
        }}
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
        {colors.map(color => 
          <button
            onClick={() => setColor(color)}
            style={{ backgroundColor: color }}
            className="w-24 h-24"
          ></button>
        )}
        <button
          onClick={() => setColor("#fff")}
          className="w-24 h-24 border-2 border-black grid place-content-center text-xl select-none"
        >
          ERASER
        </button>
        <button
          onClick={clear}
          className="w-24 h-24 border-2 border-black grid place-content-center text-xl select-none"
        >
          CLEAR
        </button>
      </div>
      <div className="flex mt-4 gap-8">
        {sizes.map(size => (
          <button onClick={() => setSize(size)} className="flex items-center">
            <label className="mx-4">{size}</label>
            <span style={{
              width: size*2+"px",
              height: size*2+"px"
            }} className="rounded-full border-2 border-black"></span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
