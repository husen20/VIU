import Preloader from "../components/Preloader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchGenre, fetchMovies } from "../stores/actions/actionCreator";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const movies = useSelector(state => state.moviesReducer.movies)
    const genres = useSelector(state => state.genreReducer.genres)

    const handleFetchMovies = async ()=>{
        setLoading(true)
        try {
            await dispatch(fetchMovies())
            setTimeout(()=>{
                handleLoading()
            },500)
        } catch (error) {
            
        }
    }

    const handleLoading = ()=>{
        setLoading(false)
    }

    const handleFetchGenres = async ()=>{
        setLoading(true)
        try {
            await dispatch(fetchGenre())
            setTimeout(()=>{
                handleLoading()
            },500)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleFetchMovies() //eslint-disable-next-line
        handleFetchGenres() //eslint-disable-next-line
    }, []);

    return (
        <>
            {loading ? <Preloader /> : ""}
            <div className="w-full flex">
                <img className="w-full" style={{height: "650px"}} src="https://www.pngplay.com/wp-content/uploads/12/Avengers-PNG-Photo-Image.png" alt="" />
            </div>
            {genres.map(elGenre=>{
                return(
                    <div className="flex items-center flex-col mt-10" key={elGenre.id}>
                        <div className="flex justify-between text-white w-10/12 mb-5">
                            <h2>{elGenre.name}</h2>
                            <a href="" className="hover:text-yellow-400">See All</a>
                        </div>
                        <div className="flex w-10/12 gap-5 flex-nowrap overflow-x-auto scrollbar pb-2">
                            {movies.map((elMovie) => {
                                return (
                                    <MovieCard movie={elMovie} key={elMovie.id}/>
                                );
                            })}
                        </div>
                    </div>
                )
            })}
        
        </>
    )
}