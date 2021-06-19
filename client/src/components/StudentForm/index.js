import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import {Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function StudentForm (props) {
  const classes = useStyles();
  const [student, setStudent] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setStudent(props.student);
  }, [props.student]);

  const handleSubmit = () => {
    if (!student.regNo) {
      return setErrorMsg('Некорректний номер залiкiвки');
    }
    if (!student.studentName || !student.studentName.length) {
      return setErrorMsg('Потрiбно вказати П.I.Б.');
    }
    if (!student.grade) {
      return setErrorMsg('Потрiбно вказати оцiнку');
    }
    if (Number(student.grade) < 0 || Number(student.grade) > 100) {
      return setErrorMsg('Оцінка повинна бути в межах ECTS');
    }
    if (!student.section) {
      return setErrorMsg('Потрібно обрати дисципліну');
    }
    setErrorMsg('');
    setStudent({});
    props.onSubmit(student);
  };

  return (
    <>
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      {errorMsg && (
        <Box mb={2}>
          {errorMsg}
        </Box>
      )}

      <TextField id="outlined-basic" label="Номер заліковки" variant="outlined"
         value={student.regNo}
         onChange={(event)=>{
            setStudent({...student,regNo: event.target.value})
         }}
      />
      <TextField id="outlined-basic" label="ПІБ" variant="outlined" value={student.studentName} onChange={(event)=>{
          setStudent({...student, studentName: event.target.value})
      }} />

      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Дисципліна</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={student.section}
          onChange={(event) => {
            console.log(event.target.value);
            setStudent({...student, section: event.target.value});
          }}
          label="Дисципліна"
        >
          <MenuItem value={''}>Оберiть дисципліну</MenuItem>
          <MenuItem value={'ОСіЗ'}>ОСіЗ</MenuItem>
          <MenuItem value={'РСОІ'}>РСОІ</MenuItem>
          <MenuItem value={'KPI'}>KPI</MenuItem>
          <MenuItem value={'СМТРПЗ'}>СМТРПЗ</MenuItem>
        </Select>
      </FormControl>
      <TextField id="outlined-basic" label="Оцінка" variant="outlined" value={student.grade} onChange={(event)=>{
          setStudent({...student, grade: event.target.value})
      }} />
      <Button variant="contained" color="primary" size={"large"} onClick={handleSubmit}>
        Готово!
      </Button>
    </form>
    </>
  );
}
