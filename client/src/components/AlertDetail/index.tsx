import React, { useState, useEffect, useCallback, FC } from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from '@material-ui/core';
import { Alerts } from '../../interfaces'
import { usePrevious } from '../../utils/usePrevious';
import { useParams } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '61%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  maxHeight: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const styleTextArea = { width: '100%', height: '400px' };

const AlertModal: FC = () => {
  const [ dataAlert, setDataAlert ] = useState<Alerts | undefined>(undefined);

  const params = useParams();
  const { id } = params;
 
  const get = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/alerts/${id}`)
      const jsonResponse = await response.json()
      setDataAlert(jsonResponse.data)
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
        dataAlert === undefined ? <CircularProgress /> :
        <textarea style={styleTextArea}>
          {JSON.stringify(dataAlert, undefined, 4)}
        </textarea>
      }
    </Box>
  );
};

export default AlertModal;