import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// The contributor docs: design, architecture and implementation, generated from the design notes.
// The usage docs (for app developers) are a separate site, docs/usage, which links here through Contributing.

const config: Config = {
  title: 'Sinew',
  tagline: 'Plug-and-play app architecture for Kotlin Multiplatform and Flutter',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: process.env.SINEW_INTERNAL_URL ?? 'http://localhost:3000',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // Cloudflare Pages serves page.html at /page, so URLs have no trailing slash and no redirect.
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'srctool', // Usually your GitHub org/user name.
  projectName: 'sinew', // Usually your repo name.

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    // Update these lists to reflect published library versions.
    // The first entry is used as the default in the selector.
    libraryVersions: {
      kotlin: ['latest'],
      dart: ['latest'],
    },
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        // The Guide: one sidebar generated from the design notes. Routes are /guide/….
        path: 'development',
        routeBasePath: '/',
        sidebarPath: require.resolve('./development/sidebars.ts'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contributing',
        path: 'contributing',
        routeBasePath: 'contributing',
        sidebarPath: require.resolve('./contributing/sidebars.ts'),
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Overview', to: '/guide'},
            {label: 'Architecture', to: '/guide/foundations/architecture'},
            {label: 'Error Model', to: '/guide/foundations/error-model'},
            {label: 'Roadmap', to: '/guide/project/roadmap'},
          ],
        },
        {
          title: 'Packages',
          items: [
            {label: 'Paging', to: '/guide/packages/paging'},
            {label: 'Network', to: '/guide/packages/network'},
            {label: 'DevTools', to: '/guide/packages/dev-tools'},
          ],
        },
        {
          title: 'Platform',
          items: [
            {
              label: 'Kotlin/KMP',
              href: 'https://kotlinlang.org/docs/multiplatform.html',
            },
            {
              label: 'Flutter/Dart',
              href: 'https://flutter.dev',
            },
            {
              label: 'Camouflage (UI library)',
              href: 'https://github.com/srctool/camouflage',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/srctool/sinew',
            },
            {
              label: 'Contributing',
              to: '/contributing',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SRC Tool. Built with Docusaurus.`,
    },
    navbar: {
      title: 'Sinew',
      logo: {
        alt: 'Sinew Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          // One link: the Guide is this sidebar.
          type: 'docSidebar',
          sidebarId: 'developmentSidebar',
          label: 'Development',
          position: 'right',
        },
        {
          to: '/contributing',
          label: 'Contributing',
          position: 'right',
        },
        // Version selector injected via swizzled Navbar Right content
        {
          href: 'https://github.com/srctool/sinew',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
