import React,{ useState } from 'react';
import EditCardModal from '../components/UI/cardmodal/editCardModal';
import DueDate from '../components/UI/cardmodal/dueDate';

const Modal = () => {
  const [showModal, setShowModal] = useState(false)
  return(
    <div className="flex justify-center m-20">
      {/* <button onClick={() => {
        setShowModal(true)
      }}>
        Show Modal
      </button> */}
      <EditCardModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default Modal;