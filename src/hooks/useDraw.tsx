import { useEffect, useRef, useState } from "react";

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<Point | null>(null);

  const onMouseDown = () => setMouseDown(true);
  const onMouseUp = () => {
    setMouseDown(false);
    prevPoint.current = null;
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;

      if (!canvasRef.current) return;

      const bounds = canvasRef.current?.getBoundingClientRect() as DOMRect;

      const x = e.clientX - bounds?.left;
      const y = e.clientY - bounds?.top;

      const currentPoint = { x, y };
      const ctx = canvasRef.current?.getContext("2d");

      if (!currentPoint || !ctx) return;

      onDraw({ ctx, prevPoint: prevPoint.current, currentPoint });
      prevPoint.current = currentPoint;
    };

    canvasRef.current?.addEventListener("mousemove", handler);
    window.addEventListener('mouseup', onMouseUp);
    
    return () => {
      canvasRef.current?.removeEventListener("mousemove", handler)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [onDraw]);

  return { canvasRef, onMouseDown };
};
