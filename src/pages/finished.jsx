import React from "react";
import axios from 'axios';
import images from '../assets/images';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Box, Button, Typography, CircularProgress, Fade} from '@mui/material';
import {withRouter} from '../withRouter';
import '../styles/finished.css';
import { fontWeight } from "@mui/system";


class Finished extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            owner: null,
            user: null,
        }
    }

    componentDidMount() {
        this.setState({
            owner: this.props.router.location.state.owner,
        }, () => {
            //submit
            const { owner } = this.state;

            axios.post('http://'+process.env.REACT_APP_SERVER+':'+process.env.REACT_APP_SERVER_PORT+'/api/survey/getCustomerById', { owner })
            .then((res) => {
                this.setState({
                    user: res.data.name.split(" ")[0],
                });
            }).catch((error) => {
                console.log(error);
            });
        });
    }
    
    componentWillUnmount() { 
        this.setState({
            loaded: null,
            owner: null,
            user: null,
        });
    }

    render(){
        const {owner, user, loaded} = this.state;
        return(
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{
                minHeight: '100vh',
                overflow: 'hidden',
            }}>
                <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: '#444',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flexWrap: 'wrap'
                }}>
                    <Box
                    sx={{
                        width: '100%',
                        height: '250px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {loaded === true ? null : <CircularProgress/>}
                        <Fade in={loaded}>
                            <img
                            style={this.state.loaded ? {transform: 'translate(-20px, 0px)',} : {display: 'none'}}
                            src={images.loka_finished}
                            height="250px" alt="loka"
                            onLoad={() => this.setState({loaded: true})}/>
                        </Fade>
                    </Box>
                    <Fade in={loaded}>
                        <Box
                        sx={{
                            marginTop: '30px',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <p
                            style={{
                                textAlign: 'center',
                                color: 'white'
                            }}>Terimakasih, </p>
                            <p
                            style={{
                                textAlign: 'center',
                                color: 'white',
                                fontWeight: 700
                            }}>{user} 👍</p>
                        </Box>
                    </Fade>
                </Box>
            </Grid>
        )
    }
}

export default withRouter(Finished);