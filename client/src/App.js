import React, {useEffect, useState} from 'react';
import {AppBar, Typography, Box, Toolbar, Paper} from '@material-ui/core';
import StudentsList from './components/StudentList';
import StudentForm from './components/StudentForm';
import useStyles from './styles';
import './App.css';
import {studentService} from './services/studentService';

const MODES = {
  REST: 'REST',
  EDIT: 'EDIT',
  ADD: 'ADD',
}

function makeEmptyStudent () {
  return {
    regNo: 0,
    studentName: '',
    grade: '',
    section: '',
  }
}

function App() {
  const [studentsList, setStudentsList] = useState([]);
  const [mode, setMode] = useState(MODES.ADD);
  const [studentUnderEdit, setStudentUnderEdit] = useState(makeEmptyStudent());

  const refreshStudents = () => {
    return studentService.getStudents()
      .then((res) => {
        setStudentsList((res.data))
      });
  };

  useEffect(() => {
    return refreshStudents();
  }, []);

  const handleFormSubmit = async (student) => {
    if (mode === MODES.ADD) {
      await studentService.createStudent(student);
    }
    if (mode === MODES.EDIT) {
      await studentService.editStudent(student);
    }
    setMode(MODES.ADD);
    setStudentUnderEdit(makeEmptyStudent());
    return refreshStudents();
  }

  const handleEditBtnClick = (student) => {
    setStudentUnderEdit(student);
    setMode(MODES.EDIT);
  }

  const handleDeleteBtnClick = (id) => {
     if (!!studentUnderEdit && studentUnderEdit._id === id) {
       setStudentUnderEdit(makeEmptyStudent());
     }
     return studentService.deleteStudent(id).then(() => {
       return refreshStudents();
     });
  }

  const classes = useStyles();

  const formTitle = mode === MODES.ADD
    ? 'Додати студента'
    : 'Редагувати студента';

  return (
    <div className='App'>
      <AppBar position="static">
        <Toolbar>
          <Box>
            <Typography variant="h5" className={classes.title}>
              Електронні відомості для обліку успішності студентів
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box display={'flex'}>
        <Box m={3} width={'320px'}>
          <Paper>
            <Box p={4}>
              <h2>{formTitle}</h2>
              <StudentForm
                student={studentUnderEdit}
                onSubmit={handleFormSubmit}
              />
            </Box>
          </Paper>
        </Box>

        <Box m={3} flexGrow={1}>
          <Paper>
            <Box p={4}>
              <StudentsList
                list={studentsList}
                onDeleteBtnClick={handleDeleteBtnClick}
                onEditBtnClick={handleEditBtnClick}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default App;
