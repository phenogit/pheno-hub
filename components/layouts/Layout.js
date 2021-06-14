import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

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
            <Image src="/logo.png" width={77} height={77} />
            Pheno Hub
          </div>
          <Link href="/"><a>Home</a></Link>
          <Link href="/kandan"><a>Kandan</a></Link>
          <Link href="/blog"><a>Blog</a></Link>
        </nav>
      </header>

      {children}

      <footer>{'Some sexy footer for the future'}</footer>
    </div>
  )
}