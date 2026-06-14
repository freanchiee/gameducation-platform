// src/app/components/TypewriterEffect.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  words: string[];
  colors: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  colors,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1000,
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [currentColor, setCurrentColor] = useState(colors[0]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing and deleting effect
  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.substring(0, text.length + 1));
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      } else {
        if (text.length > 0) {
          setText(text.substring(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);

          // Inline random color selector avoids dependency warning
          const randomIndex = Math.floor(Math.random() * colors.length);
          setCurrentColor(colors[randomIndex]);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, colors, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-flex">
      <span style={{ color: currentColor }}>{text}</span>
      <span
        className={showCursor ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.1s', color: currentColor }}
      >
        |
      </span>
    </span>
  );
};

export default TypewriterEffect;
