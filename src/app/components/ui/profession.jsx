import React from "react";
import PropTypes from "prop-types";
// import { useProfessions } from "../../hooks/useProfession";
import { useSelector } from "react-redux";
import { getProfessionsByIds, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
    // const { isLoading, getProfession } = useProfessions();
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionsByIds(id));
    if (!professionsLoading) {
        return <p>{prof.name}</p>;
    } else return "loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
