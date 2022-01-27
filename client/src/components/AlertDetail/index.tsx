import React, { useState, useEffect, useCallback, FC } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { CircularProgress } from '@material-ui/core';
import { Alerts } from '../../interfaces'
import { usePrevious, handleGetBack } from '../../utils';
import { useParams } from 'react-router-dom';

import './index.scss';

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
    <div className="detail-container">
      <Card id='alert-detail' className="detail-container__item" sx={{ minWidth: 275 }}>
        <>
          {
            dataAlert === undefined ? <CircularProgress /> :
            <textarea className="detail-container__text-area">
              {JSON.stringify(dataAlert, undefined, 4)}
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

export default AlertModal;