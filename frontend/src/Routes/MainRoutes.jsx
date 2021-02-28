import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../Pages/Login";
import Register from "../Pages/Register";
import NavBar from "../Components/NavBar";
import MainPage from "../Pages/MainPage";
import TeacherDetails from "../Pages/TeacherDetails";

function MainRouter() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/Mainpage" exact component={MainPage} />
        <Route
          path={`/teacher/:id`}
          exact
          render={(props) => <TeacherDetails {...props} />}
        />
      </Switch>
    </>
  );
}
export default MainRouter;
