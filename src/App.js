import './App.css';
import Layout from './Layout';
import Course from './Course';
import Student from './Student';
import Staff from './Staff';

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
        <Route index element={<Course  heading="Course"/>} />
        <Route path="/student" element={<Student  heading="Student"/>} />
        <Route path="/staff" element={<Staff  heading="Staff"/>} />

    
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;