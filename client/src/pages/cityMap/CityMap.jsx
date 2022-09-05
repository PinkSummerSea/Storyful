import React, { useState, useRef, useEffect } from "react";
import { getAllPosts } from "../../actions/PostAction";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import useSupercluster from "use-supercluster";
import './CityMap.css'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'


const CityMap = () => {
    let { allPosts } = useSelector((state) => state.postReducer);
    //const [showPopup, setShowPopup] = useState(false)
    const [selectedSpot, setSelectedSpot] = useState(null)
    const [selectedSingle, setSelectedSingle] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllPosts());
    }, []);

    const [viewport, setViewport] = useState({
      latitude: 49.2827,
      longitude: -123.1207,
      width: "100vw",
      height: "100vh",
      zoom: 8,
    });

    const mapRef = useRef()

    const points = allPosts.map(post => ({
        type: 'Feature',
        properties: {
            cluster: false,
            postId:post._id,
            postTitle: post.title,
            postUsername: post.username,
            postUserId: post.userId,
            postImage: post.image,
            postDesc: post.desc
        },
        geometry: {
            type: 'Point',
            coordinates: [parseFloat(post.lng), parseFloat(post.lat)]
        }
    }))
    
    const bounds = mapRef.current? mapRef.current.getMap().getBounds().toArray().flat() : null;

    const {clusters, supercluster} = useSupercluster({
        points,
        zoom: viewport.zoom,
        bounds,
        options: {
            radius: 5,
            maxZoom: 20
        }
    })

    //console.log(clusters)

    const handleClick = () => {
      setSelectedSingle(null)
      setSelectedSpot(null)
    }

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactMapGL
          {...viewport}
          maxZoom={20}
          mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(newViewport) => {
            setViewport({ ...newViewport });
          }}
          ref={mapRef}
        >
          {clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count } = cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={cluster.id}
                  latitude={latitude}
                  longitude={longitude}
                >
                  <div
                    className="cluster"
                    style={{
                      width: `${10 + (point_count / points.length) * 50}px`,
                      height: `${10 + (point_count / points.length) * 50}px`,
                    }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      if (viewport.zoom === 20) {
                        setSelectedSpot(cluster);
                      } else {
                        setViewport({
                          ...viewport,
                          latitude,
                          longitude,
                          zoom: expansionZoom,
                          transitionInterpolator: new FlyToInterpolator({
                            speed: 2,
                          }),
                          transitionDuration: "auto",
                        });
                      }
                    }}
                  >
                    {point_count}
                  </div>
                </Marker>
              );
            }

            return (
              <Marker
                key={cluster.properties.postId}
                latitude={latitude}
                longitude={longitude}
              >
                <button
                  style={{ backgroundColor: "hotpink" }}
                  onClick={()=>{setSelectedSingle(cluster)}}
                >
                  a
                </button>
              </Marker>
            );
          })}
          {selectedSpot ? (
            <Popup
              latitude={parseFloat(selectedSpot.geometry.coordinates[1])}
              longitude={parseFloat(selectedSpot.geometry.coordinates[0])}
              anchor="bottom"
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1rem",
                  borderRadius: "30%",
                }}
              >
                {supercluster.getChildren(selectedSpot.id).map((child) => (
                  <div>
                    <h3>{child.properties.postTitle}</h3>
                    <Link to={`../profile/${child.properties.postUserId}`}>
                      <p>by {child.properties.postUsername}</p>
                    </Link>
                    <div>
                      <img
                        src={
                          child.properties.postImage
                            ? process.env.REACT_APP_PUBLIC_FOLDER +
                              child.properties.postImage
                            : ""
                        }
                        alt=""
                        style={{
                          width: "200px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={handleClick}
                >
                  Close
                </button>
                <button>View More Stories</button>
              </div>
            </Popup>
          ) : null}
          {selectedSingle ? (
            <Popup
              latitude={parseFloat(selectedSingle.geometry.coordinates[1])}
              longitude={parseFloat(selectedSingle.geometry.coordinates[0])}
              anchor="bottom"
            >
              <div>
                <h3>{selectedSingle.properties.postTitle}</h3>
                <Link to={`../profile/${selectedSingle.properties.postUserId}`}>
                  <p>by {selectedSingle.properties.postUsername}</p>
                </Link>
                <div>
                  <img
                    src={
                      selectedSingle.properties.postImage
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          selectedSingle.properties.postImage
                        : ""
                    }
                    alt=""
                    style={{
                      width: "200px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={handleClick}
                >
                  Close
                </button>
                <button>Read Story</button>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    );
}

export default CityMap