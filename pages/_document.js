import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gray-950 text-white font-cairo antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
