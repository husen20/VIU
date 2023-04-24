import { Link } from 'react-router-dom';
import '../Navbar.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="flex-1 mx-5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Viu_logo.svg/2560px-Viu_logo.svg.png" className="w-20" alt="" />
                <ul className='flex justify-between w-96 mx-10 text-lg text-white'>
                    <li><Link to={'/'} className='hover:text-yellow-400'>VIU Original</Link></li>
                </ul>
            </div>
            <div className="flex-none">
                <div className='mr-4 text-white'>
                    <a href="" className='flex gap-1'>
                        ID
                        <span className="material-symbols-outlined">language</span>
                    </a>
                </div>
                <button className="btn bg-white text-black rounded-full hover:bg-yellow-400 mr-5">
                    masuk akun / daftar
                </button>
            </div>
        </div>
    )
}