import { useState, useRef } from "react";
import './PostShare.css'
import { UilScenery, UilTimes } from '@iconscout/react-unicons'
import { useSelector, useDispatch } from 'react-redux'
import { uploadPost } from '../../actions/UploadAction'
import GeocoderMap from '../geocoderMap/GeocoderMap'
import { useEffect } from 'react'
import pen from '../../img/pen.png'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RichTextArea from "../richTextArea/RichTextArea";

const PostShare = ({from}) => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [hidden, setHidden] = useState(true)
  const imageRef = useRef();
  const [value, setValue] = useState("");
  const getValue = (value) => {
    setValue(value);
  };

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
    setValue("");
  };

  useEffect(()=>{
    if(from === 'modal') {
      setHidden(false)
    }
    
  }, [])


  useEffect(()=>{
      setLocation(document.querySelector(".mapboxgl-ctrl-geocoder--input")
        ?.value)
  }, [lat, lng])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user._id || !value || !title.current.value || !location || !lat || !lng) {
      toast("🦄 Please fill all required fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const newPost = {
      userId: user._id,
      username: user.username,
      desc: value,
      title: title.current.value,
      location: location,
      lat: lat,
      lng: lng
    };

    if (image) {
      if (image.type === "image/jpeg" || image.type === "image/png") {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "chat-app");
        formData.append("cloud_name", "danvmjkut");

        fetch("https://api.cloudinary.com/v1_1/danvmjkut/image/upload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            newPost.image = data.url.toString()
            dispatch(uploadPost(newPost));
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toast("🦄 Pleas select an image", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }
    reset();
  };

  const showTextEditor = () => {
    setHidden(prev => !prev)
  }

  return (
    <div className="PostShareWrap">
      <div className="PostShareTop">
        <img
          src={
            user.profilePicture
              ? user.profilePicture
              : "https://res.cloudinary.com/danvmjkut/image/upload/v1663006406/defaultProfile2_tktwrq.png"
          }
          alt=""
        />
        <span onClick={showTextEditor}>Tell your story</span>
        <img src={pen} alt="" onClick={showTextEditor} />
      </div>
      <div className="PostShare">
        <div>
          <div className="text-editor-wrapper" hidden={hidden}>
            <input
              type="text"
              id="tranparent-input"
              placeholder="Story Title"
              ref={title}
              required
            />
            <RichTextArea initialValue="" getValue={getValue} />
          </div>
          <div style={{ height: "20rem" }}>
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
    </div>
  );
}

export default PostShare