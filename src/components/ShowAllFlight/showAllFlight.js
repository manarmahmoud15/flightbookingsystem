import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ShowAllFlight() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5269/api/Flight");
        setData(response.data.data); 
        console.log(response.data.data)
      } catch (error) {
        console.error("Failed to fetch flights:", error);
        setError('Failed to fetch flights');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (event) => {
    const id = event.target.id;
    try {
      await axios.delete(`http://localhost:5269/api/Flight/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error("Failed to delete flight:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <TableContainer className="container my-5">
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Destination From</StyledTableCell>
            <StyledTableCell>Destination To</StyledTableCell>
            <StyledTableCell>Check In</StyledTableCell>
            <StyledTableCell>Check Out</StyledTableCell>
            <StyledTableCell>duration</StyledTableCell>
            <StyledTableCell>Book</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">{item.sourceAirportStateName}</StyledTableCell>
              <StyledTableCell>{item.destinationAirportStateName}</StyledTableCell>
              <StyledTableCell>{item.departureTime.split("T")[0]}</StyledTableCell>
              <StyledTableCell>{item.arrivalTime.split("T")[0]}</StyledTableCell>
              <StyledTableCell>{item.duration}</StyledTableCell>
              <StyledTableCell>
                {/* <Link to={`/FlightDetails/${item.id}`} className="btn btn-xs bg-blue-500 text-white">
                  Book Now
                </Link> */}
                
                <Link to="/ticket" className="btn btn-xs bg-blue-500 text-white">
                  Book Now
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
