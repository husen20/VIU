import { useState } from "react"
import { useDispatch } from "react-redux";
import { register } from "../stores/actions/actionCreator";
import Swal from "sweetalert2";

export default function ModalRegister(){
    const dispatch = useDispatch();
    const [formRegister, setFormRegister] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;
        const newForm = {...formRegister}
        newForm[name] = value;

        setFormRegister(newForm)
    }

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

    const handleSubmitRegister = async (e) =>{
        e.preventDefault()
        try {
            await dispatch(register(formRegister))

            document.getElementById('my-modal-register').checked = false;

            setFormRegister({
                username: '',
                email: '',
                password: '',
                phoneNumber: '',
                address: ''
            })
            
            animasiSuccess("Register")
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        }
    }

    return (
        <>
        <input type="checkbox" id="my-modal-register" className="modal-toggle" />
            <div className="modal max-w-full">
                <div className="modal-box relative">
                <label htmlFor="my-modal-register" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h1 className="font-semibold">Create New Admin</h1>
                <div className="flex mt-5 gap-5 justify-evenly flex-wrap" >
                    <form action="" className="w-full" onSubmit={(e)=>{
                        handleSubmitRegister(e)
                    }}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                className="input input-sm input-bordered w-full"
                                name="username"
                                value={formRegister.username}
                                onChange={(e)=>{
                                    handleChange(e)
                                }} 
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Type here" 
                                className="input input-sm input-bordered w-full"
                                name="email"
                                value={formRegister.email}
                                onChange={(e)=>{
                                    handleChange(e)
                                }}  
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Type here" 
                                className="input input-sm input-bordered w-full"
                                name="password"
                                value={formRegister.password}
                                onChange={(e)=>{
                                    handleChange(e)
                                }}  
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input 
                                type="number" 
                                placeholder="Type here" 
                                className="input input-sm input-bordered w-full"
                                name="phoneNumber"
                                value={formRegister.phoneNumber}
                                onChange={(e)=>{
                                    handleChange(e)
                                }}  
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <textarea 
                                className="textarea textarea-bordered h-24" 
                                placeholder="Address"
                                name="address"
                                value={formRegister.address}
                                onChange={(e)=>{
                                    handleChange(e)
                                }} 
                            ></textarea>
                        </div>
                        <div className="modal-action flex justify-end">
                            <button className="btn btn-sm bg-sky-500 hover:bg-sky-600" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </>
    )
}