import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    minHeight: 500,
    border: 'gray solid 1px',
  },
});

function SimpleList(props) {
  const { classes, toppings } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <h1>Your Meal</h1>
        {toppings.map(topping => (
          <ListItem divider button>
            <ListItemText primary={topping} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
export default withStyles(styles)(SimpleList);
