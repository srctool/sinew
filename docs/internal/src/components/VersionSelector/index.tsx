import React, {useEffect, useMemo, useState, useRef} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {getPreferredLang, type Lang} from '@site/src/components/LanguageSwitcher';

// Persist selected documentation version per language
const STORAGE_KEY = 'sinewDocVersion'; // value stored as JSON: { kotlin: 'x', dart: 'y' }

function loadStored(): Record<Lang, string | undefined> {
  if (typeof window === 'undefined') return {kotlin: undefined, dart: undefined};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {kotlin: undefined, dart: undefined};
  } catch {
    return {kotlin: undefined, dart: undefined};
  }
}

function saveStored(map: Record<Lang, string | undefined>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // no-op
  }
}

export default function VersionSelector() {
  const {siteConfig} = useDocusaurusContext();
  const versions = (siteConfig.customFields as any)?.libraryVersions as
    | {kotlin?: string[]; dart?: string[]}
    | undefined;

  const [lang, setLang] = useState<Lang>(getPreferredLang());
  const [selected, setSelected] = useState<Record<Lang, string | undefined>>(() => loadStored());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onLang = (e: any) => {
      const next = e?.detail?.lang as Lang | undefined;
      if (next && next !== lang) setLang(next);
    };
    window.addEventListener('sinew:langChange', onLang);
    return () => window.removeEventListener('sinew:langChange', onLang);
  }, [lang]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const currentList: string[] = useMemo(() => {
    const list = (versions?.[lang] ?? []) as string[];
    // Ensure at least one item to avoid empty UI
    if (!list || list.length === 0) return ['latest'];
    return list;
  }, [versions, lang]);

  const active = selected[lang] ?? currentList[0];

  const choose = (v: string) => {
    const next = {...selected, [lang]: v};
    setSelected(next);
    saveStored(next);
    setOpen(false);
  };

  // Simple, theme-friendly styles using Infima tokens
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };
  // Use minimal inline styles; rely on Infima button classes for visibility
  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    lineHeight: 1.2,
    cursor: 'pointer',
  };
  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    right: 0,
    background: 'var(--ifm-background-surface-color)',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '0.4rem',
    minWidth: '160px',
    boxShadow: 'var(--ifm-global-shadow-md)',
    zIndex: 1000,
  };
  const itemStyle: React.CSSProperties = {
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  return (
    <div className="navbar__item" ref={ref} style={{marginLeft: '0.5rem'}}>
      <div style={wrapperStyle}>
        <button
          type="button"
          className="button button--sm button--secondary"
          style={btnStyle}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          title="Select documentation version"
        >
          <span style={{opacity: 0.7}}>Version:</span>
          <strong>{active}</strong>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </button>
        {open && (
          <div role="listbox" style={menuStyle}>
            {currentList.map((v) => (
              <div
                key={v}
                role="option"
                aria-selected={v === active}
                style={{
                  ...itemStyle,
                  background: v === active ? 'var(--ifm-menu-color-background-active)' : 'transparent',
                  color: v === active ? 'var(--ifm-menu-color-active)' : 'inherit',
                }}
                onClick={() => choose(v)}
              >
                {v}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
