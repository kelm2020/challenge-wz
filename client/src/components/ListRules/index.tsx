import React, { useState, useCallback, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { MouseEventImg, Rule } from "../../interfaces";
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import './index.scss';

function TitlebarImageList() {

  const [ rules, setRules ] = useState<Rule | undefined>(undefined);

  const navigate = useNavigate();
  const handleNavigate = (id) => navigate(`/rules/${id}`);

  const handleGetBack = (e: MouseEventImg) => {
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
      <ImageList className="list" cols={3}>
      {rules.data && rules.data.map((item) => (
        <ImageListItem key={item.id}>
          <img
            id={item.id}
            src={"imagewz.jpeg"}
            alt={item.name}
            onClick={handleGetBack}
            loading="lazy"
            className="list__image"
          />
          <ImageListItemBar
            title={item.id}
            subtitle={item.description}
            className="list__image-description"
          />
        </ImageListItem>
      ))}
    </ImageList>
    )
  );
}

  export default TitlebarImageList;
