import React, { useState, useEffect, useCallback, FC } from 'react';
import { DataRule } from '../../interfaces'
import { usePrevious, handleGetBack } from '../../utils';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import './index.scss';

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
    <div className="detail-container">
    <Card id='rule-detail' className="detail-container__item" sx={{ minWidth: 275 }}>
      <>
      {
        dataRule === undefined ? <CircularProgress /> :
        <textarea className="detail-container__text-area">
          {JSON.stringify(dataRule, undefined, 4)}
        </textarea>
      }
        </>
      <CardActions>
          <Button className="detail-container__button" onClick={handleGetBack} size="small">Atras</Button>
        </CardActions>
    </Card>
    </div>
  );
};

export default BasicModal;