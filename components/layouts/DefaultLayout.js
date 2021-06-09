import Link from 'next/link';
import Head from 'next/head';

import { ResponsiveHeader } from '../headers/ResponsiveHeader';

export const DefaultLayout = ({
    children,
    title = "Home"
}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header>
                <ResponsiveHeader />
            </header>
            {children}
        </div>
    );
}