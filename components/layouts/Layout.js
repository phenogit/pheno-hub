import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export function Layout({ children, title = "This is the default title" }) {
  return (
    <div className="content">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <div className="logo cursor">
              <Image src="/logo.png" width={33} height={33} />
              Pheno Hub
            </div>
          </Link>

          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/kandan">
            <a>Kandan</a>
          </Link>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </nav>
      </header>

      {children}

      <footer>
        <Image src="/email.png" width={314} height={23} />
      </footer>
    </div>
  );
}
