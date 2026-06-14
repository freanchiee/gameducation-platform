'use client';
import { Card } from '@/app/components/ui/card';

export default function MultimediaEmbedBlock() {
  return (
    <Card className="p-4">
      <iframe
        width="100%"
        height="300"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Card>
  );
}
