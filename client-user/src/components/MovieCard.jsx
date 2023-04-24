import { NavLink } from "react-router-dom";

export default function MovieCard({movie}) {
    return (
        <div className="w-36 flex-none rounded-xl group relative">
            <NavLink to={`/detail/${movie.id}`} className="hover:bg-zinc-700 group-hover:opacity-50">
                <div className="absolute flex justify-center items-center inset-0 text-center opacity-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined" style={{fontSize: "50px", color: "white"}}>play_arrow</span>
                </div>
                <img src={movie.imgUrl} alt="" className="w-full"/>
            </NavLink>
        </div> 
    )
}