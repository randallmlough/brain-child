import React, { useState, useEffect } from 'react';

const DescriptionEditForm = ( { closeEdit } ) => {
  const [description, setDescription] = useState('');

  const formContent = (
    <form>
      <textarea
        placeholder="Add a more detailed description..."
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <input
        type="submit"
        value="Save"
        onClick={closeEdit}
      />
      <button onClick={closeEdit}>X</button>
    </form>
  )

  return formContent;
}

export default DescriptionEditForm;