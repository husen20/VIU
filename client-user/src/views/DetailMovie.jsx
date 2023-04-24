import Preloader from "../components/Preloader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMovie } from "../stores/actions/actionCreator";

export default function DetailMovie() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const movie = useSelector(state => state.movieReducer.movie)

    const handleFetchMovie = async ()=>{
        setLoading(true)
        try {
            await dispatch(fetchMovie(id))
            setTimeout(()=>{
                handleLoading()
            },500)
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoading = ()=>{
        setLoading(false)
    }

    const navLinkStyle = ({isActive})=>{
        return{
            color: isActive ? '#facc15' : 'white',
            textDecoration: isActive ? 'underline' : 'none'
        }
    }
    
    useEffect(() => {
        handleFetchMovie() //eslint-disable-next-line
    }, []);

    return (
            <>
            {loading ? <Preloader /> : ""}
                <div className="w-full flex">
                    <img className="w-full" style={{height: "650px"}} src="https://www.pngplay.com/wp-content/uploads/12/Avengers-PNG-Photo-Image.png" alt="" />
                </div>
                <div className="w-full flex flex-col items-center">
                    <div className="flex flex-col w-11/12 text-white pt-7 pb-7" style={{borderTop: "1px solid white", borderBottom: "1px solid white"}}>
                        <h1 className="text-xl" style={{fontWeight: "800"}}>Tentang :</h1>
                        <p>{movie.synopsis}</p>
                    </div>
                    <div className="w-full flex justify-center mt-5 mb-20">
                        <div className="flex flex-col w-11/12 text-white">
                            <ul className="text-xl flex gap-5 " style={{fontWeight: "800"}}>
                                <NavLink to={'detail'} className="hover:text-yellow-400" style={navLinkStyle}>
                                    <li>Detail</li>
                                </NavLink>
                                <NavLink to={'similar'} className="hover:text-yellow-400" style={navLinkStyle}>
                                    <li>Similar Movies</li>
                                </NavLink>
                            </ul>
                            <div className="w-full">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }