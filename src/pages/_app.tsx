import { type AppType } from "next/app";
import { dark } from "@clerk/themes";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "~/components/ui/Navbar";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>CutzuMojies</title>
        <meta name="description" content="The best place to post emojies on!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClerkProvider
        appearance={{
          variables: {
            borderRadius: "0.25rem",
            colorPrimary: "#64748b",
          },
          baseTheme: dark,
        }}
        {...pageProps}
      >
        <Navbar />
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
