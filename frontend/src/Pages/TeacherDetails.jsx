import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "150px auto 20px auto",
  },
  media: {
    height: 140,
  },
  table: {
    minWidth: 650,
  },
  margin: {
    marginLeft: "25%",
  },
});

function TeacherDetails(props) {
  const [user, setUser] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getDetails();
  }, []);
  console.log(user);

  const getDetails = () => {
    let id = props.match.params.id;
    axios
      .get(`http://localhost:5000/admin/teacherId?id=${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {user.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h3">
              Age:{user.age}
            </Typography>
            <Typography gutterBottom variant="h5" component="h3">
              Gender: {user.gender}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Grid container className={classes.margin}>
        <Grid item lg={6}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Grade</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Subject</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.classes &&
                  user.classes.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.grade}</TableCell>
                      <TableCell>{row.section}</TableCell>
                      <TableCell>{row.subject}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
export default TeacherDetails;
