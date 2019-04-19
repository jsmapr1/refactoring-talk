import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    minHeight: 500,
    border: 'gray solid 1px',
    '& h1': {
      margin: 0,
      padding: '1em 0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}




function SimpleList(props) {
  const { classes, onClick, options } = props;
  return (
    <div className={classes.root}>
    <List component="nav">
    <h1>Options</h1>
    {
      options.map(([sub, optionGroup]) => (
        <div>
        <ListSubheader>{sub}</ListSubheader>
        {optionGroup.map(option => (
          <ListItem
          onClick={() => onClick(option.name)}
          button
          divider
          >
          <AddCircleIcon />
          <ListItemText primary={option.name} />
          </ListItem>
        ))}
        </div>
      ))
    }
    </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
