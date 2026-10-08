import React, {useEffect, useMemo, useState} from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {getPreferredLang, setPreferredLang, Lang} from '../LanguageSwitcher';

// Wrapper over Docusaurus Tabs that syncs selected tab with global preference
// Usage in MDX:
// <LangTabs>
//   <TabItem value="kotlin" label="Kotlin">
//     ```kotlin
//     // code here
//     ```
//   </TabItem>
//   <TabItem value="dart" label="Dart">
//     ```dart
//     // code here
//     ```
//   </TabItem>
// </LangTabs>
const LangTabs: React.FC<React.PropsWithChildren<{groupId?: string}>> = ({children, groupId = 'code-lang'}) => {
  const [value, setValue] = useState<Lang>(getPreferredLang());

  // Keep in sync with global preference changes
  useEffect(() => {
    const handler = (e: any) => {
      const next = e?.detail?.lang as Lang | undefined;
      if (next && next !== value) setValue(next);
    };
    window.addEventListener('sinew:langChange', handler);
    return () => window.removeEventListener('sinew:langChange', handler);
  }, [value]);

  // When user switches tab, persist preference
  const onChange = (nextVal: string) => {
    const next = (nextVal === 'dart' ? 'dart' : 'kotlin') as Lang;
    setValue(next);
    setPreferredLang(next);
  };

  // Ensure we only pass TabItems with our 2 values
  const processedChildren = useMemo(() => {
    return React.Children.toArray(children).filter(Boolean) as React.ReactElement[];
  }, [children]);

  return (
    <Tabs
      groupId={groupId}
      values={[
        {label: 'Kotlin', value: 'kotlin'},
        {label: 'Dart', value: 'dart'},
      ]}
      defaultValue={value}
      onChange={({value: v}) => onChange(v)}
    >
      {processedChildren}
    </Tabs>
  );
};

export {TabItem};
export default LangTabs;
