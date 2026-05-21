"use client";

import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const CONNECTION_DISTANCE = 178;
const CURSOR_RADIUS = 240;
const MAX_DOT_COUNT = 78;
const MIN_DOT_COUNT = 36;

export default function InteractiveHeroBackground({ className = "fixed" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    const pointer = { active: false, x: 0, y: 0, vx: 0, vy: 0 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dots = [];
    let animationFrame;
    let width = 0;
    let height = 0;
    let dotCount = 0;
    let bounds = { left: 0, top: 0, width: 0, height: 0 };

    function isDarkMode() {
      return document.documentElement.classList.contains("dark");
    }

    function createDot(index) {
      const angle = index * 2.399963 + Math.random() * 0.5;
      const speed = 0.08 + Math.random() * 0.16;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseSize: 1.25 + Math.random() * 1.45,
        phase: Math.random() * Math.PI * 2,
        speed,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    }

    function syncDots() {
      const nextCount = clamp(
        Math.round((width * height) / 17500),
        MIN_DOT_COUNT,
        MAX_DOT_COUNT
      );

      while (dots.length < nextCount) {
        dots.push(createDot(dots.length));
      }

      dots.length = nextCount;
      dotCount = nextCount;
    }

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parentBounds = canvas.parentElement?.getBoundingClientRect();

      bounds = parentBounds || {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      syncDots();
    }

    function handlePointerMove(event) {
      bounds = canvas.parentElement?.getBoundingClientRect() || bounds;
      const nextX = event.clientX - bounds.left;
      const nextY = event.clientY - bounds.top;

      pointer.vx = pointer.active ? nextX - pointer.x : 0;
      pointer.vy = pointer.active ? nextY - pointer.y : 0;
      pointer.active = true;
      pointer.x = nextX;
      pointer.y = nextY;

      if (reducedMotion.matches) {
        draw(performance.now());
      }
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function drawLine(start, end, alpha, darkMode) {
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.strokeStyle = darkMode
        ? `rgba(18, 183, 255, ${alpha})`
        : `rgba(0, 91, 255, ${alpha})`;
      context.lineWidth = darkMode ? 0.72 : 0.62;
      context.stroke();
    }

    function drawDot(dot, alpha, darkMode) {
      const radius = dot.baseSize + Math.sin(dot.phase) * 0.35;
      const glowRadius = radius * 3.2;
      const glow = context.createRadialGradient(
        dot.x,
        dot.y,
        0,
        dot.x,
        dot.y,
        glowRadius
      );

      glow.addColorStop(
        0,
        darkMode ? "rgba(18, 183, 255, 0.18)" : "rgba(0, 91, 255, 0.12)"
      );
      glow.addColorStop(1, "rgba(18, 183, 255, 0)");

      context.beginPath();
      context.arc(dot.x, dot.y, glowRadius, 0, Math.PI * 2);
      context.fillStyle = glow;
      context.fill();

      context.beginPath();
      context.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      context.fillStyle = darkMode
        ? `rgba(18, 183, 255, ${alpha})`
        : `rgba(0, 91, 255, ${alpha})`;
      context.fill();
    }

    function drawCursorGlow(darkMode) {
      if (!pointer.active) {
        return;
      }

      const glow = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        CURSOR_RADIUS * 0.95
      );

      glow.addColorStop(0, darkMode ? "rgba(18, 183, 255, 0.12)" : "rgba(18, 183, 255, 0.16)");
      glow.addColorStop(0.28, darkMode ? "rgba(0, 91, 255, 0.09)" : "rgba(0, 91, 255, 0.09)");
      glow.addColorStop(0.58, darkMode ? "rgba(18, 183, 255, 0.035)" : "rgba(18, 183, 255, 0.045)");
      glow.addColorStop(1, "rgba(18, 183, 255, 0)");

      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    }

    function draw(time) {
      const darkMode = isDarkMode();
      const lineBaseAlpha = darkMode ? 0.34 : 0.42;
      const dotBaseAlpha = darkMode ? 0.92 : 0.84;

      context.clearRect(0, 0, width, height);
      drawCursorGlow(darkMode);

      dots.forEach((dot, index) => {
        if (!reducedMotion.matches) {
          const drift = Math.sin(time * 0.00035 + dot.phase) * 0.08;
          dot.x += dot.vx + drift;
          dot.y += dot.vy + Math.cos(time * 0.00028 + dot.phase) * 0.08;
          dot.phase += 0.008;
        }

        if (pointer.active) {
          const pointerDistance = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);

          if (pointerDistance < CURSOR_RADIUS) {
            const influence = 1 - pointerDistance / CURSOR_RADIUS;
            const pull = influence * 0.9;
            dot.x += ((pointer.x - dot.x) / pointerDistance || 0) * pull;
            dot.y += ((pointer.y - dot.y) / pointerDistance || 0) * pull;
            dot.x += pointer.vx * influence * 0.012;
            dot.y += pointer.vy * influence * 0.012;
          }
        }

        if (dot.x < -30) dot.x = width + 30;
        if (dot.x > width + 30) dot.x = -30;
        if (dot.y < -30) dot.y = height + 30;
        if (dot.y > height + 30) dot.y = -30;

        for (let nextIndex = index + 1; nextIndex < dotCount; nextIndex += 1) {
          const nextDot = dots[nextIndex];
          const distance = Math.hypot(dot.x - nextDot.x, dot.y - nextDot.y);

          if (distance < CONNECTION_DISTANCE) {
            const alpha =
              (1 - distance / CONNECTION_DISTANCE) *
              lineBaseAlpha *
              (pointer.active &&
              Math.hypot((dot.x + nextDot.x) / 2 - pointer.x, (dot.y + nextDot.y) / 2 - pointer.y) <
                CURSOR_RADIUS
                ? 2.35
                : 1);

            drawLine(dot, nextDot, alpha, darkMode);
          }
        }
      });

      dots.forEach((dot) => {
        const pointerBoost =
          pointer.active && Math.hypot(dot.x - pointer.x, dot.y - pointer.y) < CURSOR_RADIUS
            ? 0.38
            : 0;

        drawDot(dot, dotBaseAlpha + pointerBoost, darkMode);
      });

      pointer.vx *= 0.86;
      pointer.vy *= 0.86;

      if (!reducedMotion.matches) {
        animationFrame = requestAnimationFrame(draw);
      }
    }

    resizeCanvas();
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`interactive-hero-background ${className} inset-0 z-0`}>
      <canvas ref={canvasRef} className="interactive-hero-background__canvas" />
      <div className="interactive-hero-background__glow" />
    </div>
  );
}
