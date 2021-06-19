import StudentData from '../models/student.js';

export const getStudents = async(req, res) => {
    try {
        const allStudents = await StudentData.find();

        res.status(200).json(allStudents);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const createStudents = async (req, res) => {
   const student = req.body;

   const newStudent = new StudentData(student);

   try {
       await newStudent.save();
       res.status(201).json(newStudent);
   } catch (error) {
       res.status(409).json({message: error.message});
   }
};

export const deleteStudent = async (req, res) => {
    const id = req.params.id;

    try {
        await StudentData.findByIdAndRemove(id).exec();
        res.send('Successfully Deleted!')
    } catch (error) {
        console.log(error);
    }
 };

export const editStudent = async (req, res) => {
    const studentId = req.params.id;
    const student = req.body;
    try {
      const updatedStudent = await StudentData.findByIdAndUpdate(studentId, student, {new: true});
      res.send(updatedStudent);
    } catch (err) {
      res.status(500).send();
    }
};