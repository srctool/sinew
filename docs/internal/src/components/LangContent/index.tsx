import React, {useEffect, useState} from 'react';
import {getPreferredLang, Lang} from '@site/src/components/LanguageSwitcher';

/**
 * Render children only when the global preferred language matches.
 * - Listens to the global `sinew:langChange` event dispatched by LanguageSwitcher
 * - Defaults to 'kotlin' during SSR/first render if no preference is saved
 */
const UseLang: React.FC<{only: Lang; children: React.ReactNode}> = ({only, children}) => {
  const [lang, setLang] = useState<Lang>(getPreferredLang());

  useEffect(() => {
    const handler = (e: any) => {
      const next = e?.detail?.lang as Lang | undefined;
      if (next && next !== lang) setLang(next);
    };
    window.addEventListener('sinew:langChange', handler);
    return () => window.removeEventListener('sinew:langChange', handler);
  }, [lang]);

  if (lang !== only) return null;
  return <>{children}</>;
};

export const KotlinOnly: React.FC<{children: React.ReactNode}> = ({children}) => (
  <UseLang only="kotlin">{children}</UseLang>
);

export const DartOnly: React.FC<{children: React.ReactNode}> = ({children}) => (
  <UseLang only="dart">{children}</UseLang>
);

export default UseLang;
