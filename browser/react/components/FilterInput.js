import React from 'react';

const FilterInput = (props) => {


    return (
        <form className="form-group" style={{marginTop: '20px'}}>
             <input
               className="form-control"
               placeholder="Enter artist name"
               onChange={ (event) => {
                   props.filterArtists(event.target.value);
               }}
             />
        </form>
    );
}

export default FilterInput;
