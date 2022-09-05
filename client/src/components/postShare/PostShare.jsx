import {useState, useRef} from 'react'
import './PostShare.css'
import { UilScenery, UilPlayCircle, UilSchedule, UilTimes } from '@iconscout/react-unicons'
import { useSelector, useDispatch } from 'react-redux'
import { uploadImage, uploadPost } from '../../actions/UploadAction'
import GeocoderMap from '../geocoderMap/GeocoderMap'
import { useEffect } from 'react'

const PostShare = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const title = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const {lat, lng} = useSelector((state) => state.mapReducer)
  const dispatch = useDispatch();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  useEffect(()=>{
      setLocation(document.querySelector(".mapboxgl-ctrl-geocoder--input")
        ?.value)
  }, [lat, lng])

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      username: user.username,
      desc: desc.current.value,
      title: title.current.value,
      location: location,
      lat: lat,
      lng: lng
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

//   console.log(lat, lng)
//   console.log(location)

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile2.png"
        }
        alt=""
      />
      <div>
        <input type="text" placeholder='Story Title' ref={title} required/>
        <textarea
          type="text"
          placeholder="Tell your story to the world"
          ref={desc}
          rows={10}
          required
        />
        <div style={{ height: "15rem" }}>
          <GeocoderMap />
        </div>

        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--schedule" }}>
            <UilSchedule />
            Schedule
          </div>
          
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostShare