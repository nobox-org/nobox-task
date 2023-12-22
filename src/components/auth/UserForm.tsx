'use client';
import { IPost, IUser } from "@/types";
import { createUser } from "@/utils/auth";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = ({edit}:{edit?:boolean}) => {

    // TODO: Implement User edit information still using this same template
    // * Load current user data, store it in initialData variable
    // *    and tweak the onSubmit function to edit instead of create
    let initialData: IUser | undefined;

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const formik = useFormik({
        initialValues: {
            username: initialData?.username || '',
            email: initialData?.email || '',
            password: initialData?.password || '',
            confirmPassword: '',
        },
        onSubmit: values => {

            if (values.password !== values.confirmPassword){
                setError("Password and confirm password does not match");
                return
            }

            const data:IUser = {
                username: values.username,
                email: values.email,
                password: values.password,
            }


            if (error) setError(null);

            setLoading(true);

            createUser(data)
            .then((res)=>{
                router.push('/');
            })
            .catch((err)=>{
                console.error(err);
                setError(()=>"Could not create user")
                setLoading(false)
            })
        },
    });


    return (
        <>
            <h2>
                Create Account
            </h2>


            <span>{error}</span>
            <span>{loading && "Creating account..."}</span>

            <br/>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="postTitle">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />

                <label htmlFor="postTitle">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />

                <label htmlFor="postTitle">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />

                <label htmlFor="postTitle">Confirm password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                />


                <button
                    type="submit"
                    disabled={loading}
                >
                    Create Account
                </button>
                <Link href={'/auth/login'}>Already have an account? Sign in top, account</Link>
            </form>
        </>
    )
}


export default RegisterForm;