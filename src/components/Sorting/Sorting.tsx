import React from "react";
import { sortingOptions } from "../../constants";
import Select from "../Select";
import { SortingOptions, useProductStore } from "../../store/productStore";

const Sorting = () => {
    const {setSorting} = useProductStore()
  return (
    <div className="min-w-[150px]">
        <Select
          options={sortingOptions}
          value="New"
          placeholder="sortBy"
          onSelect={(keys) => { 
            console.log(keys.currentKey)
            keys.currentKey && setSorting(keys.currentKey as SortingOptions)}}
        />
    </div>
  );
};

export default Sorting;
