import React from "react";


function SearchBox(props) {
    return(
        <div className="p-2 ma2">
            <input onChange={props.searchChange} className="rounded-xl p-4 border-6 border-black bg-light-green w-1/3" type="search" placeholder="Search Products"/>
        </div>
    )
}
;
export default SearchBox;