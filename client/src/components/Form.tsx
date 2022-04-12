import React, { useEffect, useState } from 'react'
import {IState as Props} from "../App"
import useGeoLocation from '../hooks/getGeoLocation';

//@ts-expect-error
import DateTimePicker from 'react-datetime-picker'

interface IProps{
    people: Props["people"]
    setPeople: React.Dispatch<React.SetStateAction<Props["people"]>>
}

export const Form: React.FC<IProps> = ({people, setPeople}) => {

    const[input, setInput] = useState({
        name: "",
        location: "",   
        date: "",
        time: "",
        numTrees: ""
    })

    const location = {
        longitude: useGeoLocation().coordinates.lng,
        latitude: useGeoLocation().coordinates.lat
    }

    //how do i make this longitude and latitude as a single string
    input.location = location.latitude

    const [date, setDate] = useState(new Date());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleLocation = ():void => { 
        alert("Location Saved");
    } 
    
    const changeDate = (date: Date) => {
        setDate(date)
        input.date = date.toLocaleDateString()
        input.time = date.toLocaleTimeString()
    }

    const handleClick = (): void => {
        if(!input.name){
            return
        }

        setPeople([
            ...people,
            {
                name: input.name,    
                location: input.location,
                date: input.date,
                time: input.time,
                numTrees: parseInt(input.numTrees)
            }
        ]);

        setInput({
            name: "",
            numTrees: "",
            date: "",
            time: "",
            location: ""
        })
    }

    return (
        <div>
            <form>    
                <button onClick={handleLocation} className="submit-btn">Click to Set Location</button>
                <input type="text" placeholder="Name" value={input.name} onChange={handleChange} name="name" autoComplete='off' className="form-input"></input>
                <input type="number" placeholder="Number of Trees" value={input.numTrees} onChange={handleChange} name="numTrees" autoComplete='off' className="form-input"></input> 
                <div className="calendar">
                    <DateTimePicker onChange={changeDate} value={date} disableClock={true} />
                </div>
                <button onClick={handleClick} className="submit-btn">Book Appointment</button>
                <p>Location: {input.location}</p>
                <p>{input.date}</p>
                <p>{date.toLocaleTimeString()}</p>
            </form> 
        </div>
    );

}