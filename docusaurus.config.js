import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Engineering Best Practices',
  tagline: 'Comprehensive guide to software engineering excellence',
  favicon: 'img/favicon.ico',
  
  // Set the production url of your site here
  url: 'https://uttam1728.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/engineering-best-practices/',

  organizationName: 'Uttam1728',
  projectName: 'engineering-best-practices',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Uttam1728/engineering-best-practices/edit/main/',
        },
        // Remove blog configuration entirely
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
          // Removed blog link from navbar
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
                to: '/docs/code-quality#️-database-design',
              },
              {
                label: 'API Architecture', 
                to: '/docs/code-quality#-api-design--backend-architecture',
              },
              {
                label: 'Code Quality',
                to: '/docs/code-quality#️-code-quality--structure',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // Removed blog link from footer
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
    }),
};

export default config; 