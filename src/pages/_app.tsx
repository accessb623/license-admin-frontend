import '../styles/globals.css'; // ✅ or '@/styles/globals.css' if using a tsconfig alias
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
