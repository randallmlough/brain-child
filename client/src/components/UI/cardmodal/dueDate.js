import React from 'react';

const DueDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return(
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
  )

}

export default DueDate;