import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: "50px",
  },
  // paper: {
  //   padding: theme.spacing.unit * 2,
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // },
  container: {
    display: "flex",
  },
  paper: {
    height: 200,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});

function GridComp(props) {
  const { classes } = props;

  return (
    // <div className={classes.root}>
    //   <Grid container spacing={32}>
    //     <Grid item xs={12}>
    //       <Paper className={classes.paper}>xs=12</Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classes.paper}>xs=6</Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classes.paper}>xs=6</Paper>
    //     </Grid>
    //     <Grid item xs={3}>
    //       <Paper className={classes.paper}>xs=3</Paper>
    //     </Grid>
    //     <Grid item xs={3}>
    //       <Paper className={classes.paper}>xs=3</Paper>
    //     </Grid>
    //     <Grid item xs={3}>
    //       <Paper className={classes.paper}>xs=3</Paper>
    //     </Grid>
    //     <Grid item xs={3}>
    //       <Paper className={classes.paper}>xs=3</Paper>
    //     </Grid>
    //   </Grid>
    // </div>

    <div className={classes.container}>
      <Grid container spacing={32} justify="flex-start">
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={classes.paper}>
            <h1>{1}</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={classes.paper}>
            <h1>{2}</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={classes.paper}>
            <h1>{3}</h1>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

GridComp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridComp);
