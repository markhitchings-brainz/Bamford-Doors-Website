import { defineField, defineType } from 'sanity';

export const pageHeading = defineType({
  name: 'pageHeading',
  title: 'Page headline',
  type: 'document',
  fields: [
    defineField({
      name: 'pagePath',
      title: 'Page path',
      type: 'string',
      description: 'The public page path, for example /products or /products/mailboxes.',
      validation: (rule) => rule.required().custom((value) =>
        !value || (/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(value) && !value.endsWith('/'))
          ? true
          : 'Use a page path starting with /, without a trailing slash.'),
    }),
    defineField({
      name: 'headline',
      title: 'H1 headline',
      type: 'text',
      rows: 2,
      description: 'The main heading shown at the top of this page. Line breaks are supported.',
      validation: (rule) => rule.required().max(120),
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'pagePath' },
    prepare({ title, subtitle }) {
      return { title: title || 'Headline not set', subtitle: subtitle || 'Page path not set' };
    },
  },
});
