import { Modal } from '@mantine/core';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import { updateUser } from '../../actions/UserAction.js';
import { uploadImage } from '../../api/UploadRequest.js';
import { toast } from "react-toastify";
function ProfileModal({modalOpened, setModalOpened, data}) {
  const {password, ...other} = data
  const [formData, setFormData] = useState(other)
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const dispatch = useDispatch()
  const params = useParams()
  const user = useSelector(state => state.authReducer.authData)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      // e.target.name === 'profilePicture' ? setProfileImage(img) : setCoverImage(img)
      if (
        img.type === "image/jpeg" ||
        img.type === "image/png"
      ) {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "chat-app");
        formData.append("cloud_name", "danvmjkut");

        fetch("https://api.cloudinary.com/v1_1/danvmjkut/image/upload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            e.target.name === "profilePicture"
              ? setProfileImage(data.url.toString())
              : setCoverImage(data.url.toString());
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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let userData = formData

    if(profileImage){
    //   const data = new FormData()
    //   const fileName = Date.now() + profileImage.name 
    //   data.append('name', fileName)
    //   data.append('file', profileImage)
      userData.profilePicture = profileImage
    //   try {
    //     dispatch(uploadImage(data))
    //   } catch (error) {
    //     console.log(error)
    //   }
    }
    if(coverImage){
    //   const data = new FormData()
    //   const fileName = Date.now() + coverImage.name 
    //   data.append('name', fileName)
    //   data.append('file', coverImage)
       userData.coverPicture = coverImage
    //   try {
    //     dispatch(uploadImage(data))
    //   } catch (error) {
    //     console.log(error)
    //   }
    }



    dispatch(updateUser(params.id, userData))
    setModalOpened(false)
  }
  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        overlayBlur={3}
        size='55%'
        overlayColor='gray'
      >
        <form action="" className='infoForm'>
            <h3>Your Info</h3>
            <div>
                <input type="text" className='infoInput' name='firstname' placeholder='First Name' onChange={handleChange} value={formData.firstname} />
                <input type="text" className='infoInput' name='lastname' placeholder='Last Name' onChange={handleChange} value={formData.lastname}/>
            </div>

             <div>
                <input type="text" className='infoInput' name='worksat' placeholder='Works At' onChange={handleChange} value={formData.worksat}/>
            </div>

            <div>
                <input type="text" className='infoInput' name='livesin' placeholder='Lives In' onChange={handleChange} value={formData.livesin}/>
                <input type="text" className='infoInput' name='country' placeholder='Country' onChange={handleChange} value={formData.country}/>
            </div>

            <div>
                <input type="text" className='infoInput' name='relationship' placeholder='Relationship Status' onChange={handleChange} value={formData.relationship}/>
            </div>

            <div>
                Profile Image
                <input type="file" name='profilePicture' onChange={handleImageChange}/>
                Cover Image 
                <input type="file" name='coverPicture' onChange={handleImageChange}/>
            </div>

            <button className='button info-button' onClick={handleSubmit}>Update</button>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal