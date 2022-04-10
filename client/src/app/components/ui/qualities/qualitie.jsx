import PropTypes from "prop-types";
import React from "react";
// import { useQualities } from "../../../hooks/useQualities";
const Qualitie = ({ _id, color, name }) => {
    // const { getQuality } = useQualities();
    // const } = getQuality(id);
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
};
Qualitie.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Qualitie;
