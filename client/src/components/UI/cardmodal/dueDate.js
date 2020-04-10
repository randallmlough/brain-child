import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CARD_DUEDATE } from '../../../graphql/mutations/card';

const DueDate = ({ card, setShowDatePicker}) => {
  const [dueDate, setDueDate] = useState(new Date);

  const [updateCardDueDate, { loading, error }] = useMutation(UPDATE_CARD_DUEDATE,
    {
      variables: {
        cardId: card._id,
        input: { dueDate }
      }
    })

  useEffect(() => {
    updateCardDueDate();
  }, [dueDate])

  return(
    <div className="flex justify-center mt-32">
      <div className="w-3/12 bg-black-100">
        <button onClick={() => setShowDatePicker(false)}>
          X
        </button>
        <DatePicker
          selected={dueDate}
          onChange={date => setDueDate(date)}
        />
        <DatePicker
          selected={dueDate}
          onChange={date => setDueDate(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      </div>
    </div>
  )
}

export default DueDate;