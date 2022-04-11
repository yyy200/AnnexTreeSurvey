import React from "react";
import { IState as Props } from "../App";

interface IProps {
  people: Props["people"];
}

export const List: React.FC<IProps> = ({ people }) => {
  const renderList = (): JSX.Element[] => {
    return people.map((person, idx) => {
      return (
        <li key={idx} className="List">
          <p>{person.name}</p>
          <p>{person.location}</p>
          <p>{person.numTrees}</p>
          <div className="dropDown">
            <ul>
              {person.timeWindows.map((time, idx) => (
                <li
                  key={idx}
                >{`${time[0].toLocaleDateString()}\t${time[0].toLocaleTimeString()} - ${time[1].toLocaleTimeString()}`}</li>
              ))}
            </ul>
          </div>
        </li>
      );
    });
  };

  return <ul>{renderList()}</ul>;
};
