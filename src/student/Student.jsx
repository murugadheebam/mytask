import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createstudent } from '../services/studentservice';
import { getallcourse } from '../services/courseservice';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";



const CourseSchema = Yup.object().shape({
    name: Yup.string()
        .required("Course name is required"),
});



const Student = () => {
    const navigation = useNavigate()

    const [selectedFile, setSelectedFile] = useState()
    const [courses, setCourses] = useState([])


    const getFile = e => {
        setSelectedFile(e.target.files[0])
    }
    useEffect(() => {
        getallcourse().then(response => {
            setCourses(response.data.courses)
        })
            .catch(function (error) {
                console.log(error);
            })

    }, [])
    return (
        <Formik
            initialValues={{ name: "", gender: "male", dob: "", email: "", mobileno: "" ,course_id:""}}
            validationSchema={CourseSchema}
            onSubmit={(values) => {
                console.log(values);
                const formData = new FormData();
                formData.append("gender", values.gender);
                formData.append("name", values.name);
                formData.append("dob", values.dob);
                formData.append("email", values.email);
                formData.append("mobileno", values.mobileno);
                formData.append("profile", selectedFile);
                formData.append("course", values.course_id);
                createstudent(formData).then(response => {
                    // console.log(response)
                    navigation('/student');
                })
                .catch(function (error) {
                    console.log(error);
                })
            }}
        >
            {({ touched, errors, isSubmitting, setFieldValue, values, handleChange, handleBlur, handleSubmit }) =>
                <Form>
                    <h4>Add  Student</h4>
                    <div className='form-input'>
                        <TextField
                            fullWidth
                            variant="outlined"
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
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </div>

                    <div className='form-input'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Date of Birth"
                                    value={values.dob}
                                    onChange={(value) => setFieldValue("dob", value, true)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>

                    </div>

                    <div className='form-input'>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
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
                            value={values.mobileno}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className='form-input'>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Course</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.course_id}
                            label="Course"
                            onChange={(value) => setFieldValue("course_id", value.target.value)}
                        >
                            {courses.length >0 && courses.map((row) => {
                            return (
                                <MenuItem value={row._id}>{row.name}</MenuItem>
                            )})
                            }
                           
                          
                        </Select>
                        </FormControl>
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

    );
};
export default Student;