import * as React from "react";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
// import { Paper, Accordion, Alert } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteBooking } from "../../redux/actions";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FlightContext } from "../../Context/FlightContext";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


  
export default function ShowFlight() {
  let {AddTicket} = useContext(FlightContext)

  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  // const handleDelete = (e) => {
  //   const id = parseInt(e.currentTarget.id)
  //   dispatch(deleteBooking(id));
  // };
  // console.log(data);
  async function AddNewTicket(id ,section ,price ,FlightClass ,flightID) {
    let{data} = await AddTicket(id ,section ,price ,FlightClass ,flightID)
    console.log(data)
  }
  return (
    <>
      {data.length && (
        <TableContainer  className="container">
          <Table  >
            <TableHead>
              <TableRow>
                <StyledTableCell>Destination Form</StyledTableCell>
                <StyledTableCell >Destination To</StyledTableCell>
                {/* <StyledTableCell >Adults</StyledTableCell>
                <StyledTableCell >Children</StyledTableCell> */}
                <StyledTableCell >Check In</StyledTableCell>
                <StyledTableCell >Check Out</StyledTableCell>
                {/* <StyledTableCell >Delete</StyledTableCell> */}
                <StyledTableCell >Details</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data , index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {data.from}
                  </StyledTableCell>
                  <StyledTableCell >{data.to}</StyledTableCell>
                  {/* <StyledTableCell >{data.adults}</StyledTableCell>
                  <StyledTableCell >{data.children}</StyledTableCell> */}
                  <StyledTableCell >{data.checkin}</StyledTableCell>
                  <StyledTableCell >{data.checkout}</StyledTableCell>
                  {/* <StyledTableCell >
                    <button
                      className="btn btn-xs bg-red-500 text-white"
                      id={`${data.id}`}
                      onClick={(e) => handleDelete(e)}
                    >
                      {" "}
                      <MdDelete />
                    </button>
                  </StyledTableCell> */}
                  <StyledTableCell >
                    <Link to='FlightDetails'
                    className="btn btn-xs bg-red-500 text-white"
                    onClick={()=> {AddNewTicket(2025, 0 , 15 ,0 , 1)}}
                    >
                      {" "}
                      Book 
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
