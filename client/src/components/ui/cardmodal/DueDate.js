import React, {useState, useEffect, useRef} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CARD_DUEDATE } from '../../../graphql/mutations/card';
import Icon from '../Icon';

const DueDate = ({ card, setShowDatePicker}) => {
  const [dueDate, setDueDate] = useState(new Date);
  const ref = useRef(null);

  const [updateCardDueDate, { loading, error }] = useMutation(UPDATE_CARD_DUEDATE,
    {
      variables: {
        cardId: card._id,
        input: { dueDate }
      }
    })

  useEffect(() => {
    if(ref && ref.current){
      const docClick = function (e) {
        if(!ref.current.contains(e.target)) {
          setShowDatePicker(false);
        }
      };
      document.addEventListener('click', docClick);
      return () => {
        document.removeEventListener('click', docClick);
      };
    }
    updateCardDueDate();
  }, [dueDate])

  return(
    <div className="flex justify-center mt-32">
      <div className="w-4/12 bg-white rounded" ref={ref}>
        <div className="flex justify-between mx-4 border-b">
          <div></div>
          <h3 className="p-3">Change Due Date</h3>
          <button onClick={() => setShowDatePicker(false)}
          className="p-3"
          >
            <Icon icon="times" />
          </button>
        </div>
        <div className="flex justify-around p-3 m-2">
          <div className="flex-col"> 
            <div className="font-medium">Date</div>
            <DatePicker
              selected={dueDate}
              onChange={date => setDueDate(date)}
              className="rounded border-2 border-black-200 text-center p-2 mt-1"
            />
          </div>
          <div className="flex-col">
            <div className="font-medium">Time</div>
            <DatePicker
              selected={dueDate}
              onChange={date => setDueDate(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="rounded border-2 border-black-200 text-center p-2 mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DueDate;