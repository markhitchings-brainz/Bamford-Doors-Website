import { Studio } from 'sanity';
import { sanityConfig } from './config';

export default function StudioPage() {
  return (
    <main className="sanity-studio">
      <Studio config={sanityConfig} />
    </main>
  );
}
