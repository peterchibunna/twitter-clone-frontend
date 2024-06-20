import {Provider} from "react-redux";
import {store} from "./index";
import {persistStore} from "redux-persist";
import {ReactNode} from "react";

persistStore(store);

export default function ReduxProvider({children}: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
