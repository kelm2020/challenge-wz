import React, { useState, useEffect, useCallback, FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DataRule, IModal } from '../../interfaces'
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

const BasicModal: FC<IModal> = (({open, handleClose, id}: IModal) => {
  const [ dataRule, setDataRule ] = useState<DataRule | undefined>(undefined);
console.log('id+++', id)
  const handleCloseModal = () => {
    handleClose()
  }

  const get = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/rules/${id}`)
      const jsonResponse = await response.json()
      setDataRule(jsonResponse.data)
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  const prevId = usePrevious(id);

  useEffect(() => {
    if(prevId !== id) {
      get()
    }
  }, [id, prevId]);

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