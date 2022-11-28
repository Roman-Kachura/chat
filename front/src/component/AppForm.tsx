import * as React from 'react';
import {MessageType} from '../api/wsApi';
import {Formik} from 'formik';
import {Button, Grid, TextField} from '@material-ui/core';
import s from './style.module.css';

export const AppForm: React.FC<{ sendMessage: (msg: MessageType) => void }> = ({sendMessage}) => {
    return (
        <Formik
            initialValues={{name: '', theme: '', message: ''}}
            validate={values => {
                const errors = {name: '', theme: '', message: ''};
                if (!values.name) errors.name = 'Required';
                if (!values.theme) errors.theme = 'Required';
                if (!values.message) errors.message = 'Required';
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
            }}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(values);
                }}>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="column"
                        className={s.form}
                    >
                        <TextField
                            required
                            label="Recipient"
                            type="text"
                            name="name"
                            variant="outlined"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.name && touched.name}
                            className={s.input}
                        />

                        <TextField
                            required
                            label="Theme"
                            type="text"
                            name="theme"
                            variant="outlined"
                            value={values.theme}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.theme && touched.theme}
                            className={s.input}
                        />
                        <TextField
                            required
                            label="Message"
                            type="text"
                            name="message"
                            placeholder="Enter message"
                            variant="outlined"
                            multiline
                            value={values.message}
                            minRows={4}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.message && touched.message}
                            className={s.input}
                        />
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={s.button}
                        >
                            SEND
                        </Button>
                    </Grid>
                </form>
            )}
        </Formik>
    )
}