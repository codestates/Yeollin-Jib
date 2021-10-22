import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreatePostPage from "./pages/MainPage/CreatePostPage/CreatePostPage";
import DetailPage from "./pages/MainPage/DetailPage/DetailPage";
import EditPostPage from "./pages/MainPage/EditPostPage/EditPostPage";
import MainPage from "./pages/MainPage/MainPage/MainPage";
import EditProfilePage from "./pages/MyPage/EditProfilePage/EditProfilePage";
import MyPage from "./pages/MyPage/MyPage/MyPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/main" component={MainPage} />
        <Route path="/detail" component={DetailPage} />
        <Route path="/createpost" component={CreatePostPage} />
        <Route path="/editpost" component={EditPostPage} />
        <Route path="/profile" component={MyPage} />
        <Route path="/editprofile" component={EditProfilePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
