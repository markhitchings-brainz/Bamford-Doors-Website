import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const VIDEO_URL =
  'https://cdn.sanity.io/files/ih9rxf6u/production/6d6388fdc17671d6c762de945b8d368834b3bce9.mp4';

export function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (preference.matches) video.pause();
      else void video.play().catch(() => setPlaying(false));
    };
    updatePlayback();
    preference.addEventListener('change', updatePlayback);
    return () => preference.removeEventListener('change', updatePlayback);
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="rl-hero-video"
        src={VIDEO_URL}
        poster="/media/home-hero-video-poster-v2.webp"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Bamford Doors entrance systems"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setPlaying(false); }}
      />
      {!failed && (
        <button
          type="button"
          className="rl-hero-video-control"
          aria-label={playing ? 'Pause background video' : 'Play background video'}
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            if (video.paused) void video.play().catch(() => setPlaying(false));
            else video.pause();
          }}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
          <span>{playing ? 'Pause video' : 'Play video'}</span>
        </button>
      )}
    </>
  );
}
