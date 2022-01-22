import React, { useState, useEffect, useCallback, FC } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DataAgent } from '../../interfaces'
import { usePrevious } from '../../utils/usePrevious';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface IAgent {
  open: boolean
  handleClose: () => void
  id: string
}

const BasicModal: FC<IAgent> = (({open, handleClose, id}: IAgent) => {
  const [ dataAgent, setDataAgent ] = useState<DataAgent | undefined>(undefined);
  console.log('id++', id)

  const handleCloseModal = () => {
    handleClose()
  }

  const getAgent = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/agents/${id}`)
      const data = await response.json()
      console.log(data,'s')
      setDataAgent(data.data)
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  const prevId = usePrevious(id);

  useEffect(() => {
    if(prevId !== id) {
      getAgent()
    }
  }, [getAgent, id, prevId]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {dataAgent === undefined ? 
            <CircularProgress />
            : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {dataAgent && `id: ${dataAgent.id}`}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {dataAgent && `name: ${dataAgent.name}`}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {dataAgent && `ip: ${dataAgent.ip}`}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {dataAgent && `total_alerts: ${dataAgent.total_alerts}`}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
})

export default BasicModal;