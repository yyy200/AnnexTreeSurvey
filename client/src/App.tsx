import React, {useState} from "react";
import "./App.css";
import { Form } from "./components/Form";
import {List} from "./components/List";

interface Location {
  coordinates: {lat: string, lng: string}
}
export interface IState {
  people: {
    name: string, 
    location: string,
    date: string, 
    time:string,
    numTrees: number
  }[]
}


function App() {

  const [people, setPeople] = useState<IState["people"]>([
    {
      name:"Joe",
      location: "1000 street",
      date: "May 6th",
      time: "10pm",
      numTrees: 5
    }
  ])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Annex Tree Surveying Scheduling</h1> 
        <Form people={people} setPeople={setPeople}/>
      </header>
      <List people={people}/>
    </div>
  );
}

export default App;
