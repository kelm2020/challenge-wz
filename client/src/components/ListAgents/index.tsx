import React, { useState, useEffect, useCallback } from "react";
import { Agents } from '../../interfaces';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { MouseEvent } from "../../interfaces";
import { useNavigate } from 'react-router-dom';

const MultiActionAreaCard = () => {

  const [ agents, setAgents ] = useState<Agents | undefined>(undefined);

  const style = {
    display: 'flex',
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
    cursor: 'pointer'
  };

  const navigate = useNavigate();
  const handleNavigate = (id) => navigate(`/agents/${id}`);

  const handleGetBack = (e: MouseEvent) => {
    e.preventDefault()
    const idString = e.target.id.toString()
    handleNavigate(idString)
  }

  const getAgents = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/agents')
      const data = await response.json()
      setAgents(data.json)
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    agents === undefined && getAgents();
  }, []);
 
  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: '20px' }} >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          agents && agents.data.map((agent)=> {
            return (
              <Grid key={agent.id} item xs={2} sm={4} md={4}>
                  <div
                    id={agent.id}
                    style={style}
                    onClick={handleGetBack}
                  >
                    {agent.name}
                  </div>
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  );
};

export default MultiActionAreaCard;