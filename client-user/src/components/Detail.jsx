import { useSelector } from "react-redux"

export default function Detail() {

    const movie = useSelector(state => state.movieReducer.movie)

    return (
        <div className="w-full flex flex-col items-center mt-5 mb-20">
            <div className="flex flex-col w-full text-white gap-5" >
                <iframe src={movie.trailerUrl} className="h-96 rounded-lg" frameborder="0"></iframe>
                <div className="w-full flex-col gap-5">
                    <h1 className="text-xl" style={{fontWeight: "800"}}>Title :</h1>
                    <h1 className="text-xl text-yellow-400" style={{fontWeight: "600"}}>{movie.title}</h1>
                    <h1 className="text-xl" style={{fontWeight: "800"}}>Genre :</h1>
                    <h1 className="text-xl text-yellow-400" style={{fontWeight: "600"}}>{movie.Genre.name}</h1>
                    <h1 className="text-xl" style={{fontWeight: "800"}}>Rating :</h1>
                    <h1 className="text-xl text-yellow-400" style={{fontWeight: "600"}}>{movie.rating}</h1>
                    <h1 className="text-xl" style={{fontWeight: "800"}}>Casts :</h1>
                </div>
                <div className="w-full flex gap-5 flex-wrap">
                    {movie.Casts?.map(el=>{
                        return <img key={el.id} src={el.profilePict} className="w-56 rounded-lg" alt="" />
                    })}
                </div>
            </div>
        </div>
    )
}