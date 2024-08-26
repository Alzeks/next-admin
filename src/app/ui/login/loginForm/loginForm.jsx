"use client";

import { authenticate } from "../../../lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Pending from '../../loadings/Pending'
import { useRef, useState } from "react";
import { useForm } from 'react-hook-form'

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, null);
  const [error, setError] = useState('')
  const { 
    register, 
    formState: { errors }, 
    handleSubmit } = useForm()// react-hook-form

  const formRef = useRef (null)

  const handleLogin = async(formData)=>{
  const errData = await authenticate(formData)
    errData && setError(errData) 
    formRef.current?.reset()
  }
  
  return (
   
    <form action = {handleSubmit(handleLogin)} className={styles.form}
    >
      <h1 >Login</h1>
      <input type="text" placeholder="enter 'admin'" name="username"
        {...register('username', {        
          required: 'required',
          minLength: {value: 3, message:'min 3'}
        })}
      />
      {errors?.username && <p className={styles.hookform}>{errors?.username?.message || 'error'}</p>}

      <input type="password" placeholder="password" name="password" 
        {...register('password', {
          required: 'required'
        })}
      />
      {errors?.password && <p className={styles.hookform}>{errors?.password?.message || 'error'}</p>}

      <button className={styles.button}>
        <div>LOGIN</div>
        <div className={styles.loading}><Pending /></div>
      </button>
      {state && state}
      {error && error}
    </form>
  );
};

export default LoginForm;