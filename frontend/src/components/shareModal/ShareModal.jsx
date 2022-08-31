import { Modal } from '@mantine/core';
import PostShare from '../postShare/PostShare';

function ShareModal({modalOpened, setModalOpened}) {

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        overlayBlur={3}
        size='55%'
        overlayColor='gray'
      >
        <PostShare />
      </Modal>
    </>
  );
}

export default ShareModal