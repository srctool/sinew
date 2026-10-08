import React, {useEffect, useMemo, useState} from 'react';
import OriginalTOCItems from '@theme-original/TOCItems';
import type {Props} from '@theme/TOCItems';
import {getPreferredLang, Lang} from '@site/src/components/LanguageSwitcher';

// Implementation headings carry a language prefix in their id (#kotlin-…, #dart-…),
// set by scripts/sync_vault.py. Only the selected language's headings are listed.
const OTHER: Record<Lang, string> = {kotlin: 'dart-', dart: 'kotlin-'};

export default function TOCItemsWrapper(props: Props) {
  const [lang, setLang] = useState<Lang>('kotlin');

  useEffect(() => {
    setLang(getPreferredLang());
    const handler = (e: any) => {
      const next = e?.detail?.lang as Lang | undefined;
      if (next) setLang(next);
    };
    window.addEventListener('sinew:langChange', handler);
    return () => window.removeEventListener('sinew:langChange', handler);
  }, []);

  const toc = useMemo(
    () => props.toc.filter((item) => !item.id.startsWith(OTHER[lang])),
    [props.toc, lang],
  );

  return <OriginalTOCItems {...props} toc={toc} />;
}
