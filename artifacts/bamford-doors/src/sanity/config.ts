import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { newsStory } from './schemas/newsStory';
import { caseStudy } from './schemas/caseStudy';
import { pageHeading } from './schemas/pageHeading';

export const sanityConfig = defineConfig({
  name: 'bamford-doors',
  title: 'Bamford Doors',
  projectId: 'ih9rxf6u',
  dataset: 'production',
  basePath: '/admin',
  plugins: [
    structureTool({
      structure: (S) => S.list().title('Website content').items([
        S.documentTypeListItem('newsStory').title('News stories'),
        S.documentTypeListItem('caseStudy').title('Case studies'),
        S.documentTypeListItem('pageHeading').title('Page headlines'),
      ]),
    }),
  ],
  schema: {
    types: [newsStory, caseStudy, pageHeading],
  },
});
