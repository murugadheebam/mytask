import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';
import { createcourse } from './services/courseservice';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CourseSchema = Yup.object().shape({
    name: Yup.string()
        .required("Course name is required"),
    description: Yup.string()
        .required("Course description is required"),
});



const Student = () => {
    return (
        <Formik
            initialValues={{ name: "", gender: "male", dob: "", email: "", mobileno: "" }}
            validationSchema={CourseSchema}
            onSubmit={(values) => {
                console.log(values);
                createcourse(values).then(response => {
                    console.log(response)
                })
                    .catch(function (error) {
                        console.log(error);
                    })
            }}
        >
            {({ touched, errors, isSubmitting,setFieldValue, values, handleChange, handleBlur, handleSubmit }) =>
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
                            defaultValue="female"
                            name="gender"
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
                    <div>
                        <Button variant="outlined" size="small" type="submit" >Submit</Button>
                    </div>
                </Form>

            }
        </Formik>

    );
};
export default Student;