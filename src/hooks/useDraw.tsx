import { useEffect, useRef, useState } from "react";

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

export const useDraw = (onDraw: ({ctx, currentPoint, prevPoint}:Draw) => void) => {
  
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<Point | null>(null);

  const onMouseDown = () => setMouseDown(true);

  useEffect(() => {

    const handler = (e:MouseEvent) => {
      if (!canvasRef.current) return;

      const bounds = canvasRef.current?.getBoundingClientRect() as DOMRect;
      
      const x = e.clientX - bounds?.left;
      const y = e.clientY - bounds?.top;

      const currentPoint = { x , y };
      const ctx = canvasRef.current?.getContext('2d');

      if (!currentPoint || !ctx) return;

      prevPoint.current = currentPoint;
      onDraw({ctx, prevPoint: prevPoint.current, currentPoint})
    }

    canvasRef.current?.addEventListener('mousemove', handler);

    return () => canvasRef.current?.removeEventListener('mousemove', handler);
  }, []);

  return { canvasRef, onMouseDown };
};
