import React from 'react';
import OriginalLeftContent from '@theme-original/Navbar/Content/Left';
import VersionSelector from '@site/src/components/VersionSelector';

export default function NavbarLeftContentWrapper(props: any) {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <OriginalLeftContent {...props} />
      {/* Place Version Selector right beside the logo */}
      <div style={{marginLeft: '0.5rem'}}>
        <VersionSelector />
      </div>
    </div>
  );
}
