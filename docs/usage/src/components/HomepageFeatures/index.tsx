import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Stop rewriting the plumbing',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Response mapping, results, errors, paging, the HTTP client with token refresh and secure storage,
        shipped once as small packages. Sinew ships the mechanism; your app ships the configuration.
        See the <Link to="/docs">Introduction</Link>.
      </>
    ),
  },
  {
    title: 'Errors you can trace',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Every failure becomes a typed exception with a code like <code>ORD-R-GO-NIC</code>, localized at display time,
        and reported when it's a bug. Details in the contributor docs.
      </>
    ),
  },
  {
    title: 'Kotlin and Flutter alike',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        The same concepts on Kotlin Multiplatform and Flutter, with names that follow each platform's tools.
        Pick your language in the sidebar to see its implementation. Start with the <Link to="/docs">Introduction</Link>.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
