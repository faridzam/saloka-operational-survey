import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export default function customPageThumb(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <p 
        className="page-label">
          1
        </p>
      </SliderThumb>
    );
  }
  
  customPageThumb.propTypes = {
    children: PropTypes.node,
  };