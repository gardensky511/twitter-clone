import React from "react";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import { HashRouter, Route, Switch } from "react-router-dom";

// HashRouter
// URL의 hash를 활용한 라우터. 정적인(static)페이지에 적합
// 검색엔진이 못찾음

// BrowserRouter
// HTML5의 history API를 활용하여 UI를 업데이트
// 동적인 페이지 제작엔 이게 보편적

const AppRouter = ({ isLoggedIn }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation />}
      <Switch>
        {/* exact를 사용하면 path가 매칭될 경우 하위 라우트 설정 안보게 됨 */}
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
};

export default AppRouter;
