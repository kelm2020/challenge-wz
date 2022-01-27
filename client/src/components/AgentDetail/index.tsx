import React, { useState, useEffect, useCallback, FC } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { DataAgent, IDetail } from '../../interfaces'
import { usePrevious } from '../../utils';

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

const AgentModal: FC<IDetail> = ({eventHandler}: IDetail) => {
  const [ dataAgent, setDataAgent ] = useState<DataAgent | undefined>(undefined);

  const params = useParams();
  const { id } = params;
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
      <Card style={style} sx={{ minWidth: 275 }}>
        <>
          {
            dataAgent === undefined ? <CircularProgress /> :
            <textarea style={styleTextArea}>
              {JSON.stringify(dataAgent, undefined, 4)}
            </textarea>
          }
        </>
        <CardActions>
          <Button onClick={eventHandler} size="small">Atras</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AgentModal;