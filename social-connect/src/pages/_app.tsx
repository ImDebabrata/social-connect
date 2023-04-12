import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Link href={"/home"}>Home</Link>
      <Link href={"/authenticate"}>Auth</Link>
      <Component {...pageProps} />
    </Provider>
  );
}
