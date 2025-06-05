import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Engineering Best Practices Sidebar
  tutorialSidebar: [
    'code-quality',
    'developer-guide',
    {
      type: 'category',
      label: 'Best Practices Reference',
      items: [
        {
          type: 'link',
          label: 'Database Design',
          href: '/docs/code-quality#-database-design',
        },
        {
          type: 'link',
          label: 'API Architecture',
          href: '/docs/code-quality#-api-design--backend-architecture',
        },
        {
          type: 'link',
          label: 'Code Quality',
          href: '/docs/code-quality#-code-quality--structure',
        },
        {
          type: 'link',
          label: 'Testing & Review',
          href: '/docs/code-quality#-testing--code-review',
        },
        {
          type: 'link',
          label: 'Security',
          href: '/docs/code-quality#-security--compliance',
        },
        {
          type: 'link',
          label: 'Performance',
          href: '/docs/code-quality#-scalability--performance',
        },
      ],
    },
    {
      type: 'category',
      label: 'Daily Workflow',
      items: [
        {
          type: 'link',
          label: 'Branch & PR Rules',
          href: '/docs/developer-guide#-branch--pr-rules',
        },
        {
          type: 'link',
          label: 'Pre-commit Checks',
          href: '/docs/developer-guide#-pre-commit-checks',
        },
        {
          type: 'link',
          label: 'Security Checklist',
          href: '/docs/developer-guide#-security',
        },
        {
          type: 'link',
          label: 'Testing Requirements',
          href: '/docs/developer-guide#-testing',
        },
      ],
    },
  ],
};

export default sidebars;
