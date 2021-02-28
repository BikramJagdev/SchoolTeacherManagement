import { React, useEffect ,useState } from "react";
import { Formik, Form, useField } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { Button, Grid, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/action";
import { Redirect, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  mainLogin: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    minWidth: 300,
  },
  loginHeading: {
    textAlign: "left",
    fontSize: "50px",
    fontWeight: "300",
    color: "#333333",
    marginBottom: "20px",
  },
  loginPageImage: {
    width: "90%",
    height: "100%",
    objectFit: "cover",
    margin: "auto",
  },
});


const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, "Password should have miniumum 6 characters!")
    .required("Required"),
});

function LoginPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector((state) => state);
  console.log(isAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = { email, password };

  const handleLogin = async (data) => {
    dispatch(userLogin(data));
    history.push("/Mainpage");
  };

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid
          container
          item
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10 }}
        >
          <div />
           
              <form>
                <Box className={classes.loginHeading}>
                  Login to your account
                </Box>
                <TextField
                  label="Email or Username"
                  name="email"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                <TextField
                  label="Password"
                  name="password"
                  required={true}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                <div style={{ height: 20 }} />
                <Button
                  // disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => handleLogin(data)}
                  >
                  Log in
                </Button>
              </form>
          <div />
        </Grid>
        <Grid item xs={12} sm={6}>
          <img className={classes.loginPageImage} alt="brand" />
        </Grid>
      </Grid>
    </div>
  );
}
// }

export default LoginPage;
