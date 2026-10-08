import React from 'react';
import OriginalDocSidebar from '@theme-original/DocSidebar';
import type {Props} from '@theme/DocSidebar';
import LanguageSwitcher from '@site/src/components/LanguageSwitcher';

export default function DocSidebarWrapper(props: Props) {
  return (
    <div className="docSidebarWithSwitcher">
      <div className="sidebarLangSwitcher">
        <div className="sidebarLangLabel">Language</div>
        <LanguageSwitcher compact />
      </div>
      <OriginalDocSidebar {...props} />
    </div>
  );
}
