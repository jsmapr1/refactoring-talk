import React from 'react';
import MaterialModal from '@material-ui/core/Modal';

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
          {marketingMessage && marketingMessage.image && <img src={marketingMessage && marketingMessage.image} alt="marketing" />
          }
        </div>
      </div>
    </MaterialModal>
  );
}
