import React from "react";
import axios from 'axios';
import images from '../assets/images';
import {Box, Paper, Button, TextField, Typography, Fade, CircularProgress} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {withRouter} from '../withRouter';
import '../styles/visit.css';

class Visit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            page: null,
            progress: null,
            question: null,
            options: [],
            owner: null,
            frequency: null,
            referal: null,
            isRecomended: null,
            notes: null,
            isNotesFormValid: true,
        }
    }

    componentDidMount() {
        this.setState({
            owner: this.props.router.location.state.owner,
            page: this.props.router.location.state.page,
            progress: this.props.router.location.state.progressBefore,
            question: this.props.router.location.state.question,
            options: this.props.router.location.state.options
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

    onReview(event, value) {

        if (this.state.page === 1) {
            this.setState({
                frequency: value,
                page: 2,
                progress: 2,
                question: "Dari manakah Anda mendapatkan informasi mengenai saloka?",
                options: [
                    {
                        value: 1,
                        text: "media sosial"
                    },
                    {
                        value: 2,
                        text: "teman"
                    },
                    {
                        value: 3,
                        text: "saudara"
                    },
                ],
            });
        }
        else if (this.state.page === 2) {
            this.setState({
                referal: value,
                page: 3,
                progress: 3,
                question: "Secara keseluruhan apakah anda merekomendasikan saloka?(teman, saudara, kerabat, dll)",
                options: [
                    {
                        value: 1,
                        text: "ya"
                    },
                    {
                        value: 2,
                        text: "mungkin"
                    },
                    {
                        value: 3,
                        text: "tidak"
                    },
                ],
            });
        }
        else if (this.state.page === 3) {

            if (value === 3) {
                this.setState({
                    isRecomended: value,
                    page: 4,
                    progress: 4,
                    question: "Alasan Kenapa Anda Tidak Merekomendasikan :",
                    options: [
                    ],
                });
            } else {
                this.setState({
                    isRecomended: value,
                }, () => {
                    //submit
                    const { owner, frequency, referal, isRecomended } = this.state;
                    const notes = "-kosong-";
        
                    axios.post('http://'+process.env.REACT_APP_SERVER+':'+process.env.REACT_APP_SERVER_PORT+'/api/survey/visit', { owner, frequency, referal, isRecomended, notes })
                    .then((res) => {
                        this.props.router.navigate('/finished', { state: {
                            owner: res.data.owner,
                        }});
                    }).catch((error) => {
                        //catch the error
                        console.log(error);
                    });
                });

            }
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { owner, frequency, referal, isRecomended, notes } = this.state;
    
        if (notes) {
            axios.post('http://'+process.env.REACT_APP_SERVER+':'+process.env.REACT_APP_SERVER_PORT+'/api/survey/visit', { owner, frequency, referal, isRecomended, notes })
            .then((res) => {
                this.props.router.navigate('/finished', { state: {
                    owner: res.data.owner,
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

    render(){
        const {page, progress, progressBefore, question, options, owner, frequency, referal, isRecomended, notes, isNotesFormValid, loaded} = this.state;

        var circleStyle = {
            marginLeft: '10px',
            marginRight: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: "50%",
        };
        const active1 = page === 1 ? "active-page" : "";
        const active2 = page === 2 ? "active-page" : "";
        const active3 = page === 3 ? "active-page" : "";

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
                        <CircularProgress style={{'color': 'secondary.main'}}/>
                    </Box>
                }
                <Box
                sx={{
                    width: '100%',
                    height: '35vh',
                    minHeight: '250px',
                    backgroundColor: 'primary.main',
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
                            src={images.loka_visit}
                            height="100px" alt="loka"
                            onLoad={() => this.setState({loaded: true})}/>
                        </Fade>
                    </Box>
                    <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Fade in={loaded}>
                            <h1 className="title" style={{
                                color: 'white',
                            }}>Customer Survey</h1>
                        </Fade>
                    </Box>
                    <Fade in={loaded}>
                    <Box 
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                            <div 
                            className={`circle-pagination ${active1}`}
                            style={circleStyle}>1</div>
                            <div 
                            className={`circle-pagination ${active2}`}
                            style={circleStyle}>2</div>
                            <div 
                            className={`circle-pagination ${active3}`}
                            style={circleStyle}>3</div>
                    </Box>
                    </Fade>
                </Box>
                <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Box
                    sx={{
                        marginTop: '10px',
                        width: '100%',
                        height: '50px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Fade in={loaded}>
                            <p 
                            className="question"
                            style={{
                                padding: 0,
                                margin: 0,
                                textAlign: 'center',
                                fontWeight: 700,
                                color: '#444'
                            }}>{question}</p>
                        </Fade>
                    </Box>

                    {page === 4
                        ? 
                        <Fade in={loaded && page === 4}>
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
                            rows={8}
                            label="Alasan"
                            placeholder="Silahkan tulis alasan anda tidak merekomendasikan di kolom ini..."
                            color="primary"
                            focused />
    
                            <Button
                            sx={{
                                mt: 1,
                                borderRadius: 10,
                                width: '80%',
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
                                    selesai
                                </Typography>
                            </Button>
                        </Paper>
                        </Fade>
                        : <Fade in={loaded && page !== 4}>
                        <Box
                        sx={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            width: '80%',
                            height: '100%',
                            maxWidth: '400px',
                            maxHeight: '500px',
                            padding: '20px',
                            borderRadius: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#eee',
                        }}>
                            {options.map((option, index) => (  
                                <Button
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        borderRadius: 10,
                                        width: '80%',
                                        height: '50px',
                                        alignItems: 'center',
                                    }}
                                    variant="outlined"
                                    onClick={event => this.onReview(event, option.value)}
                                    >
                                        <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            width: '35%'
                                        }}>
                                            <div 
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                marginLeft: '5%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: "50%",
                                                border: '1px solid rgba(115, 193, 169, 1)', 
                                            }}>
                                                <div 
                                                style={{
                                                    width: '10px',
                                                    height: '10px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: "50%",
                                                    backgroundColor: "#73c1a9",
                                                }}></div>
                                            </div>
                                        </Box>
                                        <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            width: '65%'
                                        }}>
                                            <Typography
                                            sx={{
                                                color: '#444',
                                                letterSpacing: 1,
                                                fontSize: 16,
                                                fontWeight: '600',
                                            }}>
                                                {option.text}
                                            </Typography>
                                        </Box>
                                </Button>
                            ))}  
                        </Box>
                        </Fade>
                    }
                </Box>
            </Grid>
        )
    }
}

export default withRouter(Visit);