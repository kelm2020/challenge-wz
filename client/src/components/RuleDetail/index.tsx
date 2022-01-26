import React, { useState, useEffect, useCallback, FC } from 'react';
import Box from '@mui/material/Box';
import { DataRule } from '../../interfaces'
import { usePrevious } from '../../utils/usePrevious';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

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

const BasicModal: FC= () => {

  const [ dataRule, setDataRule ] = useState<DataRule | undefined>(undefined);

  const params = useParams();
  const { id } = params;
 
  const get = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/rules/${id}`)
      const jsonResponse = await response.json()
      setDataRule(jsonResponse)
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  const prevId = usePrevious(id);

  useEffect(() => {
    if (dataRule === undefined) {
      get()
    }
  }, [dataRule]);

  return (
    <Box id='detail-rule' sx={style}>
      {
        dataRule === undefined ? <CircularProgress /> :
        <textarea style={styleTextArea}>
          {JSON.stringify(dataRule, undefined, 4)}
        </textarea>
      }
    </Box>
  );
};

export default BasicModal;