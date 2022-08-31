import { Modal } from '@mantine/core';

function ProfileModal({modalOpened, setModalOpened}) {

    

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
                <input type="text" className='infoInput' name='firstname' placeholder='First Name' />
                <input type="text" className='infoInput' name='lastname' placeholder='Last Name' />
            </div>

             <div>
                <input type="text" className='infoInput' name='worksat' placeholder='Works At' />
            </div>

            <div>
                <input type="text" className='infoInput' name='livesin' placeholder='Lives In' />
                <input type="text" className='infoInput' name='country' placeholder='Country' />
            </div>

            <div>
                <input type="text" className='infoInput' name='status' placeholder='Relationship Status' />
            </div>

            <div>
                Profile Image
                <input type="file" name='profileImg' />
                Cover Image 
                <input type="file" name='coverImg' />
            </div>

            <button className='button info-button'>Update</button>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal