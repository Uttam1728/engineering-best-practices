import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/engineering-best-practices/blog',
    component: ComponentCreator('/engineering-best-practices/blog', 'd51'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/archive',
    component: ComponentCreator('/engineering-best-practices/blog/archive', '167'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/authors',
    component: ComponentCreator('/engineering-best-practices/blog/authors', 'af3'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/engineering-best-practices/blog/authors/all-sebastien-lorber-articles', '7ac'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/authors/yangshun',
    component: ComponentCreator('/engineering-best-practices/blog/authors/yangshun', '624'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/first-blog-post',
    component: ComponentCreator('/engineering-best-practices/blog/first-blog-post', '3e3'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/long-blog-post',
    component: ComponentCreator('/engineering-best-practices/blog/long-blog-post', 'd34'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/mdx-blog-post',
    component: ComponentCreator('/engineering-best-practices/blog/mdx-blog-post', '60a'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/tags',
    component: ComponentCreator('/engineering-best-practices/blog/tags', 'bf0'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/tags/docusaurus',
    component: ComponentCreator('/engineering-best-practices/blog/tags/docusaurus', '715'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/tags/facebook',
    component: ComponentCreator('/engineering-best-practices/blog/tags/facebook', '2bf'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/tags/hello',
    component: ComponentCreator('/engineering-best-practices/blog/tags/hello', 'c24'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/tags/hola',
    component: ComponentCreator('/engineering-best-practices/blog/tags/hola', '324'),
    exact: true
  },
  {
    path: '/engineering-best-practices/blog/welcome',
    component: ComponentCreator('/engineering-best-practices/blog/welcome', '98f'),
    exact: true
  },
  {
    path: '/engineering-best-practices/markdown-page',
    component: ComponentCreator('/engineering-best-practices/markdown-page', '63b'),
    exact: true
  },
  {
    path: '/engineering-best-practices/docs',
    component: ComponentCreator('/engineering-best-practices/docs', 'c5d'),
    routes: [
      {
        path: '/engineering-best-practices/docs',
        component: ComponentCreator('/engineering-best-practices/docs', '006'),
        routes: [
          {
            path: '/engineering-best-practices/docs',
            component: ComponentCreator('/engineering-best-practices/docs', '448'),
            routes: [
              {
                path: '/engineering-best-practices/docs/code-quality',
                component: ComponentCreator('/engineering-best-practices/docs/code-quality', '969'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/engineering-best-practices/docs/developer-guide',
                component: ComponentCreator('/engineering-best-practices/docs/developer-guide', '8d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/engineering-best-practices/docs/intro',
                component: ComponentCreator('/engineering-best-practices/docs/intro', 'b1d'),
                exact: true
              },
              {
                path: '/engineering-best-practices/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/engineering-best-practices/docs/tutorial-basics/congratulations', 'af1'),
                exact: true
              },
              {
                path: '/engineering-best-practices/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/engineering-best-practices/docs/tutorial-basics/create-a-blog-post', '775'),
                exact: true
              },
              {
                path: '/engineering-best-practices/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/engineering-best-practices/docs/tutorial-basics/create-a-document', '76c'),
                exact: true
              },
              {
                path: '/engineering-best-practices/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/engineering-best-practices/docs/tutorial-basics/create-a-page', '005'),
                exact: true
              },
              {
                path: '/engineering-best-practices/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/engineering-best-practices/docs/tutorial-basics/deploy-your-site', '152'),
                exact: true
              },
              {
                path: '/engineering-best-practices/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/engineering-best-practices/docs/tutorial-basics/markdown-features', '68b'),
                exact: true
              },
              {
                path: '/engineering-best-practices/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/engineering-best-practices/docs/tutorial-extras/manage-docs-versions', 'b2f'),
                exact: true
              },
              {
                path: '/engineering-best-practices/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/engineering-best-practices/docs/tutorial-extras/translate-your-site', 'dc0'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/engineering-best-practices/',
    component: ComponentCreator('/engineering-best-practices/', 'cba'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
