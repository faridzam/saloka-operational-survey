import React from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import images from '../assets/images';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Box, Slider, Paper, Button, TextField, Typography, Fade, CircularProgress} from '@mui/material';
import { SliderThumb } from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import {withRouter} from '../withRouter';
import '../styles/satisfaction.css';

class Satisfaction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            page: null,
            progress: null,
            question: null,
            owner: null,
            rides: null,
            facilities: null,
            hospitality: null,
            services: null,
            equivalence: null,
            notes: null,
            isNotesFormValid: true,
        };
    }

    componentDidMount() {
        this.setState({
            owner: this.props.router.location.state.owner,
            page: this.props.router.location.state.page,
            progress: this.props.router.location.state.progressBefore,
            question: this.props.router.location.state.question
        });
        setTimeout(function() { //Start the timer
            this.setState({
                progress: this.props.router.location.state.progress,
            });
        }.bind(this), 200)
    }
    
    componentWillUnmount() { 
        this.setState({
            page: null,
            progress: null,
            question: null
        });
    }

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        if (e.target.name === "notes") {
            if (!e.target.value) {
                this.setState({ isNotesFormValid: false });
            } else {
                this.setState({ isNotesFormValid: true });
            }
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { owner, rides, facilities, hospitality, services, equivalence, notes, loaded } = this.state;

        if (notes) {
            axios.post('http://'+process.env.REACT_APP_SERVER+':'+process.env.REACT_APP_SERVER_PORT+'/api/survey/satisfaction', { owner, rides, facilities, hospitality, services, equivalence, notes })
            .then((res) => {
                this.props.router.navigate('/visit', { state: {
                    owner: res.data.owner,
                    page: 1,
                    progress: 1,
                    progressBefore: 0,
                    question: "Sudah berapa kali anda berkunjung ke saloka?",
                    options: [
                        {
                            value: 1,
                            text: "1 kali"
                        },
                        {
                            value: 2,
                            text: "2 kali"
                        },
                        {
                            value: 3,
                            text: "> 2 kali"
                        },
                    ],
                }});
            }).catch((error) => {
                //catch the error
                console.log(error);
            });
        } else {
            if (!notes) {
                this.setState({ isNotesFormValid: false });
            }
        }
        
    }

    onReview(event, value) {

        if (this.state.page === 1) {
            this.setState({
                rides: value,
                page: 2,
                progress: 33,
                question: "Bagaimana fasilitas dan kebersihan area kami?(fasum, resto, dll)"
            });
        }
        else if (this.state.page === 2) {
            this.setState({
                facilities: value,
                page: 3,
                progress: 50,
                question: "Bagaimana keramahtamahan karyawan kami?"
            });
        }
        else if (this.state.page === 3) {
            this.setState({
                hospitality: value,
                page: 4,
                progress: 67,
                question: "Bagaimana pelayanan kami secara keseluruhan?"
            });
        }
        else if (this.state.page === 4) {
            this.setState({
                services: value,
                page: 5,
                progress: 83,
                question: "Apakah harga tiket sesuai dengan kualitas kami?"
            });
        }
        else if (this.state.page === 5) {
            this.setState({
                equivalence: value,
                page: 6,
                progress: 100,
                question: "Tuliskan komentar anda tentang saloka!"
            });
        }
    }

    render(){
        const {page, progress, progressBefore, question, owner, rides, facilities, hospitality, services, equivalence, notes, isNotesFormValid, loaded} = this.state;

        return(
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{
                overflow: 'hidden',
            }}>
            {loaded === true ? null : 
                <Box
                sx={{
                    position: 'absolute',
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    margin: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '1000'
                }}>
                    <CircularProgress style={{'color': 'primary.main'}}/>
                </Box>
            }
            <Box
                sx={{
                    width: '100%',
                    height: '35vh',
                    minHeight: '250px',
                    backgroundColor: 'secondary.main',
                    borderBottomRightRadius: '25%',
                    borderBottomLeftRadius: '25%',
                    boxShadow: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap'
                }}>
                    <Box
                    sx={{
                        marginTop: '10px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Fade in={loaded}>
                            <img
                            style={this.state.loaded ? {} : {display: 'none'}}
                            src={images.loka_satisfaction}
                            height="100px" alt="loka"
                            onLoad={() => this.setState({loaded: true})}/>
                        </Fade>
                    </Box>
                    <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Fade in={loaded}>
                            <Slider
                                sx={{
                                    maxWidth: '500px',
                                    height: '15px',
                                    'span.MuiSlider-rail': {color: 'primary.lightest'},
                                    'span.MuiSlider-track': {color: 'primary.main'},
                                    'span.MuiSlider-thumb': {width: '30px', height: '30px', color: 'primary.dark', overflow: 'hidden'},
                                    '& span.MuiSlider-thumb > p.page-label': {color: 'secondary.lightest', fontSize: '18px', fontWeight: 600},
                                }}
                                components={{
                                    Thumb: customPageThumb,
                                    ValueLabel: ValueLabelComponent,
                                }}
                                componentsProps={{
                                    page: {page},
                                    progress: {progress}
                                }}
                                value={progress}
                            />
                        </Fade>
                    </Box>
                    <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Fade in={loaded}>
                            <h2 
                            className="title"
                            style={{
                                textAlign: 'center', 
                                color: '#444', 
                                margin: 0, 
                                padding: 0, 
                                maxWidth: '400px', 
                            }}>Silahkan Berikan Penilaian Atas Pengalaman Anda di Saloka</h2>
                        </Fade>                        
                    </Box>
                    {/*<Box
                    sx={{
                        marginTop: '10px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Fade in={loaded}>
                            <p className="subtitle" style={{textAlign: 'center', color: '#444', margin: 0, padding: 0, maxWidth: '400px'}}>masukan anda sangat penting bagi kami</p>
                        </Fade>
                    </Box> */}
                </Box>

                <Box
                sx={{
                    width: '100%',
                    height: '50px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Fade in={loaded}>
                        <p className="question" style={{fontWeight: 700, textAlign: 'center', color: '#444'}}>{question}</p>
                    </Fade>
                </Box>
                {page === 6
                    ? <Fade in={loaded && page === 6}>
                    <Paper
                    elevation={2}
                    sx={{
                        marginBottom: '10px',
                        width: '80%',
                        height: '100%',
                        maxWidth: '400px',
                        maxHeight: '500px',
                        padding: '20px',
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#eee',
                    }}>
                        <TextField
                        error={!isNotesFormValid}
                        helperText={!isNotesFormValid && "Review field required"}
                        sx={{
                            width: '100%',
                            height: '100%',
                            ...(isNotesFormValid ? {'&& fieldset.MuiOutlinedInput-notchedOutline': { borderColor: 'primary.light' }} : {'&& fieldset.MuiOutlinedInput-notchedOutline': { borderColor: 'red.lightest' }} ),
                            ...(isNotesFormValid ? {'&& .MuiFormLabel-root': { color: 'primary.light' }} : {'&& .MuiFormLabel-root': { color: 'red.lightest' }} ),
                            ...(isNotesFormValid ? {'p.Mui-error': { color: 'red.lightest' }} : {'p.Mui-error': { color: 'red.lightest' }} ),
                            'textarea.MuiInputBase-input': {color: '#444'},
                            'textarea.MuiInputBase-input::placeholder': {color: '#444'},
                        }}
                        autoComplete='off'
                        value={notes}
                        name="notes"
                        onChange={this.onChange}
                        multiline
                        rows={10}
                        label="Komentar"
                        placeholder="Silahkan tulis komentar di kolom ini..."
                        color="primary"
                        focused/>

                        <Button
                        sx={{
                            mt: 1,
                            borderRadius: 10,
                            width: '50%',
                            height: '50px',
                            alignItems: 'center',
                            background: 'linear-gradient(to right bottom, #30E8BF, #FF8235)'
                        }}
                        variant="standard" 
                        onClick={this.onSubmit}
                        >
                            <Typography
                            sx={{
                                color: 'white',
                                letterSpacing: 1,
                                fontSize: 16,
                                fontWeight: '400',
                            }}>
                                selanjutnya
                            </Typography>
                        </Button>
                    </Paper>
                    </Fade>
                    : <Fade in={loaded && page !== 6}>
                    <Paper
                    elevation={2}
                    sx={{
                        marginBottom: '10px',
                        width: '90%',
                        maxWidth: '400px',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#eee',
                    }}>
                        <Button
                        disableElevation
                        sx={{
                            marginTop: '7px',
                            marginBottom: '7px',
                            width: '60%',
                            height: '50px',
                            borderRadius: 3,
                        }}
                        variant="outlined"
                        onClick={event => this.onReview(event, 5)}>
                            <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <h1
                                style={{
                                    width: '30%',
                                    display: 'flex',
                                    justifyContent: 'flex-start'
                                }}>😄</h1>
                                <p
                                style={{
                                    width: '70%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    textAlign: 'left'
                                }}>Sangat Puas</p>
                            </Box>
                        </Button>
                        <Button
                        disableElevation
                        sx={{
                            marginTop: '7px',
                            marginBottom: '7px',
                            width: '60%',
                            height: '50px',
                            borderRadius: 3,
                        }}
                        variant="outlined"
                        onClick={event => this.onReview(event, 4)}>
                            <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <h1
                                style={{
                                    width: '30%',
                                    display: 'flex',
                                    justifyContent: 'flex-start'
                                }}>😃</h1>
                                <p
                                style={{
                                    width: '70%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    textAlign: 'left'
                                }}>Puas</p>
                            </Box>
                        </Button>
                        <Button
                        disableElevation
                        sx={{
                            marginTop: '7px',
                            marginBottom: '7px',
                            width: '60%',
                            height: '50px',
                            borderRadius: 3,
                        }}
                        variant="outlined"
                        onClick={event => this.onReview(event, 3)}>
                            <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <h1
                                style={{
                                    width: '30%',
                                    display: 'flex',
                                    justifyContent: 'flex-start'
                                }}>🙂</h1>
                                <p
                                style={{
                                    width: '70%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    textAlign: 'left'
                                }}>Cukup</p>
                            </Box>
                        </Button>
                        <Button
                        disableElevation
                        sx={{
                            marginTop: '7px',
                            marginBottom: '7px',
                            width: '60%',
                            height: '50px',
                            borderRadius: 3,
                        }}
                        variant="outlined"
                        onClick={event => this.onReview(event, 2)}>
                            <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <h1
                                style={{
                                    width: '30%',
                                    display: 'flex',
                                    justifyContent: 'flex-start'
                                }}>😔</h1>
                                <p
                                style={{
                                    width: '70%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    textAlign: 'left'
                                }}>Kurang</p>
                            </Box>
                        </Button>
                        <Button
                        disableElevation
                        sx={{
                            marginTop: '7px',
                            marginBottom: '7px',
                            width: '60%',
                            height: '50px',
                            borderRadius: 3,
                        }}
                        variant="outlined"
                        onClick={event => this.onReview(event, 1)}>
                            <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <h1
                                style={{
                                    width: '30%',
                                    display: 'flex',
                                    justifyContent: 'flex-start'
                                }}>😒</h1>
                                <p
                                style={{
                                    width: '70%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    textAlign: 'left'
                                }}>Sangat Kurang</p>
                            </Box>
                        </Button>
                    </Paper>
                    </Fade>
                }
                
            </Grid>
        )
      }
}

function customPageThumb(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <p 
        className="page-label">
          {props.ownerState.componentsProps.page.page}
        </p>
      </SliderThumb>
    );
}
  
customPageThumb.propTypes = {
    children: PropTypes.node,
};

function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };

export default withRouter(Satisfaction);