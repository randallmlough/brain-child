import React, { useState, useEffect, useRef } from 'react';


const DescriptionEditForm = ( { closeEdit, cardDescription } ) => {
  const [description, setDescription] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if(ref && ref.current){
      const docClick = function (e) {
        if (!ref.current.contains(e.target)) {
          closeEdit();
        }
      };
      document.addEventListener('click', docClick);
      return () => {
        document.removeEventListener('click',docClick);
      };
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //mutation
    closeEdit();
  }

  const formContent = (
    <div>
      <form onSubmit={handleSubmit} ref={ref}>
        {
          cardDescription ? 
            <textarea 
              value={cardDescription} 
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