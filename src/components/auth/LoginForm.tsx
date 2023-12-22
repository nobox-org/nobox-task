'use client';
import { login } from "@/utils/auth";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {


    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: values => {

            if (loading) return;

            const data = {
                username: values.username,
                password: values.password,
            }


            if (error) setError(null);

            setLoading(true);

            login(data)
            .then((res)=>{
                // console.log(res)
                // setLoading(false)
                router.push('/');
            })
            .catch((err)=>{
                console.error(err);
                setError(()=>err.message)
                setLoading(false)
            })
        },
    });


    return (
        <>
            <h2>
                Sign in to account
            </h2>


            <span>{error}</span>
            <span>{loading && "Signing in..."}</span>

            <br/><br/>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="postTitle">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />

                <label htmlFor="postTitle">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />


                <button
                    type="submit"
                    disabled={loading}
                >
                    Sign In
                </button>

                <Link href={'/auth/register'}>Don&#39;t have an account? Create account</Link>
            </form>
        </>
    )
}


export default LoginForm;