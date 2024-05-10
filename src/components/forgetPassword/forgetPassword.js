import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

export default function ForgetPassword() {
  const [message, setMessage] = useState('');
  const userToken = localStorage.getItem('userToken'); 

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required('Required'),
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .notOneOf([Yup.ref('oldPassword'), null], 'New password must be different from old password')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      if (userToken) { 
        try {
          const { data } = await axios.post('http://localhost:5269/api/Account/ChnagePassword', values, {
            headers: {
              Authorization: `Bearer ${userToken}`, 
            }
          });
          if (!data.isSuccess) {
            setMessage(data.message);
          } else {
            setMessage('Password changed successfully.');
          }
        } catch (error) {
          console.error('Failed to change password:', error);
          setMessage('Failed to change password due to a network or server error.');
        }
      } else {
        setMessage('No user token found. Please log in.');
      }
      setSubmitting(false);
    }
  });

  return (
    <div className="container my-5 w-50">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <div className="text-danger">{formik.errors.oldPassword}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-danger">{formik.errors.newPassword}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-success text-light my-3" disabled={formik.isSubmitting || !formik.isValid}>
          Change Password
        </button>
        {message && (
          <div className="alert alert-info">{message}</div>
        )}
      </form>
    </div>
  );
}
