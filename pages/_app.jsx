import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckAuth from "../context/checkAuth";
import { UserContextProvider } from "../context/userContext";
import "../styles/globals.css";
import "../components/player/player.scss";

export default function MyApp({ Component, ...pageProps }) {
  const client = new QueryClient();
  return (
    <UserContextProvider>
      <CheckAuth>
        <QueryClientProvider client={client}>
          <Component {...pageProps} />
          <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </QueryClientProvider>
      </CheckAuth>
    </UserContextProvider>
  );
}
