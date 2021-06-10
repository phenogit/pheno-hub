import Link from 'next/link';
import Head from 'next/head';


export function Layout({
  children,
  title = 'This is the default title',
}) {
  return (
    <div className="content">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <div className="logo">
            <h1>Pheno Hub</h1>
          </div>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |
          <Link href="/kandan">
            <a>Kandan</a>
          </Link>{' '}
          |
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </nav>
      </header>

      {children}

      <footer>{'I`m here to stay'}</footer>
    </div>
  )
}