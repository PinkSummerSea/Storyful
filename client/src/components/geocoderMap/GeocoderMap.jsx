import "mapbox-gl/dist/mapbox-gl.css";
import './GeocoderMap.css'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import {useDispatch} from 'react-redux'
import { forwardLatLng } from "../../actions/MapAction";

const GeocoderMap = () => {

    const [viewport, setViewport] = useState({
      latitude: 49.2827,
      longitude: -123.1207,
      zoom: 8,
    });
    const mapRef = useRef();
    const handleViewportChange = useCallback(
      (newViewport) => setViewport(newViewport),
      []
    );

     const handleGeocoderViewportChange = useCallback((newViewport) => {
       const geocoderDefaultOverrides = { transitionDuration: 1000 };

       return handleViewportChange({
         ...newViewport,
         ...geocoderDefaultOverrides,
       });
     }, []);

     const dispatch = useDispatch()
     useEffect(()=>{
        dispatch(forwardLatLng({lat: mapRef.current.props.latitude, lng: mapRef.current.props.longitude}))
     }, [mapRef?.current?.props.latitude])

     


  return (
    <div style={{ height: "100%" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
          position="top-left"
        />
      </MapGL>
    </div>
  );
}

export default GeocoderMap