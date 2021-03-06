import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="text-blueGray-900 ">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
