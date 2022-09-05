// import './CityStoryMap.css'
// import React from 'react'
// import { useEffect } from 'react';
// import { getAllPosts } from '../../actions/PostAction';
// import {useSelector, useDispatch} from 'react-redux'
// import ReactMapGL, {Marker} from 'react-map-gl'
// import SuperCluster from 'supercluster'
// import { useState } from 'react';
// import { useRef } from 'react';
// import { Avatar, Paper, Tooltip } from "@mui/material";
// //import Avatar from "@mui/joy/Avatar";
// const supercluster = new SuperCluster({
//     radius: 75,
//     maxZoom: 20
// })

// const CityStoryMap = () => {

//     let {allPosts}  = useSelector((state) => state.postReducer);
//     const dispatch = useDispatch()
//     const mapRef = useRef()

//     const [points, setPoints] = useState([])
//     const [clusters, setClusters] = useState([])
//     const [bounds, setBounds] = useState([42, 53, -83, -141])
//     const [zoom, setZoom] = useState(14)

//     useEffect(()=>{
//         dispatch(getAllPosts())
//     }, [])

//     useEffect(()=>{
//         const points = allPosts.map(post => ({
//             type: 'Feature',
//             properties: {
//                 cluster: false,
//                 postId: post._id,
//                 desc: post.desc,
//                 lng: post.lng,
//                 lat: post.lat,
//                 image: post.image,
//                 username: post.username,
//                 userId: post.userId
//             },
//             geometry: {
//                 type: 'Point',
//                 coordinates: [parseFloat(post.lng), parseFloat(post.lat)]
//             }
//         }))

//         setPoints(points)
//     }, [allPosts])

//     useEffect(()=>{
//         supercluster.load(points)
//         setClusters(supercluster.getClusters(bounds, zoom))
//     }, [points, zoom, bounds])

//     useEffect(()=>{
//         console.log(clusters)
//     }, [clusters])

//     useEffect(()=>{
//         if(mapRef.current){
//             setBounds(mapRef.current.getMap().getBounds().toArray().flat())
//         }
//     }, [mapRef?.current])

//   return (
//     <div id="city-map">
//       <ReactMapGL
//         initialViewState={{
//           latitude: 49.279063,
//           longitude: -122.91754900000001,
//           zoom: 10
//         }}
//         mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         ref={mapRef}
//         onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
//       >
//         {clusters.map((cluster) => {
//           const { cluster: isCluster, point_count } = cluster.properties;
//           const [longitude, latitude] = cluster.geometry.coordinates;
//           if (isCluster) {
//             return (
//               <Marker
//                 key={`cluster-${cluster.id}`}
//                 longitude={longitude}
//                 latitude={latitude}
//               >
//                 <div
//                   height="30px"
//                   width="30px"
//                   style={{ backgroundColor: "red" }}
//                 >
//                   {point_count}
//                 </div>
//               </Marker>
//             );
//           }

//           return (
//             <Marker
//               key={`post-${cluster.properties.postId}`}
//               longitude={longitude}
//               latitude={latitude}
//             >
//               <Tooltip title={cluster.properties.username}>
//                 <Avatar
//                   src={
//                     cluster.properties.image
//                       ? process.env.REACT_APP_PUBLIC_FOLDER +
//                         cluster.properties.image
//                       : ""
//                   }
//                   component={Paper}
//                   elevation={2}
//                 />
//               </Tooltip>
//             </Marker>
//           );
//         })}
//       </ReactMapGL>
//     </div>
//   );
// }

// export default CityStoryMap

import React, { useEffect, useState, useRef } from "react";
import { getAllPosts } from "../../actions/PostAction";
import ReactMapGL, { Marker } from "react-map-gl";
import Supercluster from "supercluster";
import "./CityStoryMap.css";
import { Avatar, Paper, Tooltip } from "@mui/material";
import {useSelector, useDispatch} from 'react-redux'

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ClusterMap = () => {
//   const {
//     state: { rooms },
//     dispatch,
//     mapRef,
//   } = useValue();
      let size = 40;
      let {allPosts}  = useSelector((state) => state.postReducer);
      const dispatch = useDispatch()
      const mapRef = useRef()

  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    const points = allPosts.map((post) => ({
      type: "Feature",
      properties: {
        cluster: false,
        postId: post._id,
        title: post.title,
        desc: post.desc,
        lng: post.lng,
        lat: post.lat,
        image: post.images,
        username: post.username,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(post.lng), parseFloat(post.lat)],
      },
    }));
    setPoints(points);
  }, [allPosts]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);
  return (
    <div id="city-map">
      <ReactMapGL
        initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        ref={mapRef}
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      >
        {clusters.map((cluster) => {
          const { cluster: isCluster, point_count } = cluster.properties;
          const [longitude, latitude] = cluster.geometry.coordinates;
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <div
                  className="cluster-marker"
                //   style={{
                //     width: `${10 + (point_count / points.length) * 20}px`,
                //     height: `${10 + (point_count / points.length) * 20}px`,
                //   }}
                  style={{ transform: `translate(${-size / 2}px,${-size}px)` }}
                  onClick={() => {
                    const zoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom,
                      speed: 1,
                    });
                  }}
                >
                  {point_count}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`post-${cluster.properties.postId}`}
              longitude={longitude}
              latitude={latitude}
            >
              <Tooltip title={cluster.properties.uName}>
                <Avatar
                  src={cluster.properties.uPhoto}
                  component={Paper}
                  elevation={2}
                />
              </Tooltip>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
};

export default ClusterMap;