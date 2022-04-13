import React, { useEffect, useState } from 'react'
import {IState as Props} from "../App"
import useGeoLocation from '../hooks/getGeoLocation';

//@ts-expect-error
import DateTimePicker from "react-datetime-picker";

import Axios from 'axios'

interface IProps {
  people: Props["people"];
  setPeople: React.Dispatch<React.SetStateAction<Props["people"]>>;
}

export const Form: React.FC<IProps> = ({ people, setPeople }) => {
  const [input, setInput] = useState<{ [key: string]: any }>({
    name: "",
    location: "",
    timeWindows: [],
    numTrees: "",
  });

  console.log(useGeoLocation().coordinates);
  const location = {
    longitude: useGeoLocation().coordinates.lng,
    latitude: useGeoLocation().coordinates.lat,
  };

  const [startdate, setstartDate] = useState(new Date());
  const [enddate, setendDate] = useState(new Date());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocation = (): void => {
    alert("Location Saved");
    setInput({
      ...input,
      location: [location.longitude, location.latitude].join(","),
    });
  };

  const handleDateChange = (date: Date, dateID: string): void => {
    if (dateID === "startdate") {
      setstartDate(date);
    } else {
      setendDate(date);
    }
  };

  const addTime = (e: any) => {
    e.preventDefault();
    const timeWindows = [...input.timeWindows];
    setInput({
      ...input,
      timeWindows: [...timeWindows, [startdate, enddate]],
    });
  };

  const handleClick = (e: any): void => {
    e.preventDefault();
    if (!input.name) {
      return;
    }

    setPeople([
      ...people,
      {
        name: input.name,
        location: input.location,
        timeWindows: input.timeWindows,
        numTrees: parseInt(input.numTrees),
      },
    ]);
    console.log(people);

    setInput({
      name: "",
      numTrees: "",
      date: "",
      timeWindows: [],
      location: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <button onClick={handleLocation} className="submit-btn">
          Click to Set Location
        </button>
        <input
          type="text"
          placeholder="Name"
          value={input.name}
          onChange={handleChange}
          name="name"
          autoComplete="off"
          className="form-input"
        ></input>
        <input
          type="number"
          placeholder="Number of Trees"
          value={input.numTrees}
          onChange={handleChange}
          name="numTrees"
          autoComplete="off"
          className="form-input"
        ></input>
        <div className="calendar">
          <DateTimePicker
            onChange={(date: Date) => handleDateChange(date, "startdate")}
            value={startdate}
            disableClock={true}
          />
          &nbsp;
          <DateTimePicker
            onChange={(date: Date) => handleDateChange(date, "enddate")}
            value={enddate}
            disableClock={true}
          />
        </div>
        <button onClick={addTime} className="submit-btn">
          Add Time
        </button>
        <button onClick={handleClick} className="submit-btn">
          Book Appointment
        </button>
        <p>Location: {input.location}</p>
      </form>
    </div>
  );
};
