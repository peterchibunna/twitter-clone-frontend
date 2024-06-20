import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {Signup} from "./pages/auth/signup.tsx";
import {Login} from "./pages/auth/login.tsx";
import {ChangePassword} from "./pages/auth/change-password.tsx";
// import {Tweets} from "./pages/tweets";
import {PersonalTweets} from "./pages/tweets/personal.tsx";
import {SharedTweets} from "./pages/tweets/shared.tsx";
import {WriteTweet} from "./pages/tweets/write.tsx";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/route";
import {Home} from "./pages/home";
import {Toaster} from "react-hot-toast";
import ReduxProvider from "./store/redux-provider";

function App() {
  return (
    <Router>
      <ReduxProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/auth/signup" element={<Signup/>}/>
            <Route path="/auth/login" element={<Login/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path="/auth/change-password" element={<ChangePassword/>}/>
              {/*<Route path="/tweets" element={<Tweets/>}/>*/}
              <Route path="/tweets/personal" element={<PersonalTweets/>}/>
              <Route path="/tweets/shared" element={<SharedTweets/>}/>
              <Route path="/tweets/write" element={<WriteTweet/>}/>
            </Route>
          </Routes>
          <div><Toaster position="bottom-center" reverseOrder={false}/></div>
        </AuthProvider>
      </ReduxProvider>
    </Router>
  )
}

export default App
