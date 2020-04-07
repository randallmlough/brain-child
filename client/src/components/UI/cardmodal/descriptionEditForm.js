import React, { useState, useEffect } from 'react';


const DescriptionEditForm = ( { closeEdit, cardDescription } ) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //mutation
    closeEdit();
  }

  const formContent = (
    <div>
      <form onSubmit={handleSubmit}>
        {
          cardDescription ? 
            <textarea 
              placeholder={cardDescription} 
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          :
            <textarea
              placeholder="Add a more detailed description..."//whatever is passed in from editCardModal
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
        }
        <input
          type="submit"
          value="Save"
          onClick={handleSubmit}
        />
      </form>
      <button onClick={closeEdit}>
        X
      </button>
    </div>
  )

  return formContent;
}

export default DescriptionEditForm;