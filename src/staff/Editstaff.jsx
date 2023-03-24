import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getallcourse } from '../services/courseservice';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createstaff, getstaffbyid, updatestaff } from '../services/staffservice';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment'



const StaffSchema = Yup.object().shape({
    name: Yup.string()
        .required("name is required"),

});



const Editstaff = () => {
    const [selectedFile, setSelectedFile] = useState()
    const [courses, setCourses] = useState([])
    const navigation = useNavigate()
    const params = useParams()
    const [staff, setStaff] = useState({})
    const [course, setCourse] = useState('')
    const [dob, setDob] = useState('')




    const getFile = e => {
        setSelectedFile(e.target.files[0])
    }
    useEffect(() => {
        getallcourse().then(response => {
            console.log(response.data.courses)
            setCourses(response.data.courses)
        })
            .catch(function (error) {
                console.log(error);
            })

        getstaffbyid(params.id).then(response => {
            setStaff(response.data.staff[0])
            setCourse(response.data.staff[0].course)
            setDob(dayjs(moment(response.data.staff[0].dob).format('MM/DD/YYYY')))

        })
            .catch(function (error) {
                console.log(error);
            })


    }, [])
    return (
        <>
            {console.log(staff.course)}
            <Formik
                initialValues={{ name: staff.name, gender: staff.gender, dob: "", email: staff.email, mobileno: staff.mobileno, course_id: staff.course }}
                enableReinitialize
                validationSchema={StaffSchema}
                onSubmit={(values) => {
                    const formData = new FormData();
                    formData.append("gender", values.gender);
                    formData.append("name", values.name);
                    formData.append("dob", dob);
                    formData.append("email", values.email);
                    formData.append("mobileno", values.mobileno);
                    formData.append("profile", selectedFile);
                    formData.append("course", course);
                    formData.append("_id", staff._id);


                    updatestaff(formData).then(response => {
                        console.log(response)
                        navigation('/staff');
                    })
                        .catch(function (error) {
                            console.log(error);
                        })
                }}
            >
                {({ touched, errors, isSubmitting, values, handleChange, handleBlur, handleSubmit, setFieldValue }) =>
                    <Form>
                        <h4>Edit Staff</h4>
                        <div className='form-input'>
                            <TextField
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>

                        <div className='form-input'>
                            <FormLabel id="gender">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="gender"
                                name="gender"
                                value={values.gender}
                                onChange={(value) => setFieldValue("gender", value.target.value)}
                                row
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" checked={staff.gender == 'female'} />
                                <FormControlLabel value="male" control={<Radio />} label="Male" checked={staff.gender == 'male'} />
                                <FormControlLabel value="other" control={<Radio />} label="Other" checked={staff.gender == 'other'} />
                            </RadioGroup>
                        </div>

                        <div className='form-input'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Date of Birth"
                                        value={dob}
                                        onChange={(value) => {
                                            setFieldValue("dob", value, true)
                                            setDob(value)
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                        </div>

                        <div className='form-input'>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                InputLabelProps={{ shrink: true }}
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>

                        <div className='form-input'>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Mobile No"
                                name="mobileno"
                                InputLabelProps={{ shrink: true }}
                                value={values.mobileno}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className='form-input'>
                            <select className='form-control' onChange={(value) => {
                                setCourse(value.target.value)
                            }}>
                                <option value="">Select</option>
                                {courses.map((row) => {
                                    return (
                                        <option value={row._id} key={row._id} selected={row._id == course}>{row.name}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        <div className='form-input'>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                type="file"
                                onChange={getFile}
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="raised" component="span" >
                                    Profile Image
                                </Button>
                            </label>
                        </div>
                        <div>
                            <Button variant="outlined" size="small" type="submit" >Submit</Button>
                        </div>
                    </Form>

                }
            </Formik>
        </>

    );
};
export default Editstaff;