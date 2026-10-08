import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Manual sidebar for Contributing section
const sidebars: SidebarsConfig = {
  contributingSidebar: [
    'intro',
    'git-workflow',
    {
      type: 'category',
      label: 'How To',
      collapsed: false,
      items: [
        'how-to-report-a-bug',
        'how-to-contribute-code',
        'how-to-open-a-pull-request',
        'how-to-run-and-write-test',
      ],
    },
    'versioning-policy',
    'release-process',
  ],
};

export default sidebars;
