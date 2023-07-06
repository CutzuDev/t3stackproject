import { type AppType } from "next/app";
import { dark } from "@clerk/themes";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "~/components/ui/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
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
  );
};

export default api.withTRPC(MyApp);
