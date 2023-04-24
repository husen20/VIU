import { Link, useNavigate } from 'react-router-dom';
import ModalRegister from './ModalRegister';
import Swal from 'sweetalert2';
import '../Navbar.css';

export default function Navbar() {
    const navigate = useNavigate()

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

    const handleLogout = (e)=>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        animasiSuccess('Logout')
        navigate('/login')
    }

    return (
        <div className="navbar">
            <div className="flex-1 mx-5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Viu_logo.svg/2560px-Viu_logo.svg.png" className="w-20" alt="" />
                <ul className='flex justify-between w-96 mx-10 text-lg text-white'>
                    <li className='hover:text-yellow-400'>VIU Admin</li>
                    <Link to={'/'} className='hover:text-yellow-400'><li >{localStorage.access_token ? 'Movies' : ''}</li></Link>
                    <Link to={'/genre'} className='hover:text-yellow-400'><li >{localStorage.access_token ? 'Genre' : ''}</li></Link>
                    <li className='hover:text-yellow-400' style={{cursor: "pointer"}} onClick={()=>{
                        document.getElementById('my-modal-register').checked = true;
                    }}>{localStorage.access_token ? 'Register Admin' : ''}</li>
                </ul>
            </div>
            <div className="flex-none">
                {localStorage.user ? <div className='mr-4 text-white'>
                    <p href="" className='flex gap-1'>
                        <span className="material-symbols-outlined">person</span>
                        {localStorage.user}
                    </p>
                </div> : ''}
                {localStorage.access_token ? <button className="btn bg-white text-black rounded-full hover:bg-yellow-400 mr-5" onClick={(e)=>{
                    handleLogout(e)
                }}>
                    Logout
                </button> : ''}
            </div>
            <ModalRegister />
        </div>
    )
}