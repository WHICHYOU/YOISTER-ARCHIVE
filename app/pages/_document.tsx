import Document, { Html, Head, Main, NextScript } from "next/document";
import "../styles/globals.css"; {/*  Import global styles (Tailwind and custom CSS) */}

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add favicon link here */}
          <link rel="icon" href="/favicon.ico" />

          {/* You can add more custom <head> content here like fonts or meta tags */}
          {/* Example: Adding a custom font */}
          {/* <link rel="stylesheet" href="https:{/* fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" /> */} */}
        </Head>
        <body>
          <Main /> {/* Renders your app's components */}
          <NextScript /> {/* Next.js script injection */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
