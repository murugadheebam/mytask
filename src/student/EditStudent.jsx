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
import { getstudentbyid,updatestudent } from '../services/studentservice';
import { useParams } from 'react-router';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment'

const CourseSchema = Yup.object().shape({
    name: Yup.string()
        .required("Course name is required"),
});



const EditStudent = () => {
    const navigation = useNavigate()
    const params = useParams()

    const [selectedFile, setSelectedFile] = useState()
    const [courses, setCourses] = useState([])
    const [student, setStudent] = useState({})
    const [course, setCourse] = useState('')
    const [dob, setDob] = useState('')


    const getFile = e => {
        setSelectedFile(e.target.files[0])
    }
    useEffect(() => {

        getstudentbyid(params.id).then(response => {
            // console.log(response.data.student[0])
            setStudent(response.data.student[0])
            setDob(dayjs(moment(response.data.student[0].dob).format('MM/DD/YYYY')))
            setCourse(response.data.student[0].course)

        })
            .catch(function (error) {
                console.log(error);
            })

        getallcourse().then(response => {
            setCourses(response.data.courses)
        })
            .catch(function (error) {
                console.log(error);
            })


    }, [])
    return (
        <>
            <Formik
                initialValues={{ name: student.name, gender: student.gender, dob: student.dob, email: student.email, mobileno: student.mobileno, course_id: student.course,_id:student._id }}
                enableReinitialize
                validationSchema={CourseSchema}
                onSubmit={(values) => {
                    console.log(values);
                    const formData = new FormData();
                    formData.append("gender", values.gender);
                    formData.append("name", values.name);
                    formData.append("dob", dob);
                    formData.append("email", values.email);
                    formData.append("mobileno", values.mobileno);
                    formData.append("profile", selectedFile);
                    formData.append("course", course);
                    formData.append("_id", student._id);

                    
                    updatestudent(formData).then(response => {
                        navigation('/student');
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                }}
            >
                {({ touched, errors, isSubmitting, setFieldValue, values, handleChange, handleBlur, handleSubmit }) =>
                    <Form>
                        <h4>Edit Student</h4>
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
                                <FormControlLabel value="female" control={<Radio />} label="Female" checked={student.gender == 'female'} />
                                <FormControlLabel value="male" control={<Radio />} label="Male" checked={student.gender == 'male'} />
                                <FormControlLabel value="other" control={<Radio />} label="Other" checked={student.gender == 'other'} />
                            </RadioGroup>
                        </div>
                        {console.log(dob)}
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
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputLabelProps={{ shrink: true }}

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
                                InputLabelProps={{ shrink: true }}

                            />
                        </div>
                        <div className='form-input'>
                            <select className='form-control'  onChange={(value) => {
                                setCourse(value.target.value)}}>
                            <option value="">Select</option>
                            {courses.map((row) => {
                            return (
                                <option value={row._id} key={row._id} selected={row._id == course}>{row.name}</option>
                            )})
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
export default EditStudent;