import React from "react";
import axios from 'axios';
import images from '../assets/images';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Navigate } from "react-router-dom";
import {Button, TextField, FormControl, Box, Typography, InputAdornment, CircularProgress, Fade} from '@mui/material';
import {Person, PhoneIphone, LocationOn} from '@mui/icons-material';
import {withRouter} from '../withRouter';

class Customer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            name: null,
            isNameFormValid: true,
            phone: null,
            isPhoneFormValid: true,
            address: null,
            isAddressFormValid: true
        };
    }

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        if (e.target.name === "name") {
            if (!e.target.value) {
                this.setState({ isNameFormValid: false });
            } else {
                this.setState({ isNameFormValid: true });
            }
            var text = e.target.value.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
            this.setState({ [e.target.name]: text });
        } else if (e.target.name === "phone") {
            if (!e.target.value) {
                this.setState({ isPhoneFormValid: false });
            } else {
                this.setState({ isPhoneFormValid: true });
            }
            this.setState({ [e.target.name]: e.target.value });
        } else if (e.target.name === "address") {
            if (!e.target.value) {
                this.setState({ isAddressFormValid: false });
            } else {
                this.setState({ isAddressFormValid: true });
            }
            this.setState({ [e.target.name]: e.target.value });
        }
        console.log(e);
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { name, phone, address } = this.state;

        if (name && phone && address) {
            axios.post('http://'+process.env.REACT_APP_SERVER+':'+process.env.REACT_APP_SERVER_PORT+'/api/survey/customer', { name, phone, address })
            .then((res) => {
                this.props.router.navigate('/satisfaction', { state: {
                    owner: res.data.id,
                    page: 1,
                    progressBefore: 0,
                    progress: 16.7,
                    question: "Bagaimana kualitas permainan wahana Kami?"
                }});
            }).catch((error) => {
                //catch the error
                console.log(error);
            });
        } else {
            if (!name) {
                this.setState({ isNameFormValid: false });
            }
            if(!phone) {
                this.setState({ isPhoneFormValid: false });
            }
            if(!address) {
                this.setState({ isAddressFormValid: false });
            }
        }
        
    }

    render(){
        const {name, isNameFormValid, phone, isPhoneFormValid, address, isAddressFormValid, loaded} = this.state;
        
        return(
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{  }}
            >
                {loaded === true ? null : 
                    <Box
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        height: '100vh',
                        width: '100vw',
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
                    position: 'absolute',
                    marginTop: '20px',
                    maxWidth: '450px',
                    zIndex: '1000'
                }}
                >
                    <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent= 'flex-end'
                    sx={{
                        maxWidth: '350px',
                    }}
                    >
                        <Fade in={loaded}>
                            <img 
                            style={this.state.loaded ? {} : {display: 'none'}}
                            src={images.loka_customer} 
                            width="150px" alt="loka"
                            onLoad={() => this.setState({loaded: true})}/>
                        </Fade>
                    </Grid>
                </Box>
                <Fade in={loaded}>
                    <Box
                    sx={{
                        marginTop: '100px',
                        width: '350px',
                        height: '600px',
                        maxWidth: '400px',
                        maxHeight: '800px',
                        backgroundColor: 'primary.main',
                        borderRadius: 5,
                        boxShadow: 5,
                    }}
                    >
                        <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        style={{ height: '100%', width: '100%', paddingBottom: '50px', paddingTop: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}
                        >

                            <p style={{margin: 0, padding: 0, textAlign: 'center', fontFamily: 'sans-serif', fontSize: '18px', color: 'white'}}>Survey Kepuasan Pengunjung</p>
                            <FormControl 
                            variant="standard"
                            sx={{width: '100%', alignItems: 'center'}}>
                                <Box sx={{width: '90%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 1}}>
                                    <TextField
                                    error={!isNameFormValid}
                                    helperText={!isNameFormValid && "name field required"}
                                    sx={{
                                        width: '80%',
                                        fontSize: "10px",
                                        'label.MuiFormLabel-root': { color: 'white' },
                                        'label.Mui-error': { color: 'red.lightest' },
                                        '&& label.Mui-focused': { color: 'secondary.lightest' },
                                        '&& label.Mui-error': { color: 'red.lightest' },
                                        'div.MuiInputBase-root > .MuiInputAdornment-root': { color: 'white' },
                                        ...(isNameFormValid ? {'&& .Mui-focused > .MuiInputAdornment-root': { color: 'secondary.lightest' }} : {'&& .Mui-focused > .MuiInputAdornment-root': { color: 'red.lightest' }} ),
                                        'div.Mui-error > .MuiInputAdornment-root': { color: 'red.lightest' },
                                        '&& .Mui-error > .MuiInputAdornment-root': { color: 'red.lightest.lightest' },
                                        '&& .MuiInput-root:hover::before': { borderBottomColor: 'white' },
                                        '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                                        '& .MuiInput-underline:after': { borderBottomColor: 'secondary.lightest' },
                                        '& .Mui-error:before': { borderBottomColor: 'red.lightest' },
                                        '& .Mui-error:after': { borderBottomColor: 'red.lightest' },
                                        'p.Mui-error': { color: 'red.lightest' },
                                    }}
                                    id="input-with-sx"
                                    label="Nama"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment 
                                            position="start"
                                            sx={{
                                                
                                            }}>
                                                <Person
                                                sx={{
                                                    my: 2,
                                                }}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder='Masukkan nama lengkap anda'
                                    autoComplete='off'
                                    variant="standard"
                                    value={name}
                                    name="name"
                                    onChange={this.onChange}/>
                                </Box>
                                <Box sx={{width: '90%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 1}}>
                                    <TextField
                                    error={!isPhoneFormValid}
                                    helperText={!isPhoneFormValid && "phone field required"}
                                    sx={{
                                        width: '80%',
                                        fontSize: "10px",
                                        'label.MuiFormLabel-root': { color: 'white' },
                                        'label.Mui-error': { color: 'red.lightest' },
                                        '&& label.Mui-focused': { color: 'secondary.lightest' },
                                        '&& label.Mui-error': { color: 'red.lightest' },
                                        'div.MuiInputBase-root > .MuiInputAdornment-root': { color: 'white' },
                                        ...(isPhoneFormValid ? {'&& .Mui-focused > .MuiInputAdornment-root': { color: 'secondary.lightest' }} : {'&& .Mui-focused > .MuiInputAdornment-root': { color: 'red.lightest' }} ),
                                        'div.Mui-error > .MuiInputAdornment-root': { color: 'red.lightest' },
                                        '&& .Mui-error > .MuiInputAdornment-root': { color: 'red.lightest.lightest' },
                                        '&& .MuiInput-root:hover::before': { borderBottomColor: 'white' },
                                        '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                                        '& .MuiInput-underline:after': { borderBottomColor: 'secondary.lightest' },
                                        '& .Mui-error:before': { borderBottomColor: 'red.lightest' },
                                        '& .Mui-error:after': { borderBottomColor: 'red.lightest' },
                                        'p.Mui-error': { color: 'red.lightest' },
                                    }}
                                    id="input-with-sx"
                                    label="Nomor Ponsel"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment 
                                            position="start"
                                            sx={{
                                                
                                            }}>
                                                <PhoneIphone
                                                sx={{
                                                    my: 2,
                                                }}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    type="tel"
                                    placeholder='Masukkan nomor ponsel anda'
                                    autoComplete='off'
                                    variant="standard"
                                    value={phone}
                                    name="phone"
                                    onChange={this.onChange}/>
                                </Box>
                                <Box sx={{width: '90%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 1}}>
                                    <TextField
                                    error={!isAddressFormValid}
                                    helperText={!isAddressFormValid && "address field required"}
                                    sx={{
                                        width: '80%',
                                        fontSize: "10px",
                                        'label.MuiFormLabel-root': { color: 'white' },
                                        'label.Mui-error': { color: 'red.lightest' },
                                        '&& label.Mui-focused': { color: 'secondary.lightest' },
                                        '&& label.Mui-error': { color: 'red.lightest' },
                                        'div.MuiInputBase-root > .MuiInputAdornment-root': { color: 'white' },
                                        ...(isAddressFormValid ? {'&& .Mui-focused > .MuiInputAdornment-root': { color: 'secondary.lightest' }} : {'&& .Mui-focused > .MuiInputAdornment-root': { color: 'red.lightest' }} ),
                                        'div.Mui-error > .MuiInputAdornment-root': { color: 'red.lightest' },
                                        '&& .Mui-error > .MuiInputAdornment-root': { color: 'red.lightest.lightest' },
                                        '&& .MuiInput-root:hover::before': { borderBottomColor: 'white' },
                                        '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                                        '& .MuiInput-underline:after': { borderBottomColor: 'secondary.lightest' },
                                        '& .Mui-error:before': { borderBottomColor: 'red.lightest' },
                                        '& .Mui-error:after': { borderBottomColor: 'red.lightest' },
                                        'p.Mui-error': { color: 'red.lightest' },
                                    }}
                                    id="input-with-sx"
                                    label="Alamat"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment 
                                            position="start"
                                            sx={{
                                                
                                            }}>
                                                <LocationOn
                                                sx={{
                                                    my: 2,
                                                }}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder='Masukkan alamat anda'
                                    autoComplete='off'
                                    variant="standard"
                                    value={address}
                                    name="address"
                                    onChange={this.onChange}/>
                                </Box>
                            </FormControl>
                            <Button
                                sx={{
                                    mt: 4,
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
                        </Grid>
                    </Box>
                </Fade>
            </Grid>
        )
      }
}

export default withRouter(Customer);