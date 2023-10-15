import { useEffect, useRef } from "react";

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

export const useDraw = (onDraw: ({ctx, currentPoint, prevPoint}:Draw) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {

    const handler = (e:MouseEvent) => {
      if (!canvasRef.current) return;

      const bounds = canvasRef.current?.getBoundingClientRect() as DOMRect;
      
      const x = e.clientX - bounds?.left;
      const y = e.clientY - bounds?.top;

      const currentPoint = { x , y };
      const ctx = canvasRef.current?.getContext('2d');

      if (!currentPoint || !ctx) return;
    }

    canvasRef.current?.addEventListener('mousemove', handler);

    return () => canvasRef.current?.removeEventListener('mousemove', handler);
  }, []);

  return { canvasRef };
};
