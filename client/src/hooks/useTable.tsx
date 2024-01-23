import React, { useEffect, useState } from "react";

// Define the type for the range arguments
type RangeArgs = (data: { [key: string]: any }, rowsPerPage: number, page?: number) => any[];

// Function to calculate the range of page numbers based on the data length and rowsPerPage
const calculateRange: RangeArgs = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data?.length / rowsPerPage);

    // Generate an array of page numbers
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
}; 

// Function to slice data based on rowsPerPage and page number
const sliceData: RangeArgs = (data, rowsPerPage, page): { [key: string]: any }[] => {

    // Ensure page has a default value of 1 if it's undefined
    const currentPage = page || 1;
    return data?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
};

// React hook to manage table data and range
const useTable: RangeArgs = (data, rowsPerPage, page = 1) => {

    // State variables for table range and sliced data
    const [tableRange, setTableRange] = useState<any>([]);
    const [slice, setSlice] = useState<any>([]);
  
    // useEffect to update the table range and sliced data when data, rowsPerPage, or page changes
    useEffect(() => {
      // Calculate and set the table range
      const range = calculateRange(data, rowsPerPage);
      setTableRange([...range]);
  
      // Slice the data based on rowsPerPage and page, then set the sliced data
      const slicedData = sliceData(data, rowsPerPage, page);
      setSlice([...slicedData]);
  
    }, [data, rowsPerPage, page]);
  
    // Return the table range and sliced data
    return [tableRange, slice];
  };
  
export default useTable;
  
