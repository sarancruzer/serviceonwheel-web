"use client";

import { Typewriter } from "react-simple-typewriter";

export default function HeroTyped({ words }: { words: string[] }) {
  return (
    <span className="text-linear-primary">
      <Typewriter
        words={words}
        loop={0}
        cursor
        cursorStyle=""
        typeSpeed={70}
        deleteSpeed={40}
        delaySpeed={1800}
      />
    </span>
  );
}
