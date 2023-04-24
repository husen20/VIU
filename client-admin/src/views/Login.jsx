import { useState } from "react"
import {useNavigate} from "react-router-dom"
import {useDispatch} from 'react-redux'
import { login } from "../stores/actions/actionCreator"
import Swal from "sweetalert2"

export default function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const animasiSuccess = (text)=>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: `${text} in successfully`
          })
    }

    const handleSubmitLogin = async (e) =>{
        e.preventDefault();
        try {
            const res = await dispatch(login(user))

            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('user', res.user);

            animasiSuccess('Login')

            navigate('/');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        }
    }

    return (
        <div className="body-login">
            <div className="hero flex justify-center items-center">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left box-logo">
                    <img src="https://statics.hacktiv8.com/images/logo/hacktiv8-dark.webp" className="w-full" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form action="" onSubmit={(e)=>{
                            handleSubmitLogin(e)
                        }}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input 
                                type="email" 
                                placeholder="email" 
                                className="input input-bordered text-black"
                                value={user.email}
                                onChange={({target})=>{
                                    const clonedUser = structuredClone(user);
                                    clonedUser.email = target.value;
                                    setUser(clonedUser)
                                }} 
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input 
                                type="password" 
                                placeholder="password" 
                                className="input input-bordered text-black"
                                value={user.password}
                                onChange={({target})=>{
                                    const clonedPassword = structuredClone(user);
                                    clonedPassword.password = target.value;
                                    setUser(clonedPassword)
                                }} />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}