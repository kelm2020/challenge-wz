import React, { useState, useEffect, FC, useCallback} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@material-ui/core/Paper";
import { Alerts } from '../../interfaces'

import { MouseEventButton} from "../../interfaces";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  button:{
    background: '#00a9e5',
    color: '#ffffff',
    borderRadius: '6px'
  }
});

const BasicTable: FC = () => {
  const [ alerts, setAlerts ] = useState<Alerts | undefined>(undefined);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const classes = useStyles();
  const navigate = useNavigate();
  const handleNavigate = (id) => navigate(`/alerts/${id}`);
  const buttonHandler = (event: MouseEventButton) => {
    event.preventDefault();
    const idString = event.target.id.toString()
    handleNavigate(idString)
  }

  const getAlerts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/alerts')
      const data = await response.json()
      setAlerts(data)
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
<<<<<<< Updated upstream
    if (alerts === undefined) {
      getAlerts();
    }
  }, [alerts]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  console.log('page', page)
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

=======
    alerts === undefined && getAlerts();
  }, []);

>>>>>>> Stashed changes
  return (
    alerts === undefined ? <CircularProgress /> : 
    <Paper style={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
                <TableCell align="center">Detail</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Rule</TableCell>
                <TableCell align="center">Agent</TableCell>
              </TableRow>
<<<<<<< Updated upstream
          </TableHead>
          <TableBody>
            {alerts && alerts.data && alerts.data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((alert) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={alert._id}>
=======
            </TableHead>
            <TableBody>
              {alerts && alerts.data.map((alert) => (
                <TableRow key={alert._id}>
                  <TableCell align="center"><button className={classes.button} id={alert._id} onClick={buttonHandler}>Detail</button></TableCell>
>>>>>>> Stashed changes
                  <TableCell align="center" component="th" scope="row">
                    {alert._id}
                  </TableCell>
                  <TableCell align="center">{alert._source.timestamp}</TableCell>
                  <TableCell align="center">{alert._source.rule.description}</TableCell>
                  <TableCell align="center">{alert._source.agent.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={alerts.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default BasicTable;

// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// export default function StickyHeadTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//               <TableRow>
//                 <TableCell align="center">ID</TableCell>
//                 <TableCell align="center">Date</TableCell>
//                 <TableCell align="center">Rule</TableCell>
//                 <TableCell align="center">Agent</TableCell>
//               </TableRow>
//           </TableHead>
//           <TableBody>
//               {alerts && alerts.data.map((alert) => (
//                 <TableRow key={alert._id}>
//                   <TableCell align="center" component="th" scope="row">
//                     {alert._id}
//                   </TableCell>
//                   <TableCell align="center">{alert._source.timestamp}</TableCell>
//                   <TableCell align="center">{alert._source.rule.description}</TableCell>
//                   <TableCell align="center">{alert._source.agent.name}</TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 15, 20]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }