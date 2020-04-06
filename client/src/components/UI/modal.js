import React, { useState, useEffect } from 'react';

const Modal = ({ showModal, setShowModal }) => {
  const closeModal = () => setShowModal(false);
  const [showEdit, setShowEdit] = useState(false);
  const openEdit = () => setShowEdit(true);
  const closeEdit = () => setShowEdit(false);
  const [description, setDescription] = useState('');

  const content = (
    <>
      <div>
        <button onClick={closeModal}>X</button>
        <h2>Description</h2>
        <div>
          {
            showEdit ? (
              <form>
                <textarea
                  placeholder="Add a more detailed description..."
                  onChange={ (e) => setDescription(e.currentTarget.value) }
                />
                <input
                  type="submit"
                  value="Save"
                  onClick={closeEdit}
                />
                <button onClick={closeEdit}>X</button>
              </form>
            ) : <p onClick={openEdit}>Add a more detailed description...</p>
          }
        </div>
      </div>
    </>

  )

  return content;

}

export default Modal;