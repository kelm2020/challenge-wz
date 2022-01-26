import React, { useState, useEffect, FC } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@material-ui/core/Paper";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Alerts, MouseEventButton } from '../../interfaces'

const BasicTable: FC = () => {
  const [ alerts, setAlerts ] = useState<Alerts | undefined>(undefined);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getAlerts = async () => {
    try {
      const response = await fetch('http://localhost:5000/alerts')
      const data = await response.json()
      setAlerts(data)
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (alerts === undefined) {
      getAlerts();
    }
  }, [alerts]);

  const navigate = useNavigate();
  const handleNavigate = (id) => navigate(`/alerts/${id}`);

  const handleOnClick = (e: MouseEventButton) => {
    e.preventDefault()
    const idString = e.target.id.toString()
    handleNavigate(idString)
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
          </TableHead>
          <TableBody>
            {alerts && alerts.data && alerts.data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((alert) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={alert._id}>
                  <TableCell align="center"><button id={alert._id} onClick={handleOnClick}>Detail</button></TableCell>
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