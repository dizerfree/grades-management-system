import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

export default function ShowStudent({
  list: studentsList,
  onDeleteBtnClick,
  onEditBtnClick,
}) {
  const classes = useStyles();

  return (
    <>
    <h2 align='left'>Всі студенти</h2>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ПІБ</StyledTableCell>
            <StyledTableCell align="center">Номер заліковки</StyledTableCell>
            <StyledTableCell align="center">Оцінка</StyledTableCell>
            <StyledTableCell align="center">Дисципліна</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsList.map((student, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">
                {student.studentName}
              </StyledTableCell>
              <StyledTableCell align="center">{student.regNo}</StyledTableCell>
              <StyledTableCell align="center">{student.grade}</StyledTableCell>
              <StyledTableCell align="center">{student.section}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton aria-label="delete" className={classes.margin} onClick={() => onDeleteBtnClick(student._id)}>
                   <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="edit" className={classes.margin} onClick={() => onEditBtnClick(student)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
