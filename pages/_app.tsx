import "../styles/tailwind.css";
import GlobalStyles from "./../components/GlobalStyles";
import { QueryClient, QueryClientProvider } from "react-query";

import { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
