import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../src/components/Layout/Layout";
import { PlayerProvider } from "../src/context/PlayerContext";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <PlayerProvider>
        <Component {...pageProps} />
      </PlayerProvider>
    </Layout>
  );
}
export default MyApp;
