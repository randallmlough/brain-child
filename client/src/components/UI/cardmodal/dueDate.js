import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DueDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return(
    <>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    </>
  )

}

export default DueDate;