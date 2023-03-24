import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, FormControl } from '@mui/material';
import { createcourse } from './services/courseservice';

const CourseSchema = Yup.object().shape({
    name: Yup.string()
        .required("Course name is required"),
    description: Yup.string()
        .required("Course description is required"),
});



const Staff = () => {
    return (
        <Formik
            initialValues={{ name: "", description: "", fee: "", duration: "" }}
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
            {({ touched, errors, isSubmitting, values, handleChange, handleBlur, handleSubmit }) =>
                <Form>
                    <h4>Add  Staff</h4>
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
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Gender"
                            name="gender"

                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className='form-input'>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Date of Birth"
                            name="dob"

                            value={values.fee}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className='form-input'>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={values.duration}
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
                            value={values.duration}
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
export default Staff;