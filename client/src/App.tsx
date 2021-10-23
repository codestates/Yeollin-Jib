import { BrowserRouter, Route, Switch } from "react-router-dom";
<<<<<<< HEAD
import MobileBar from "./components/MobileBar/MobileBar";
=======
import {
  Body,
  FooterContainer,
  MainContainer,
  HeaderContainer,
} from "./App.style";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
>>>>>>> origin/Feature/GlobalLayout
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
<<<<<<< HEAD
      <Switch>
        <Route path="/mobile" component={MobileBar} />
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
=======
      <MainContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Body>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/main" component={MainPage} />
            <Route path="/detail" component={DetailPage} />
            <Route path="/createpost" component={CreatePostPage} />
            <Route path="/editpost" component={EditPostPage} />
            <Route path="/profile" component={MyPage} />
            <Route path="/editprofile" component={EditProfilePage} />
          </Switch>
        </Body>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </MainContainer>
>>>>>>> origin/Feature/GlobalLayout
    </BrowserRouter>
  );
}

export default App;
