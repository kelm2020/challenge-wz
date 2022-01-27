import React, { useState, useEffect, useCallback, FC } from 'react';
import { DataRule } from '../../interfaces'
import { usePrevious, handleGetBack } from '../../utils';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

const style = {
  width: '100%',
  maxWidth: '800px',
  maxHeight: '800px',
  border: '2px solid #000',
  borderRadius: '8px',
  marginLeft: 'auto',
  marginRight: 'auto'
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
    if(prevId !== id) {
      get()
    }
  }, [id, prevId]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
    <Card id='detail-rule' style={style} sx={{ minWidth: 275 }}>
      <>
      {
        dataRule === undefined ? <CircularProgress /> :
        <textarea style={styleTextArea}>
          {JSON.stringify(dataRule, undefined, 4)}
        </textarea>
      }
        </>
      <CardActions>
          <Button onClick={handleGetBack} size="small">Atras</Button>
        </CardActions>
    </Card>
    </div>
  );
};

export default BasicModal;