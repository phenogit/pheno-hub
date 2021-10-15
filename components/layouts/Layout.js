import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/client";

export function Layout({ children, title = "This is the default title" }) {
  const [session] = useSession();
  console.log("SESSION", session);

  const handleLogin = (e) => {
    e.preventDefault();
    signIn("github");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

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
          {session ? (
            <>
              | {session.user.github.name}
              {
                <Image
                  src={session.user.github.avatar}
                  width={30}
                  height={30}
                />
              }
              <a href="#" onClick={handleLogout}>
                | Logout
              </a>
            </>
          ) : (
            <a href="#" onClick={handleLogin}>
              | Login
            </a>
          )}
        </nav>
      </header>

      {children}

      <footer>
        <Image src="/email.png" width={314} height={23} />
      </footer>
    </div>
  );
}
