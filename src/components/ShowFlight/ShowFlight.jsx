import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  const data = useSelector((state) => state.data);
  const currentTime = new Date();

  // Calculate the time 24 hours from now
  const twentyFourHoursLater = new Date(
    currentTime.getTime() + 24 * 60 * 60 * 100
  );

  return (
    <>
      {data.length && (
        <TableContainer className="container">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Destination Form</StyledTableCell>
                <StyledTableCell>Destination To</StyledTableCell>
                <StyledTableCell>Check In</StyledTableCell>
                <StyledTableCell>Check Out</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {data.from}
                  </StyledTableCell>
                  <StyledTableCell>{data.to}</StyledTableCell>
                  <StyledTableCell>{data.checkin}</StyledTableCell>
                  <StyledTableCell>{data.checkout}</StyledTableCell>
                  <StyledTableCell>
                    <Link
                      to={`/addticket/${data.id}`}
                      className="btn btn-xs bg-red-500 text-white"
                      disabled={twentyFourHoursLater <= data.checkin ? true : false}
                    >
                      Book Now
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
