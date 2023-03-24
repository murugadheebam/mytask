import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from '@mui/material';
import { getallcourse,deletecourse } from '../services/courseservice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Courselist = () => {
    const [courses, setCourses] = useState([])
    const [isdelete, setdelete] = useState(false)

    useEffect(() => {
        getallcourse().then(response => {
            console.log(response.data.courses)
            setCourses(response.data.courses)
        })
            .catch(function (error) {
                console.log(error);
            })

    }, [isdelete])
    
    const delete_course = (id) => {
        deletecourse(id).then((data)=>{
            setdelete(true)
        })
    }
    return (
        <>
            <a href='/addcourse' className="btn btn-outline-primary waves-effect"><span>Create</span></a>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: 170 }} >Name</TableCell>
                        <TableCell style={{ minWidth: 170 }} >Description</TableCell>
                        <TableCell style={{ minWidth: 170 }} >Fee</TableCell>
                        <TableCell style={{ minWidth: 170 }} >Duration</TableCell>
                        <TableCell style={{ minWidth: 170 }} >Action</TableCell>




                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.length >0 && courses
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.fee}</TableCell>
                                    <TableCell>{row.duration}</TableCell>
                                    <TableCell>
                                        <a href={"/editcourse/" + row._id} className="btn btn-outline-primary waves-effect"><EditIcon/></a>
                                        <button className="btn btn-outline-primary waves-effect" onClick={()=> delete_course(row._id)}><DeleteIcon/></button>

                                    </TableCell>

                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>

        </>

    );
};
export default Courselist;