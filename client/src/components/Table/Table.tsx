import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import style from "./Table.module.css"
import Loader from '../Loader/Loader';

// Define interfaces for table columns and props
interface TableColumn {
  title: string;
  dataKey: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  rowsPerPage: number;
  error?: Boolean;
  isLink?: Boolean;
}

const CustomTable: React.FC<TableProps> = ({ columns, data, rowsPerPage, error, isLink }) => {

  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Slice the data array to get the data for the current page
  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    // Reset to page 1 whenever filteredData changes
    setCurrentPage(1);
  }, [data]);

  // Styles for table header (th)
  const thStyle = {
    backgroundColor: '#a2d2ff', // --bleu-ciel
    color: 'white',
  };

  // Styles for table data cells (td)
  const tdStyle = {
    backgroundColor: '#e9ecef !important', // --gris-ciel
    color: 'black',
  };

  // Function to check if a value is a date
  const isDate = (value: any): boolean => {
    // Use Moment.js to check if the value is a valid date
    return moment(value, moment.ISO_8601, true).isValid();
  };

  // Function to handle sorting
  const handleSort = (field: string) => {
    // Toggle sorting order if the same column is clicked
    const order = field === sortedColumn && sortOrder === 'asc' ? 'desc' : 'asc';

    // Copie triée de la liste complète des données
    const sorted = [...data].sort((a, b) => {
      const aValue = a[field] ?? '';
      const bValue = b[field] ?? '';

      return order === 'asc' ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
    });

    setSortedColumn(field);
    setSortOrder(order);
    // Update state with the sorted data
    // Here, you might want to implement pagination logic if needed
  };

  // Function to handle pagination
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="mt-4">
      {/* React Bootstrap Table component */}


      {error ?
        <div className='mb-3'>
          <Loader />
        </div> : <Table bordered hover responsive>
          <thead>
            <tr>
              {/* Map through columns and create th elements */}
              {columns.map((column, colIndex) => (
                <th key={colIndex} onClick={() => handleSort(column.dataKey)} style={thStyle}>
                  {column.title}
                  {sortedColumn === column.dataKey && (
                    <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Map through current data and create tr elements */}
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex} role='button'>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} style={tdStyle}>
                    {/* This is navigating to the first property of the object */}
                    <Link to={isLink ? `./${Object.values(row)[0]}` : `./`}
                      className="nav-link">
                      {row[column.dataKey]}
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

      }
      {/* Pagination buttons */}
      <div className="d-flex justify-content-between align-items-center">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="secondary" style={tdStyle}>
          Précédent
        </Button>
        <span>{`Page ${currentPage} sur ${totalPages}`}</span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages} style={tdStyle}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default CustomTable;
