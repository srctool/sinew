import React, {useCallback, useEffect, useMemo, useState} from 'react';

// Key used for persisting preferred language
const STORAGE_KEY = 'sinewPreferredLang';
export type Lang = 'kotlin' | 'dart';

// Emit a custom event when language changes so other components can sync
function emitLangChange(lang: Lang) {
  try {
    window.dispatchEvent(new CustomEvent('sinew:langChange', {detail: {lang}}));
  } catch (e) {
    // no-op (SSR)
  }
}

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'kotlin';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'kotlin' || saved === 'dart') return saved;
  // Default to Kotlin if nothing saved
  return 'kotlin';
}

// Theme-aware palettes for Infima primary shades per language
// Light and dark variants ensure good contrast in both themes
const PALETTES_LIGHT: Record<Lang, Record<string, string>> = {
  kotlin: {
    '--ifm-color-primary': '#7F52FF',
    '--ifm-color-primary-dark': '#7245F2',
    '--ifm-color-primary-darker': '#683BE8',
    '--ifm-color-primary-darkest': '#562BCF',
    '--ifm-color-primary-light': '#8D65FF',
    '--ifm-color-primary-lighter': '#A082FF',
    '--ifm-color-primary-lightest': '#BCA9FF',
  },
  dart: {
    '--ifm-color-primary': '#0175C2',
    '--ifm-color-primary-dark': '#0169AF',
    '--ifm-color-primary-darker': '#015E9D',
    '--ifm-color-primary-darkest': '#014C80',
    '--ifm-color-primary-light': '#1987CE',
    '--ifm-color-primary-lighter': '#3A9AD7',
    '--ifm-color-primary-lightest': '#6DB7E4',
  },
};

const PALETTES_DARK: Record<Lang, Record<string, string>> = {
  kotlin: {
    // Slightly lighter, more vivid for dark backgrounds
    '--ifm-color-primary': '#9A79FF',
    '--ifm-color-primary-dark': '#8B66FF',
    '--ifm-color-primary-darker': '#7C55FF',
    '--ifm-color-primary-darkest': '#6440E6',
    '--ifm-color-primary-light': '#AF97FF',
    '--ifm-color-primary-lighter': '#C7B9FF',
    '--ifm-color-primary-lightest': '#E1D9FF',
  },
  dart: {
    // Brighter cyan-blue for better contrast in dark theme
    '--ifm-color-primary': '#2BA6FF',
    '--ifm-color-primary-dark': '#1E95EE',
    '--ifm-color-primary-darker': '#1A86D6',
    '--ifm-color-primary-darkest': '#166FB1',
    '--ifm-color-primary-light': '#54B9FF',
    '--ifm-color-primary-lighter': '#82CDFF',
    '--ifm-color-primary-lightest': '#B7E2FF',
  },
};

function buildPaletteCss(lang: Lang): string {
  const light = PALETTES_LIGHT[lang];
  const dark = PALETTES_DARK[lang];
  const lightCss = Object.entries(light)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
  const darkCss = Object.entries(dark)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
  return `:root{${lightCss}} html[data-theme='dark']{${darkCss}}`;
}

export function applyPrimaryPaletteForLang(lang: Lang) {
  if (typeof document === 'undefined') return;
  let styleEl = document.getElementById('lang-primary-palette') as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'lang-primary-palette';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = buildPaletteCss(lang);
}

export function setPreferredLang(lang: Lang) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, lang);
  // Apply the primary palette immediately on change
  applyPrimaryPaletteForLang(lang);
  emitLangChange(lang);
}

export function getPreferredLang(): Lang {
  return getInitialLang();
}

// Language-specific colors to match the homepage Get Started selector
const LANG_COLORS: Record<Lang, string> = {
  kotlin: '#7F52FF', // Kotlin purple
  dart: '#0175C2',   // Dart blue
};

// A small button group to toggle Kotlin/Dart
const LanguageSwitcher: React.FC<{compact?: boolean}> = ({compact = false}) => {
  const [lang, setLang] = useState<Lang>(getInitialLang());

  useEffect(() => {
    // Ensure palette matches current lang on mount and when external changes occur
    applyPrimaryPaletteForLang(lang);
    const handler = (e: any) => {
      const next = e?.detail?.lang as Lang | undefined;
      if (next && next !== lang) setLang(next);
    };
    window.addEventListener('sinew:langChange', handler);
    return () => window.removeEventListener('sinew:langChange', handler);
  }, [lang]);

  const select = useCallback((next: Lang) => {
    setPreferredLang(next);
    setLang(next);
  }, []);

  const classes = useMemo(() => ({
    container: compact ? 'button-group button-group--small' : 'button-group',
    btn: 'button button--secondary',
    activeBase: 'button',
  }), [compact]);

  // Inline styles for the active button to reflect selected language color
  const activeStyle = useMemo<React.CSSProperties>(() => ({
    backgroundColor: LANG_COLORS[lang],
    borderColor: LANG_COLORS[lang],
    color: '#fff',
  }), [lang]);

  return (
    <div className={classes.container} role="group" aria-label="Switch programming language">
      <button
        className={lang === 'kotlin' ? classes.activeBase : classes.btn}
        style={lang === 'kotlin' ? activeStyle : undefined}
        aria-pressed={lang === 'kotlin'}
        onClick={() => select('kotlin')}
      >
        Kotlin
      </button>
      <button
        className={lang === 'dart' ? classes.activeBase : classes.btn}
        style={lang === 'dart' ? activeStyle : undefined}
        aria-pressed={lang === 'dart'}
        onClick={() => select('dart')}
      >
        Dart
      </button>
    </div>
  );
};

export default LanguageSwitcher;
