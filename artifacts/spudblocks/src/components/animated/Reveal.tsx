import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode, type ElementType } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: Direction;
  as?: ElementType;
  className?: string;
  once?: boolean;
  amount?: number;
};

function offsets(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  distance = 24,
  direction = "up",
  as = "div",
  className,
  once = true,
  amount = 0.2,
}: Props) {
  const reduce = useReducedMotion();
  const offset = offsets(direction, reduce ? 0 : distance);

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
  as?: ElementType;
  once?: boolean;
  amount?: number;
};

export function StaggerGroup({
  children,
  delay = 0,
  stagger = 0.08,
  className,
  as = "div",
  once = true,
  amount = 0.2,
}: StaggerProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  distance = 20,
  direction = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: Direction;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const offset = offsets(direction, reduce ? 0 : distance);
  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
