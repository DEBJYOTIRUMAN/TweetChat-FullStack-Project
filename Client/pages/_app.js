import "../styles/globals.css";
import { TweetChatProvider } from "../context/TweetChatContext";
import Head from "next/head";
import Modal from "react-modal";
Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TweetChat</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <TweetChatProvider>
        <Component {...pageProps} />
      </TweetChatProvider>
    </>
  );
}

export default MyApp;
