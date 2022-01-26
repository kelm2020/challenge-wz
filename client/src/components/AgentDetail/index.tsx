import React, { useState, useEffect, useCallback, FC } from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from '@material-ui/core';
import { DataAgent } from '../../interfaces'
import { usePrevious } from '../../utils/usePrevious';
import { useParams } from 'react-router-dom';

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

const AgentModal: FC = () => {
  const [ dataAgent, setDataAgent ] = useState<DataAgent | undefined>(undefined);

  const params = useParams();
  console.log('params', params);
  const { id } = params;
 
  console.log('id+++', id)

  const get = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/agents/${id}`)
      const jsonResponse = await response.json()
      setDataAgent(jsonResponse.data)
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
    <Box sx={style}>
      {
        dataAgent === undefined ? <CircularProgress /> :
        <textarea style={styleTextArea}>
          {JSON.stringify(dataAgent, undefined, 4)}
        </textarea>
      }
    </Box>
  );
};

export default AgentModal;