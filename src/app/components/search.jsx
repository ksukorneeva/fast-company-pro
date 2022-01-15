import propTypes from "prop-types";
import React from "react";

const Search = (props) => {
    const handleSearch = ({ target }) => {
        props.search(target.value);
    };
    return (
        <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}/>
    );
};
Search.propTypes = {
    props: propTypes.array,
    search: propTypes.func
};

export default Search;
