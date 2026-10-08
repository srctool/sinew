import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import {KotlinOnly, DartOnly} from '@site/src/components/LangContent';
import LangTabs from '@site/src/components/LangTabs';

// Extend the default MDX components so these are available globally in MDX files
// This prevents "Expected component X to be defined" errors when an import is missing.
export default {
  ...MDXComponents,
  KotlinOnly,
  DartOnly,
  LangTabs,
} as const;
