import React, { useState, useEffect, useCallback } from "react";
import { Rule } from '../../interfaces'
import Modal from '../RuleModal'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Style, MouseEvent } from '../../interfaces'

const MultiActionAreaCard = () => {

  const [ rules, setRules ] = useState<Rule | undefined>(undefined);
  const [ idRule, setIdRule ] = useState('');
  const [ open, setOpen ] = useState(false);

  const style: Style = {
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(45deg, rgba(0,102,243,1) 0%, rgba(43,66,100,1) 100%)', 
    borderRadius: '8px',
    color: "white",
    width: '100%',
    height: '100%',
    minHeight: '60px',
    boxShadow: '0 1px 5px 2px rgba(0,0,0,.2)',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    fontSize: '20px',
    cursor: 'pointer',
    lineHeight: '1.1'
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOnClick = (e: MouseEvent) => {
    e.preventDefault()
    console.log('idrule', e.target.id)
    const idString = e.target.id.toString()
    setIdRule(idString)
    handleOpen()
  }

  const getRules = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/rules')
      const data = await response.json()
      console.log(data,'hola')
      setRules(data)
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    rules === undefined && getRules();
  }, [rules]);
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          rules && rules.data.map((rule)=> {
            return (
              <Grid key={rule.id} item xs={2} sm={4} md={4}>
                  <div
                    id={rule.id}
                    style={style}
                    onClick={handleOnClick}
                  > 
                    <div>{rule.id}</div>
                    <div>{rule.description}</div>
                  </div>
              </Grid>
            )
          })
        }
      </Grid>
      <Modal open={open} handleClose={handleClose} id={idRule} />
    </Box>
  );
}

  export default MultiActionAreaCard;
