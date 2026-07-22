import { ArticleCategory } from '@/types/article';

export const categories: (ArticleCategory & { articles?: { slug: string; title: string }[] })[] = [
  {
    name: 'Getting Started',
    slug: 'getting-started',
    description: 'Learn the basics of Optionify and get up and running quickly',
    icon: '🚀',
    order: 1,
    articles: [
      { slug: 'getting-started-with-optionify', title: 'Getting Started with Optionify' },
      { slug: 'creating-your-first-product-option', title: 'Creating Your First Product Option' },
      { slug: 'understanding-assign-types', title: 'Understanding Assign Types' },
    ],
  },
  {
    name: 'Option Types',
    slug: 'option-types',
    description: 'Detailed guides for each of the 17 option types available in Optionify',
    icon: '⚙️',
    order: 2,
    articles: [
      { slug: 'text-options', title: 'How to Use Text Options' },
      { slug: 'textarea-options', title: 'How to Use Textarea Options' },
      { slug: 'radio-options', title: 'How to Use Radio Button Options' },
      { slug: 'switch-options', title: 'How to Use Switch Options' },
      { slug: 'checkbox-options', title: 'How to Use Checkbox Options' },
      { slug: 'dropdown-options', title: 'How to Use Dropdown Options' },
      { slug: 'image-options', title: 'How to Use Image Upload Options' },
      { slug: 'datepicker-options', title: 'How to Use Date Picker Options' },
      { slug: 'email-options', title: 'How to Use Email Options' },
      { slug: 'number-options', title: 'How to Use Number Options' },
      { slug: 'color-options', title: 'How to Use Color Dropdown Options' },
    ],
  },
  {
    name: 'Advanced Topics',
    slug: 'advanced',
    description: 'Advanced features and configurations for power users',
    icon: '🎯',
    order: 3,
    articles: [
      { slug: 'conditional-logic', title: 'Conditional Logic & Dependencies' },
      { slug: 'pricing-variants', title: 'Pricing & Variants' },
      { slug: 'plans-features', title: 'Optionify Plans & Features' },
      { slug: 'troubleshooting', title: 'Troubleshooting Common Issues' },
    ],
  },
];
