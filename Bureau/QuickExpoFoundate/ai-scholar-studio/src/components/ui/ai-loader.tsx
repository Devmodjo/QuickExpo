import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AILoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function AILoader({ size = "md", className, text }: AILoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const orbitSizes = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-36 h-36",
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative">
        {/* Core pulse */}
        <motion.div
          className={cn(
            sizeClasses[size],
            "rounded-full bg-gradient-to-r from-primary to-accent"
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Outer glow ring */}
        <motion.div
          className={cn(
            "absolute inset-0",
            sizeClasses[size],
            "rounded-full border-2 border-primary/50"
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Orbiting dots */}
        <div className={cn("absolute inset-0 flex items-center justify-center", orbitSizes[size])}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3,
              }}
              style={{
                transformOrigin: `${size === "sm" ? "20px" : size === "md" ? "40px" : "60px"} center`,
              }}
            />
          ))}
        </div>
      </div>

      {text && (
        <motion.p
          className="text-sm text-muted-foreground font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Simple spinner variant
export function Spinner({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full", className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}
