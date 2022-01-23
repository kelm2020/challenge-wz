import React, { useState, useEffect, FC } from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const BasicTable: FC = () => {
  const [ alerts, setAlerts ] = useState<Alerts | undefined>(undefined);
  const [ loading, setLoading ] = useState(false);
  const [page, setPage] = React.useState(0);

  const handleSetLoading = () => {
    setLoading(!loading)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getAlerts = async () => {
    console.log('entre')
    handleSetLoading();
    try {
      const response = await fetch('http://localhost:5000/alerts')
      const data = await response.json()
      setAlerts(data)
    } catch (e) {
      console.error(e);
      handleSetLoading();
    }
    handleSetLoading();
  }

  useEffect(() => {
    getAlerts();
  }, []);

  const classes = useStyles();

  return (
    <>
      <Paper>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Rule</TableCell>
                <TableCell align="center">Agent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts && alerts.data.map((alert) => (
                <TableRow key={alert._id}>
                  <TableCell align="center" component="th" scope="row">
                    {alert._id}
                  </TableCell>
                  <TableCell align="center">{alert._source.timestamp}</TableCell>
                  <TableCell align="center">{alert._source.rule.description}</TableCell>
                  <TableCell align="center">{alert._source.agent.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {alerts && alerts.data.length > 0 && (
          <TablePagination
            component="div"
            count={alerts.data.length}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          />)
        }
      </Paper>
    </>
  );
}

export default BasicTable;