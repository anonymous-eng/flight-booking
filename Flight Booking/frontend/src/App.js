import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import AdminMain from "./screens/AdminMain/AdminMain";
import UserMain from "./screens/UserMain/UserMain";
import UserLoginScreen from "./screens/UserLoginScreen/LoginScreen";
import UserRegisterScreen from "./screens/UserRegisterScreen/RegisterScreen";
import AdminLoginScreen from "./screens/AdminLoginScreen/LoginScreen";
import AdminRegisterScreen from "./screens/AdminRegisterScreen/RegisterScreen";
import CreateNote from "./screens/SingleNote/CreateNote";

function App() {

  return (
    <Router>
      <Header />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/user/login" component={UserLoginScreen} />
        <Route path="/admin/login" component={AdminLoginScreen} />
        <Route path="/user/register" component={UserRegisterScreen} />
        <Route path="/admin/register" component={AdminRegisterScreen} />
        <Route
          path="/admin/main"
          component={({ history }) => (
            <AdminMain history={history} />
          )}
        />
         <Route
          path="/user/main"
          component={({ history }) => (
            <UserMain history={history} />
          )}
        />
        <Route path="/createflight" component={CreateNote} />;
      </main>
    </Router>
  );
}

export default App;
