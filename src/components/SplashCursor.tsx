import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashCursorProps {
  color?: string;
  size?: number;
  duration?: number;
}

interface Splash {
  id: number;
  x: number;
  y: number;
}

export const SplashCursor: React.FC<SplashCursorProps> = ({
  color = "#3B82F6", // Blue color that matches your solar theme
  size = 20,
  duration = 0.6,
}) => {
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newSplash: Splash = {
        id: nextId,
        x: e.clientX,
        y: e.clientY,
      };

      setSplashes((prev) => [...prev, newSplash]);
      setNextId((prev) => prev + 1);

      // Remove splash after animation
      setTimeout(() => {
        setSplashes((prev) =>
          prev.filter((splash) => splash.id !== newSplash.id)
        );
      }, duration * 1000);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [nextId, duration]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            className="absolute"
            style={{
              left: splash.x - size / 2,
              top: splash.y - size / 2,
              width: size,
              height: size,
            }}
            initial={{
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: [0, 1.5, 2],
              opacity: [1, 0.8, 0],
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: duration,
              ease: "easeOut",
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 ${size * 2}px ${color}`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SplashCursor;
