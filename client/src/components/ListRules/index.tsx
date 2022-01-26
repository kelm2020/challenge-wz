// import React, { useState, useEffect, useCallback } from "react";
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { useNavigate } from "react-router-dom";
// import { Style, MouseEvent, Rule } from '../../interfaces'

// const MultiActionAreaCard = () => {

//   const [ rules, setRules ] = useState<Rule | undefined>(undefined);

//   const style: Style = {
//     display: 'flex',
//     flexDirection: 'column',
//     background: 'linear-gradient(45deg, rgba(0,102,243,1) 0%, rgba(43,66,100,1) 100%)', 
//     borderRadius: '8px',
//     color: "white",
//     width: '100%',
//     height: '100%',
//     minHeight: '60px',
//     boxShadow: '0 1px 5px 2px rgba(0,0,0,.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontWeight: '600',
//     fontSize: '20px',
//     cursor: 'pointer',
//     lineHeight: '1.1'
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//         {
//           rules && rules.data.map((rule)=> {
//             return (
//               <Grid key={rule.id} item xs={2} sm={4} md={4}>
//                   <div
//                     id={rule.id}
//                     style={style}
//                     onClick={handleOnClick}
//                   > 
//                     <div>{rule.id}</div>
//                     <div>{rule.description}</div>
//                   </div>
//               </Grid>
//             )
//           })
//         }
//       </Grid>
//     </Box>
//   );
// };

// export default MultiActionAreaCard;

import React, { useState, useCallback, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { MouseEventImg, Rule } from "../../interfaces";
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

function TitlebarImageList() {

  const [ rules, setRules ] = useState<Rule | undefined>(undefined);

  const navigate = useNavigate();
  const handleNavigate = (id) => navigate(`/rules/${id}`);

  const handleOnClick = (e: MouseEventImg) => {
    e.preventDefault()
    const idString = e.target.id.toString()
    handleNavigate(idString)
  }

  const getRules = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/rules')
      const data = await response.json()
      setRules(data)
    } catch (e) {
      console.error(e);
    }
  }, []);
  
  useEffect(() => {
    rules === undefined && getRules();
  }, []);

  return (
    rules === undefined ? <CircularProgress /> : (
      <ImageList style={{ padding: '20px' }} cols={3}>
      {rules.data && rules.data.map((item) => (
        <ImageListItem key={item.id}>
          <img
            id={item.id}
            src={"imagewz.jpeg"}
            alt={item.name}
            onClick={handleOnClick}
            loading="lazy"
            style={{ borderRadius: '8px', cursor: 'pointer' }}
          />
          <ImageListItemBar
            title={item.id}
            subtitle={item.description}
            style={{ borderBottomRightRadius: '8px', borderBottomLeftRadius: '8px' }}
          />
        </ImageListItem>
      ))}
    </ImageList>
    )
  );
}

  export default TitlebarImageList;
