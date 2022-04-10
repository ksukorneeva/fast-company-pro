import React, { useState, useEffect } from "react";
// import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useParams, useHistory } from "react-router-dom";
// import * as yup from "yup";

const EditPage = () => {
    const history = useHistory();
    const params = useParams();
    const [user, setUser] = useState();
    const [qualities, setQualitiees] = useState({});
    const [professions, setProfession] = useState();
    // const [errors, setErrors] = useState({});
    useEffect(() => {
        api.users.getById(params.userId).then((data) => setUser(data));
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualitiees(data));
    }, []);
    let qualitiesArray = [];
    let professionArray = [];
    if (user) {
        qualitiesArray =
        user.qualities.map(optionName => ({
            label: optionName.name,
            value: optionName._id
        }));
        professionArray = {
            name: user.profession.name,
            value: user.profession._id
        };
    };
    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    // const validateScheme = {
    //     profession: yup
    //         .string()
    //         .required("Обязательно выберете вашу профессию"),
    //     email: yup
    //         .string()
    //         .required("Электронная  почта обязательна для заполнения")
    //         .email("Email введен некорректно"),
    //     name: yup
    //         .string()
    //         .required("Имя обязательно для заполнения")
    // };
    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Электронная  почта обязательна для заполнения"
    //         },
    //         isEmail: {
    //             message: "Email введен некорректно"
    //         }
    //     },
    //     profession: {
    //         isRequired: {
    //             message: "Обязательно выберете вашу профессию"
    //         }
    //     },
    //     name: {
    //         isRequired: {
    //             message: "Имя обязательно для заполнения"
    //         }
    //     }

    // };
    // useEffect(() => {
    //     validate();
    // }, []);
    // const validate = () => {
    //     // const errors = validator(user, validatorConfig);
    //     validateScheme
    //         .validate()
    //         .then(() => setErrors({}))
    //         .catch((err) => setErrors({ [err.path]: err.message }));
    //     // setErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };
    // const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        // const raw = localStorage.getItem("users");
        // const person = JSON.parse(raw);
        // // const isValid = validate();
        // // if (!isValid) return;
        // // e.target.forEach((item))
        // for (let i = 0; i < person.length; i++) {
        // if (person[i]._id === user._id) {
        user.name = e.target.name.defaultValue;
        user.email = e.target.email.defaultValue;
        user.profession = e.target.professions.value;
        user.sex = e.target.sex.value;
        // user.qualities = e.target.qualities;
        // user.qualities =
        // }
        // }
        // localStorage.setItem("users", JSON.stringify(person));
        // console.log(localStorage.getItem("users"));
        // console.log(person);
        // console.log("target", e.target.professions.value);
        // console.log(e.target.professions.name);
        // console.log(e);
        // e.target.qualities.forEach(value => console.log(value.label));
        // console.log("user", user.qualities);
        user && api.users.update(user._id, user).then((data) => setUser(data));
        user && history.push(`/users/${user._id}`);
    };
    if (user && professions && qualities) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                // error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                // error={errors.email}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                onChange={handleChange}
                                options={professions}
                                defaultOption="Choose..."
                                // error={errors.profession}
                                value={professionArray.value}
                                name="professions"
                            />
                            <RadioField
                                onChange={handleChange}
                                options={[{ name: "Male", value: "male" }, { name: "Female", value: "female" }, { name: "Other", value: "other" }]}
                                value={user.sex}
                                name="sex"
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                name="qualities"
                                onChange={handleChange}
                                label="Выберите ваши качества"
                                defaultValue={qualitiesArray}
                            />
                            <button
                                type="submit"
                                // disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"

                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default EditPage;
