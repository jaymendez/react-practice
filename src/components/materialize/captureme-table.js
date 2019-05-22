import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import MenuIcon from "@material-ui/icons/Menu";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',  
    display: 'inline-block',
  },
  table: {
    minWidth: 700,
  },
  tableCell: {
    
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Juan Dela Cruz', 159, 6.0, 24, 4.0),
  createData('Pinuno', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Joshua', 305, 3.7, 67, 4.3),
  createData('Lorence Supot', 356, 16.0, 49, 3.9),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper
      justify="center"
      elevation={1}
      className={classes.root}
      style={{ width: "95%" }}
    >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <h2>Name</h2>
            </TableCell>
            <TableCell align="right">
              <h2>Options</h2>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <Button
                  className={classes.menuButton}
                  color="green"
                  aria-label="View"
                  style={{color:"#EABC3D"}}
                > 
                  <Icon>remove_red_eye</Icon>
                </Button>
                <Button
                  className={classes.menuButton}
                  color="primary"
                  aria-label="Create"
                > 
                  <Icon>create</Icon>
                </Button>
                <Button
                  className={classes.menuButton}
                  color="secondary"
                  aria-label="Delete"
                > 
                  <Icon>delete</Icon>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
