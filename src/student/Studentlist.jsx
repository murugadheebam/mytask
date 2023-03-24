import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getallstudents } from '../services/studentservice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Studentlist = () => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        getallstudents().then(response => {
            setStudents(response.data.students)
        })
            .catch(function (error) {
                console.log(error);
            })

    }, [])
    return (
        <>
            <a href='/addstudent' className="btn btn-outline-primary waves-effect"><span>Create</span></a>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: 170 }} >Name</TableCell>
                        <TableCell style={{ minWidth: 170 }} >Email</TableCell>
                        <TableCell style={{ minWidth: 170 }} >DOB</TableCell>
                        <TableCell style={{ minWidth: 170 }} >Gender</TableCell>
                        <TableCell style={{ minWidth: 170 }} >Mobile Number</TableCell>
                        <TableCell style={{ minWidth: 170 }} >Action</TableCell>



                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.length >0 && students
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.dob}</TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.mobileno}</TableCell>
                                    <TableCell>
                                        <a href={"/editstudent/" + row._id} className="btn btn-outline-primary waves-effect"><EditIcon/></a>
                                        <a href='/addcourse' className="btn btn-outline-primary waves-effect"><DeleteIcon/></a>

                                    </TableCell>


                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>

        </>

    );
};
export default Studentlist;