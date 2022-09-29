import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import { Provider } from "react-redux";
import store from "../app/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
