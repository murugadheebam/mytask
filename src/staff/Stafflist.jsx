import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getallstaff,deletestaff } from '../services/staffservice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment'

const Stafflist = () => {
    const [staff, setStaff] = useState([])
    const [isdelete, setdelete] = useState(false)


    useEffect(() => {
        getallstaff().then(response => {
            console.log(response.data.staff)
            setStaff(response.data.staff)
        })
            .catch(function (error) {
                console.log(error);
            })

    }, [isdelete])
    const deletStaff = (id) => {
        console.log(id);
        deletestaff(id).then((data)=>{
            setdelete(true)
        })
    }
    return (
        <>
            <a href='/addstaff' className="btn btn-outline-primary waves-effect"><span>Create</span></a>
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
                    {staff.length >0 && staff
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{moment(row.dob).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.mobileno}</TableCell>
                                    <TableCell>
                                        <a href={"/editstaff/" + row._id} className="btn btn-outline-primary waves-effect"><EditIcon/></a>
                                        <button className="btn btn-outline-primary waves-effect" onClick={()=> deletStaff(row._id)}><DeleteIcon/></button>

                                    </TableCell>


                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>

        </>

    );
};
export default Stafflist;