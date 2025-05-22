import Head from "next/head";

export default function MetaHead({ title }: { title: string }) {
  return (
    <Head>
      <title>{title} | Yoister</title>
      <meta name="description" content="You are what you choose. Yoister is your identity mirror through micro-decisions." />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/logo-dark.svg" />
      <meta property="og:site_name" content="Yoister" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}