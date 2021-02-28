import React, { useState } from "react";
import { Button, Grid, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

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
  signUpImage: {
    width: "80%",
    height: "600px",
    objectFit: "cover",
    margin: "auto",
  },
});


const validationSchema = yup.object({
  name: yup
    .string()
    .min(4, "First name should be miniumum 2 characters!")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, "Password should have miniumum 6 characters!")
    .required("Required"),
});

function Register(props) {
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ pwd, setPwd ] = useState();
  
  const data = {name,email,pwd};
  
  const classes = useStyles(props);
  
  const handleRegister = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `http://localhost:5000/admin/register`,
        {
          name: data.name,
          email: data.email,
          password: data.pwd,
        }
      );
      toast.success(response?.data?.message || "Registarion user successfull");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not register user");
    }
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
          <form >
          <TextField 
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField 
            id="outlined-basic" 
            label="email" 
            variant="outlined" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            id="outlined-basic" 
            label="Password" 
            variant="outlined" 
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <Button onClick={()=>handleRegister(data)}>
            Register
          </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
