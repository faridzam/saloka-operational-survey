import React from 'react'
import {CircularProgress} from '@mui/material';

class LoadingSpinner extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <CircularProgress/>
        )
    }
}

export default LoadingSpinner;