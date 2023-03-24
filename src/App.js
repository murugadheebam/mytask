import './App.css';
import Layout from './Layout';
import Course from './courses/Course';
import Student from './student/Student';
import Stafflist from './staff/Stafflist';
import Staff from './staff/Staff';
import Courselist from './courses/Courselist';
import Studentlist from './student/Studentlist';
import EditCourse from './courses/EditCourse';
import Editstaff from './staff/Editstaff';
import EditStudent from './student/EditStudent';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Courselist  heading="Courselist"/>} />
        <Route path="/addcourse" element={<Course  heading="Course"/>} />
        <Route path="/editcourse/:id" element={<EditCourse  heading="Course"/>} />

        <Route path="/addstudent" element={<Student  heading="Student"/>} />
        <Route path="/student" element={<Studentlist  heading="Student"/>} />
        <Route path="/editstudent/:id" element={<EditStudent  heading="Staff"/>} />


        <Route path="/addstaff" element={<Staff  heading="Staff"/>} />
        <Route path="/staff" element={<Stafflist  heading="Staff"/>} />
        <Route path="/editstaff/:id" element={<Editstaff  heading="Staff"/>} />



    
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;