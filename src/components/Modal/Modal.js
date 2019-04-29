import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

export default function Modal({ open, onClose, marketingMessage }) {
  return (
    <MaterialModal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
    >
      <div style={marketingMessage && marketingMessage.getModalStyle()}>
        <h1>{marketingMessage && marketingMessage.text}</h1>
        <img src={marketingMessage && marketingMessage.image} />
      </div>
    </MaterialModal>
  )
}
