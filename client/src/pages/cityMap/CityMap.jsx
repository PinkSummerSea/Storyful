import React, { useState, useRef, useEffect } from "react";
import { getAllPosts, updateQueriedPosts } from "../../actions/PostAction";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import useSupercluster from "use-supercluster";
import './CityMap.css'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import book from "../../img/open-book.png";

const CityMap = () => {
    let { allPosts } = useSelector((state) => state.postReducer);
    //const [showPopup, setShowPopup] = useState(false)
    const [selectedSpot, setSelectedSpot] = useState(null)
    const [selectedSingle, setSelectedSingle] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(getAllPosts());
    }, []);

    const [viewport, setViewport] = useState({
      latitude: 49.2827,
      longitude: -123.1207,
      width: "100vw",
      height: "100vh",
      zoom: 10,
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
            postDesc: post.desc,
            postLocation: post.location
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

    const redirect = async (clusterId) => {
      const query = supercluster.getChildren(clusterId)[0].properties.postLocation
      const { data } = await axios.get(`http://localhost:8000/post?q=${query}`);
      dispatch(
        updateQueriedPosts(data)
      );
      console.log(query)
      query && navigate("/storybook", {
        state: {
          query: query
        }
      });
    }

    return (
      <div style={{ width: "100vw", height: "100vh", overflow:"visible" }}>
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
                <img
                  style={{ width: "2rem" }}
                  src={book}
                  onClick={() => {
                    setSelectedSingle(cluster);
                  }}
                />
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
                }}
              >
                {supercluster.getChildren(selectedSpot.id).map((child) => (
                  <div>
                    <h3 id="story-title">{child.properties.postTitle}</h3>
                    <Link
                      to={`../profile/${child.properties.postUserId}`}
                      className="link"
                    >
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
                          position: "relative",
                          top: "-10px",
                          borderRadius: "10px",
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
                <button className="button fc-button" onClick={handleClick}>
                  Close
                </button>
                <button
                  className="button fc-button"
                  onClick={() => {
                    redirect(selectedSpot.id);
                  }}
                >
                  View More Stories
                </button>
              </div>
            </Popup>
          ) : null}
          {selectedSingle ? (
            <Popup
              latitude={parseFloat(selectedSingle.geometry.coordinates[1])}
              longitude={parseFloat(selectedSingle.geometry.coordinates[0])}
              anchor="bottom"
            >
              <div
                style={{
                  padding: "0.5rem",
                  position: "relative",
                  top: "-10px",
                }}
              >
                <h3 id="story-title">{selectedSingle.properties.postTitle}</h3>
                <Link
                  to={`../profile/${selectedSingle.properties.postUserId}`}
                  className="link"
                >
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
                      position: "relative",
                      top: "-10px",
                      borderRadius: "10px",
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
                <button onClick={handleClick} className="button fc-button">
                  Close
                </button>
                <button className="button fc-button">Read Story</button>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    );
}

export default CityMap