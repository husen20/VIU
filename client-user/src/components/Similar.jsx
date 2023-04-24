import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMovies } from "../stores/actions/actionCreator"
import MovieCard from "./MovieCard"

export default function Similar() {
    const dispatch = useDispatch()
    const movies = useSelector(state => state.moviesReducer.movies)

    const handleFetchMovies = async ()=>{
        try {
            dispatch(fetchMovies('2'))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        handleFetchMovies()
    })

    return (
        <div className="w-full flex gap-8 flex-wrap pb-2 mt-8 mb-20">
            {movies.map(el=>{
                return <MovieCard movie={el} key={el.id}/>
            })}
        </div>
    )
}