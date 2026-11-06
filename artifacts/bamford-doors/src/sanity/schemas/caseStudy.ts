import { defineField, defineType } from 'sanity';
import { getCaseStudyVideoEmbed } from '../caseStudyVideo';

const imageFields = [
  defineField({
    name: 'alt',
    title: 'Image description',
    type: 'string',
    description: 'Describe the entrance or project shown, for visitors using screen readers.',
    validation: (rule) => rule.required(),
  }),
  defineField({ name: 'caption', title: 'Caption', type: 'string' }),
];

function projectSection(name: string, title: string) {
  return defineField({
    name,
    title,
    group: 'story',
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Quote', value: 'blockquote' },
        ],
        marks: {
          decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
          annotations: [{
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
            })],
          }],
        },
      },
      { type: 'image', options: { hotspot: true }, fields: imageFields },
    ],
    validation: (rule) => rule.required().min(1),
  });
}

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  groups: [
    { name: 'story', title: 'Project story', default: true },
    { name: 'details', title: 'Project details' },
    { name: 'images', title: 'Project media' },
    { name: 'seo', title: 'Search & publishing' },
  ],
  fields: [
    defineField({
      name: 'title', title: 'Project title', type: 'string', group: 'story',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug', title: 'URL slug', type: 'slug', group: 'story',
      description: 'Generate from the title before publishing. Keep this unchanged after sharing the project link.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required().custom((value) =>
        !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
          ? true : 'Use lowercase letters, numbers and single hyphens only.'),
    }),
    defineField({
      name: 'excerpt', title: 'Short introduction', type: 'text', rows: 3, group: 'story',
      description: 'A short introduction for the project page and its listing card.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'videoUrl', title: 'YouTube or Vimeo video URL', type: 'url', group: 'story',
      description: 'Optional. Add a YouTube or Vimeo link here; it will appear as an embedded video on the published project page.',
      validation: (rule) => rule.uri({ scheme: ['https'] }).custom((value) =>
        !value || getCaseStudyVideoEmbed(value)
          ? true
          : 'Enter a valid YouTube or Vimeo video URL.'),
    }),
    projectSection('brief', 'The brief'),
    projectSection('solution', 'Our solution'),
    projectSection('outcome', 'The outcome'),
    defineField({
      name: 'location', title: 'Location', type: 'string', group: 'details',
      description: 'Use a town or region rather than a private residential address.',
    }),
    defineField({
      name: 'sector', title: 'Sector', type: 'string', group: 'details',
      options: { list: ['Social housing', 'Housing associations', 'Local authorities', 'HMOs', 'Apartment blocks', 'Education', 'Healthcare', 'Public and commercial buildings', 'Other'] },
    }),
    defineField({
      name: 'clientName', title: 'Client name', type: 'string', group: 'details',
      description: 'Optional. Only include the client’s name when you have permission to publish it.',
    }),
    defineField({ name: 'completedAt', title: 'Project completion date', type: 'date', group: 'details' }),
    defineField({
      name: 'productsUsed', title: 'Products used', type: 'array', group: 'details',
      description: 'Add the product names used on this project.',
      of: [{ type: 'string', validation: (rule) => rule.min(1) }],
    }),
    defineField({
      name: 'testimonial', title: 'Client testimonial', type: 'object', group: 'details',
      description: 'Optional. Only publish an approved quotation and attribution.',
      fields: [
        defineField({ name: 'quote', title: 'Quotation', type: 'text', rows: 4, validation: (rule) => rule.required() }),
        defineField({ name: 'attribution', title: 'Name or organisation', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'role', title: 'Role', type: 'string' }),
      ],
    }),
    defineField({
      name: 'mainImage', title: 'Feature image', type: 'image', group: 'images',
      options: { hotspot: true }, fields: imageFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery', title: 'Project gallery', type: 'array', group: 'images',
      description: 'Reorder images by dragging them. Each image needs a description; captions are optional.',
      of: [{ type: 'image', options: { hotspot: true }, fields: imageFields }],
    }),
    defineField({
      name: 'publishedAt', title: 'Publication date', type: 'datetime', group: 'seo',
      description: 'The project appears publicly after you click Publish and this date has been reached.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo',
      description: 'Optional. The project title is used when this is empty.',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2, group: 'seo',
      description: 'Optional. The short introduction is used when this is empty.',
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { title: 'title', sector: 'sector', location: 'location', media: 'mainImage' },
    prepare({ title, sector, location, media }) {
      return { title: title || 'Untitled project', subtitle: [sector, location].filter(Boolean).join(' · '), media };
    },
  },
});
