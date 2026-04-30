import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type Parsed = {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
};

function parseValue(raw: string): Parsed {
  const match = raw.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", number: 0, suffix: raw, decimals: 0 };
  }
  const numericStr = match[2];
  const decimals = numericStr.includes(".")
    ? numericStr.split(".")[1].length
    : 0;
  return {
    prefix: match[1],
    number: parseFloat(numericStr),
    suffix: match[3],
    decimals,
  };
}

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export function CountUp({ value, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(
    parsed.number === 0 ? value : `${parsed.prefix}0${parsed.suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    if (parsed.number === 0) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, parsed.number, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const formatted =
          parsed.decimals > 0
            ? latest.toFixed(parsed.decimals)
            : Math.round(latest).toLocaleString();
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [
    inView,
    parsed.number,
    parsed.decimals,
    parsed.prefix,
    parsed.suffix,
    duration,
    value,
  ]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
