import React, { useState, useEffect, useCallback, FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DataRule, IRuleModal } from '../../interfaces'
import { usePrevious } from '../../utils/usePrevious';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const styleTextArea = { width: '100%', height: '400px' };

const BasicModal: FC<IRuleModal> = (({open, handleClose, dataRule}: IRuleModal) => {

console.log('data rule', dataRule)
  const handleCloseModal = () => {
    handleClose()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            <textarea style={styleTextArea}>
              {JSON.stringify(dataRule, undefined, 4)}
            </textarea>
          }
        </Box>
      </Modal>
    </div>
  );
})

export default BasicModal;