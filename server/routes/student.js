import express from 'express'
import {getStudents, createStudents, deleteStudent, editStudent} from '../controllers/student.js'
import student from '../models/student.js';

const router = express.Router();

router.get('/', getStudents);
router.post('/', createStudents);
router.put('/:id', editStudent);
router.delete('/:id', deleteStudent);

export default router;
