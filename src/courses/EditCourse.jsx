import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { createcourse, getcoursebyid,editcourse } from '../services/courseservice';
import { useParams } from 'react-router';



const CourseSchema = Yup.object().shape({
    name: Yup.string()
        .required("Course name is required"),
    description: Yup.string()
        .required("Course description is required"),
});


const EditCourse = () => {
    const navigation = useNavigate()
    const params = useParams()
    const [course, setCourse] = useState({})

    useEffect(() => {
        getcoursebyid(params.id).then(response => {
            setCourse(response.data.course[0])
        })
            .catch(function (error) {
                console.log(error);
            })

    }, [])


    return (
        <>
            <Formik
                initialValues={{ name: course.name, description:  course.description, fee: course.fee, duration: course.duration,_id:params.id }}
                enableReinitialize
                validationSchema={CourseSchema}
                onSubmit={(values) => {
                    console.log(values);
                    editcourse(values).then(response => {
                        console.log(response)
                        navigation('/');

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                }}
            >
                {({ touched, errors, isSubmitting, values, handleChange, handleBlur, handleSubmit }) =>
                    <Form>
                        <h4>Edit course</h4>
                        <div className='form-input'>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Name"
                                name="name"
                                InputLabelProps={{ shrink: true }}  

                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className='form-input'>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Description"
                                name="description"
                                InputLabelProps={{ shrink: true }}  
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className='form-input'>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Fees"
                                name="fee"
                                InputLabelProps={{ shrink: true }}  

                                value={values.fee}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className='form-input'>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Duration"
                                name="duration"
                                value={values.duration}
                                InputLabelProps={{ shrink: true }}  
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
        </>

    );
};
export default EditCourse;