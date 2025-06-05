import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Engineering Best Practices',
  tagline: 'Comprehensive guide to software engineering excellence',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://uttam1728.github.io',
  baseUrl: '/engineering-best-practices/',

  organizationName: 'Uttam1728', // Your GitHub username
  projectName: 'engineering-best-practices', // Your GitHub repo name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/Uttam1728/engineering-best-practices/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/Uttam1728/engineering-best-practices/edit/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Engineering Best Practices',
      logo: {
        alt: 'Engineering Best Practices Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/Uttam1728/engineering-best-practices',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Best Practices Guide',
              to: '/docs/code-quality',
            },
            {
              label: 'Developer Checklist',
              to: '/docs/developer-guide',
            },
          ],
        },
        {
          title: 'Engineering Topics',
          items: [
            {
              label: 'Database Design',
              to: '/docs/code-quality#-database-design',
            },
            {
              label: 'API Architecture',
              to: '/docs/code-quality#-api-design--backend-architecture',
            },
            {
              label: 'Code Quality',
              to: '/docs/code-quality#-code-quality--structure',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Uttam1728/engineering-best-practices',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Engineering Best Practices. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
