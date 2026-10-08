import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

import React, {useEffect, useRef, useState} from 'react';
import {getPreferredLang, setPreferredLang, Lang, applyPrimaryPaletteForLang} from '@site/src/components/LanguageSwitcher';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [lang, setLang] = useState<Lang>('kotlin');
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initial = getPreferredLang();
    setLang(initial);
    // Ensure the global Infima primary color reflects the stored language on first load
    applyPrimaryPaletteForLang(initial);
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const selectLang = (value: Lang) => {
    setLang(value);
    setPreferredLang(value);
    setOpen(false);
  };

  const langColor = lang === 'kotlin' ? '#7F52FF' : '#0175C2';

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className={styles.getStartedRow}>
          <div ref={menuRef} className={styles.jbSplit}>
            <Link
              className={clsx(styles.jbBtn, styles.jbLeft)}
              to="/guide"
            >
              Get Started with
            </Link>
            <button
              type="button"
              className={clsx(styles.jbBtn, styles.jbRight)}
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={clsx(lang === 'kotlin' ? styles.langKotlin : styles.langDart)} style={{textTransform: 'capitalize'}}>{lang}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            {open && (
              <div
                role="menu"
                aria-label="Select language"
                className={styles.jbMenu}
              >
                <button
                  role="menuitemradio"
                  aria-checked={lang === 'kotlin'}
                  onClick={() => selectLang('kotlin')}
                  className={styles.jbMenuItem}
                >
                  Kotlin {lang === 'kotlin' ? '✓' : ''}
                </button>
                <button
                  role="menuitemradio"
                  aria-checked={lang === 'dart'}
                  onClick={() => selectLang('dart')}
                  className={styles.jbMenuItem}
                >
                  Dart {lang === 'dart' ? '✓' : ''}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Sinew contributor docs: the architecture, every package, and their Kotlin and Flutter implementations.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
