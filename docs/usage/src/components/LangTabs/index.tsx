import React, {useEffect, useState} from 'react';
import {getPreferredLang, setPreferredLang, Lang} from '../LanguageSwitcher';

// Kotlin and Dart tabs driven by the site-wide language preference (the sidebar switcher, the home
// page menu and every tab group on the page share it). Docusaurus' own <Tabs> keeps a selection of
// its own and ignores changes to defaultValue, so it can't follow the switcher; this one is
// controlled by the preference instead.
//
// Usage in MDX:
// <LangTabs>
//   <TabItem value="kotlin"> ```kotlin ... ``` </TabItem>
//   <TabItem value="dart"> ```dart ... ``` </TabItem>
// </LangTabs>

const LABELS: Record<Lang, string> = {kotlin: 'Kotlin', dart: 'Dart'};

// A marker component: LangTabs reads its `value` and renders its children for the selected language.
export const TabItem: React.FC<React.PropsWithChildren<{value: Lang; label?: string}>> = ({children}) => <>{children}</>;

const LangTabs: React.FC<React.PropsWithChildren> = ({children}) => {
  // Start from Kotlin on the server and the first client render, then read the saved choice, so the
  // markup matches during hydration.
  const [lang, setLang] = useState<Lang>('kotlin');

  useEffect(() => {
    setLang(getPreferredLang());
    const handler = (e: Event) => {
      const next = (e as CustomEvent).detail?.lang as Lang | undefined;
      if (next) setLang(next);
    };
    window.addEventListener('sinew:langChange', handler);
    return () => window.removeEventListener('sinew:langChange', handler);
  }, []);

  const items = React.Children.toArray(children).filter(Boolean) as React.ReactElement<{value: Lang}>[];
  const available = items.map((item) => item.props.value);
  // A group with only one language shows it whatever is selected.
  const shown = available.includes(lang) ? lang : available[0];

  return (
    <div className="lang-tabs">
      <ul className="tabs" role="tablist" aria-label="Language">
        {available.map((value) => (
          <li
            key={value}
            role="tab"
            tabIndex={value === shown ? 0 : -1}
            aria-selected={value === shown}
            className={value === shown ? 'tabs__item tabs__item--active' : 'tabs__item'}
            onClick={() => setPreferredLang(value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setPreferredLang(value);
              }
            }}>
            {LABELS[value]}
          </li>
        ))}
      </ul>
      <div role="tabpanel" className="margin-top--md">
        {items.filter((item) => item.props.value === shown)}
      </div>
    </div>
  );
};

export default LangTabs;
