import NextDocument, { Html, Head, Main, NextScript } from "next/document";

type Props = {};

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html>
        <Head>
          <title>DOLORVERSE</title>
          <link rel="icon" type="image/x-icon" href="/bw-bao.png" />
          <link href="https://use.typekit.net/lfx3jsx.css" rel="stylesheet" />
          <meta
            property="og:description"
            content="The first in person METAVERSE event of the century"
          />
          <meta property="og:image" content="/og-img.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
