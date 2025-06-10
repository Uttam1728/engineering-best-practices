import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/engineering-best-practices/docs',
    component: ComponentCreator('/engineering-best-practices/docs', '371'),
    routes: [
      {
        path: '/engineering-best-practices/docs',
        component: ComponentCreator('/engineering-best-practices/docs', 'bfc'),
        routes: [
          {
            path: '/engineering-best-practices/docs',
            component: ComponentCreator('/engineering-best-practices/docs', 'e4e'),
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
                component: ComponentCreator('/engineering-best-practices/docs/intro', '416'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/engineering-best-practices/',
    component: ComponentCreator('/engineering-best-practices/', '826'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
