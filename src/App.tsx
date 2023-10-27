import "./App.css";
import { useDraw } from "./hooks/useDraw";
import { useState, useEffect } from "react";

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

function App() {

  const sizes = [5,12,16,24,32,40,45]

  const colors = [
    "#202020",
    "#6A9C89",
    "#C1D8C3",
    "#F5E8B7",
    "#CD5C08",
    "#ADD8E6",
  ];

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
    <div className="h-screen grid place-items-center overflow-hidden relative">
      <div
        style={{
          width: size * 2 + "px",
          height: size * 2 + "px",
          left: cursorPos.x,
          top: cursorPos.y,
          backgroundColor: color,
        }}
        className="absolute border-2 rounded-full z-50 select-none pointer-events-none border-black"
      ></div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={700}
        height={500}
        className="border-2 border-black"
      />
      <div
        id="buttons"
        style={{
          gridTemplateColumns: "6rem 6rem",
        }}
        className="grid absolute mt-[-19.3rem] ml-[1400px] w-[700px]"
      >
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setColor(color)}
            style={{ backgroundColor: color }}
            className="w-24 h-24"
          ></button>
        ))}
        <button
          onClick={() => setColor("#fff")}
          className="w-24 h-24 border-y-2 border-l-2 border-r-[1px] border-black grid place-content-center text-xl select-none"
        >
          ERASER
        </button>
        <button
          onClick={clear}
          className="w-24 h-24 border-y-2 border-l-[1px] border-r-2 border-black grid place-content-center text-xl select-none"
        >
          CLEAR
        </button>
      </div>
      <div className="flex items-center -mt-56 gap-8">
        {sizes.map((size) => (
          <button
            style={{
              backgroundColor: color,
            }}
            key={"size" + size}
            onClick={() => setSize(size)}
            className="flex items-center border-2 border-black h-fit pr-4 py-2 rounded-xl"
          >
            {/*"#C1D8C3", "#F5E8B7"*/}
            <strong
              style={{
                color:
                  color == "#C1D8C3" ||
                  color == "#F5E8B7" ||
                  color == "#fff" ||
                  color == "#ADD8E6"
                    ? "black"
                    : "white",
              }}
              className="mx-4"
            >
              {size}
            </strong>
            <span
              style={{
                width: size * 2 + "px",
                height: size * 2 + "px",
                borderColor:
                  color == "#C1D8C3" ||
                  color == "#F5E8B7" ||
                  color == "#fff" ||
                  color == "#ADD8E6"
                    ? "black"
                    : "white",
              }}
              className="rounded-full border-2"
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
