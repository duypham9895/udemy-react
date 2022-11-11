import { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import GuardedRoute from "./routes/GuardedRoute";
import AuthContext from "./store/auth-context";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact children={<HomePage />} />
        <GuardedRoute
          path="/auth"
          component={AuthPage}
          isAuthenticated={!isLoggedIn}
        />
        <GuardedRoute
          path="/profile"
          component={UserProfile}
          isAuthenticated={isLoggedIn}
        />
      </Switch>
    </Layout>
  );
}

export default App;
