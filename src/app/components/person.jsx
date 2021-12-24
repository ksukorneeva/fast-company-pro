import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";
import Qualitie from "./qualitie";

const Person = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    const [person, setPerson] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setPerson(data));
    }, []);
    const handleReturn = () => {
        history.push("/users");
    };
    return (
        <div>
            {person && (
                <div>
                    <h1>{person.name}</h1>
                    <p>{`Профессия: ${person.profession.name}`}</p>
                    {person.qualities.map((qual) => (
                        <Qualitie {...qual} key={qual._id} />
                    ))}
                    <p>{`Встретился, раз: ${person.completedMeetings}`}</p>
                    <p>{`Рейтинг: ${person.rate}`}</p>
                    <button
                        onClick={() => {
                            handleReturn();
                        }}
                    >
                        Все пользователи
                    </button>
                </div>
            )}
        </div>
    );
};

export default Person;
