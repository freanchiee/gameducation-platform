'use client';

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  stars: number;
  avatarSeed: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      'Gameducation has transformed how I teach science. My students are more engaged and their test scores have improved significantly.',
    author: 'Emily Johnson',
    role: 'Science Teacher, Lincoln High School',
    stars: 5,
    avatarSeed: 'emily-johnson',
  },
  {
    quote:
      'The platform is incredibly intuitive. I was able to create a custom math game in less than 10 minutes that my students absolutely love.',
    author: 'Mark Davis',
    role: 'Math Department Head, Westview Academy',
    stars: 4,
    avatarSeed: 'mark-davis',
  },
  {
    quote:
      "As a district administrator, I've seen remarkable improvements in student participation across all our schools using Gameducation.",
    author: 'Sarah Thompson',
    role: 'Education Director, Riverside District',
    stars: 5,
    avatarSeed: 'sarah-thompson',
  },
];

const generateAvatar = (seed: string) => {
  return createAvatar(micah, {
    seed,
    backgroundColor: ['f8efc6'],
  }).toString();
};

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [avatars, setAvatars] = useState<string[]>([]);

  useEffect(() => {
    const generated = testimonials.map((t) => generateAvatar(t.avatarSeed));
    setAvatars(generated);
  }, []);

  // Auto-scroll every 4s
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="container mx-auto py-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gameducation-navy dark:text-white text-center mb-12">
        What Educators Are Saying
      </h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="min-w-[300px] max-w-sm flex-shrink-0 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition hover:shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* 🧑 Avatar */}
              {avatars[index] && (
                <div
                  className="w-16 h-16 mb-4 mx-auto rounded-full border shadow-inner overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: avatars[index] }}
                />
              )}

              <p className="text-gray-700 dark:text-gray-200 mb-4 text-center text-sm leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* ⭐ Star Ratings */}
              <div className="flex justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < testimonial.stars
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                    fill={i < testimonial.stars ? 'currentColor' : 'none'}
                  />
                ))}
              </div>

              {/* Author */}
              <div className="text-center">
                <p className="font-semibold text-gameducation-navy dark:text-white">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
