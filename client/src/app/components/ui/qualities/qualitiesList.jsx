import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
// import { useQualities } from "../../../hooks/useQualities";
import { useSelector, useDispatch } from "react-redux";
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    // const { isLoading } = useQualities();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) return "loading...";
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    return (
        <>
            {qualitiesList.map((qual) => (
                <Qualitie key={qual._id} {...qual} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
