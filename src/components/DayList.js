import React, {useState} from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
    const dayListItems = props.days.map(day => {
        return (
            <li>
                <DayListItem key={day.id} name={day.name} spots={day.spots} />
            </li>
        );
    })
    return (
        <ul>
            {dayListItems}
        </ul>
    );
};