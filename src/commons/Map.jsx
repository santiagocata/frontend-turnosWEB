const Map = ({coords})=>{
    /*
    function showLocationOnMap(position){
        let latitud = position.coords.latitude;
        let longitud = position.coords.longitude;
        console.log(latitud,longitud)        
    }
    
    
        let geoLoc = navigator.geolocation
        let watchId = geoLoc.watchPosition(showLocationOnMap)
    */

    return(
            
                    <iframe
                title="mapaGoogle"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBfDTDBgoklx7Q1VwUL9_WxJzc69I6BNhI&q=${coords}`}
                allowFullScreen></iframe>

        )
}

export default Map;
