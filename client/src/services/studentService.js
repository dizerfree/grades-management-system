import axios from 'axios';

export const studentService = {
  getStudents: () => {
    return axios.get('http://localhost:5000/students');
  },

  createStudent: (student) => {
    return axios.post('http://localhost:5000/students', student);
  },

  deleteStudent: (id) => {
    return axios.delete(`http://localhost:5000/students/${id}`);
  },

  editStudent: (nextStudentState) => {
    return axios.put(`http://localhost:5000/students/${nextStudentState._id}`, nextStudentState);
  }
};
