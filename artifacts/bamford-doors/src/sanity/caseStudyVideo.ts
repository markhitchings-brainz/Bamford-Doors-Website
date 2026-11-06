export type CaseStudyVideoEmbed = {
  provider: 'YouTube' | 'Vimeo';
  src: string;
};

const youtubeHosts = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
]);

const vimeoHosts = new Set([
  'vimeo.com',
  'www.vimeo.com',
  'player.vimeo.com',
]);

const youtubeIdPattern = /^[A-Za-z0-9_-]{11}$/;
const vimeoIdPattern = /^\d{5,15}$/;
const vimeoHashPattern = /^[A-Za-z0-9]{5,40}$/;

function pathParts(pathname: string) {
  return pathname.split('/').filter(Boolean);
}

export function getCaseStudyVideoEmbed(value?: string | null): CaseStudyVideoEmbed | null {
  if (!value?.trim()) return null;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;

    const host = url.hostname.toLowerCase();
    const parts = pathParts(url.pathname);

    if (host === 'youtu.be') {
      const id = parts[0];
      if (!id || !youtubeIdPattern.test(id)) return null;
      return {
        provider: 'YouTube',
        src: `https://www.youtube-nocookie.com/embed/${id}`,
      };
    }

    if (youtubeHosts.has(host)) {
      const id = parts[0] === 'watch'
        ? url.searchParams.get('v')
        : ['embed', 'shorts', 'live'].includes(parts[0] || '')
          ? parts[1]
          : null;
      if (!id || !youtubeIdPattern.test(id)) return null;
      return {
        provider: 'YouTube',
        src: `https://www.youtube-nocookie.com/embed/${id}`,
      };
    }

    if (vimeoHosts.has(host)) {
      const id = host === 'player.vimeo.com'
        ? parts[0] === 'video' ? parts[1] : undefined
        : parts[0];
      if (!id || !vimeoIdPattern.test(id)) return null;

      const embedUrl = new URL(`https://player.vimeo.com/video/${id}`);
      const pathHash = host !== 'player.vimeo.com' && parts[1] && vimeoHashPattern.test(parts[1])
        ? parts[1]
        : undefined;
      const hash = url.searchParams.get('h') || pathHash;
      if (hash && vimeoHashPattern.test(hash)) embedUrl.searchParams.set('h', hash);

      return { provider: 'Vimeo', src: embedUrl.toString() };
    }
  } catch {
    return null;
  }

  return null;
}
