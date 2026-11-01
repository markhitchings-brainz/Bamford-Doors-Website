import { defineConfig } from 'sanity';
import { newsStory } from './schemas/newsStory';

export const sanityConfig = defineConfig({
  name: 'bamford-doors',
  title: 'Bamford Doors',
  projectId: 'ih9rxf6u',
  dataset: 'production',
  basePath: '/admin',
  schema: {
    types: [newsStory],
  },
});
