import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

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
        <div
          style={{
          }}
        >
        <img src={marketingMessage && marketingMessage.image} />
      </div>
      </div>
    </MaterialModal>
  )
}
