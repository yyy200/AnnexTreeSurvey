import React, { useEffect, useState } from 'react'
import {IState as Props} from "../App"
import useGeoLocation from '../hooks/getGeoLocation';

//@ts-expect-error
import DateTimePicker from "react-datetime-picker";
// import { db } from '../firebase/config';
import Firebase from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite'
import { collection, addDoc } from "firebase/firestore"; 

interface IProps {
  people: Props["people"];
  setPeople: React.Dispatch<React.SetStateAction<Props["people"]>>;
}

export const Form: React.FC<IProps> = ({ people, setPeople }) => {

  const firebaseConfig = {
    apiKey: "AIzaSyAyXC8wcA_Sp7mlYhIVGQWq_lzZ3mToROM",
    authDomain: "annexsurvey.firebaseapp.com",
    projectId: "annexsurvey",
    storageBucket: "annexsurvey.appspot.com",
    messagingSenderId: "359466466189",
    appId: "1:359466466189:web:47046ce81acfb86c6cdbc4",
    measurementId: "G-GHMY037PGG",
  };

  const app = Firebase.initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const [input, setInput] = useState<{ [key: string]: any }>({
    name: "",
    location: "",
    timeWindows: [],
    numTrees: "",
  });

  const [job, setJob] = useState<{ [key: string]: any }>({
    location: [],
    duration: 0,
    timeWindows: [],
  });

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
    setJob({
      ...job,
      location: [parseInt(location.longitude), parseInt(location.latitude)]
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
    alert("Time Added");
    setInput({
      ...input,
      timeWindows: [...timeWindows, [startdate, enddate]],
    });

    let start_time= startdate.toLocaleTimeString().slice(0,-2);
    let end_time= enddate.toLocaleTimeString().slice(0,-2);
    let start_time_formatted = start_time.split(":");
    let end_time_formatted = end_time.split(":");
    let start_time_seconds = (+start_time_formatted[0]) * 60 * 60 + (+start_time_formatted[1]) * 60 + (+start_time_formatted[2]); 
    let end_time_seconds = (+end_time_formatted[0]) * 60 * 60 + (+end_time_formatted[1]) * 60 + (+end_time_formatted[2]);
    
    setJob({
      ...job,
      timeWindows: [...timeWindows, [start_time_seconds, end_time_seconds]]
    })
    
    
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

    setJob({
      ...job,
      duration: parseInt(input.numTrees) * 5 * 60
    })

    // let test = collection(db, 'SurveyResponses');
    // addDoc(test, {
    //   answer:"hello"
    // })
    // db.collection("SurveyResponses").add({answer: "hello"});

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
