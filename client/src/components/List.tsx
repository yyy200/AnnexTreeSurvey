import React from 'react'
import { IState as Props } from "../App";

interface IProps {
    people: Props["people"]
}

export const List: React.FC<IProps> = ({ people }) => {

    const renderList = (): JSX.Element[] => {
        return people.map(person => {
            return (
                <li className="List">
                    <p>{person.name}</p>
                    <p>{person.location}</p>
                    <p>{person.date}</p>
                    <p>{person.time}</p>
                    <p>{person.numTrees}</p>
                </li>
            )
        })
    }

    return (
        <ul>
            {renderList()} 
        </ul>
    )
}

