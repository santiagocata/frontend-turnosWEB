import react, { useState,useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Map = (coords)=>{

    const [loading,setLoading] = useState(false);
    const [coordenadas,setCoordenadas] = useState(coords);

    useEffect(()=>{
        setLoading(false);
        setTimeout(()=>{
            setLoading(true);
        },3500)
    },coords)
    
    if(loading){
        return(
            <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBfDTDBgoklx7Q1VwUL9_WxJzc69I6BNhI&q=${coordenadas}`}
            allowFullScreen/>
        )
    }
    else{
    return (
        <Box sx={{ display: 'flex' }} justifyContent="center" margin="1rem 1rem">
            <CircularProgress />
        </Box>
    )}
}

export default Map;


