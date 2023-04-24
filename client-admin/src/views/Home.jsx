import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, deleteMovie, fetchGenres, fetchMovies, movieEdit } from "../stores/actions/actionCreator";
import Preloader from '../components/Preloader';
import ModalCasts from "../components/ModalCasts";
import Swal from 'sweetalert2'

export default function Home(){

    const [castsModal, setCastsModal] = useState([])

    const [loading, setLoading] = useState(false)

    const [casts, setCasts] = useState([
        {name: '', profilePict: ''}
    ])

    const [editMovie, setEditData] = useState({
        edit: false
    })

    const [formMovies, setFormMovies] = useState({
        title: '',
        genreId: '1',
        synopsis: '',
        trailerUrl: '',
        imgUrl: '',
        rating: '',
    })

    const dispatch = useDispatch();
    const movies = useSelector((state)=> state.moviesReducer.movies)
    const genres = useSelector((state)=> state.genresReducer.genres)

    const handleLoading = ()=>{
        setLoading(false)
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

    const removeInput = (index) =>{
        const newData = casts.filter((el, i)=> i !== index )
        setCasts(newData)
    }

    const handleCreateEmpty = ()=>{
        setFormMovies({
            title: '',
            genreId: '1',
            synopsis: '',
            trailerUrl: '',
            imgUrl: '',
            rating: '',
        })
        setCasts([
            {name: '', profilePict: ''}
        ])
    }

    const handleEditMovie = (e, dataMovie)=>{
        setFormMovies({
            id: dataMovie.id,
            title: dataMovie.title,
            genreId: dataMovie.genreId,
            synopsis: dataMovie.synopsis,
            trailerUrl: dataMovie.trailerUrl,
            imgUrl: dataMovie.imgUrl,
            rating: dataMovie.rating,
        })

        setCasts(dataMovie.Casts)
        
        setEditData({
            edit: true
        })
    }

    const handleDelete = async(e, id)=>{
        e.preventDefault()
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then(async (result) => {
                if (result.isConfirmed) {
                    await dispatch(deleteMovie(id))
                    handleFetchMovies() // eslint-disable-next-line
                    animasiSuccess('Delete')
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        const newForm = {...formMovies}
        newForm[name] = value;

        setFormMovies(newForm)
    }

    const handleSubmitMovie = async (e)=>{
        e.preventDefault();
        try {
            if (editMovie.edit) {
                await dispatch(movieEdit(formMovies, casts))
                animasiSuccess('Edit')
            }else{
                await dispatch(addMovie(formMovies, casts))
                animasiSuccess('Add')
            }

            handleFetchMovies() // eslint-disable-next-line
            document.getElementById('my-modal').checked = false
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        }
    }

    const handleFetchMovies = async ()=> { // eslint-disable-next-line
        setLoading(true)
        try {
            await dispatch(fetchMovies()); // eslint-disable-next-line
            setTimeout(()=>{
                handleLoading()
            },500)
 
        } catch (error) {
            console.log(error);
        }
    }

    const handleFetchGenres = async ()=> {
        setLoading(true)
        try {
            await dispatch(fetchGenres()); // eslint-disable-next-line
            setTimeout(()=>{
                handleLoading()
            },500)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleFetchMovies() // eslint-disable-next-line
        handleFetchGenres() // eslint-disable-next-line
    }, []);
    

    return (
        <div className="w-full flex justify-center items-center mt-6 flex-col">
            {loading ? <Preloader /> : ""}
            <div className="flex w-11/12 justify-between items-center border-b-2 border-black pb-2">
                <h1 className="text-2xl font-bold">Movies List</h1>
                <label className="btn hover:bg-sky-500 bg-sky-400 rounded-xl" htmlFor="my-modal" onClick={(e)=>{
                    handleCreateEmpty(e);
                    setEditData({edit: false});
                }}>Create Movies</label>
            </div>

            <div className="overflow-y-auto w-11/12 mt-3" style={{height: '565px'}}>
                <table className="table table-compact w-full shadow-xl">
                    <thead>
                    <tr>
                        <th className="bg-slate-400">No</th> 
                        <th className="bg-slate-400">Title</th> 
                        <th className="bg-slate-400">Genre</th> 
                        <th className="bg-slate-400">Rating</th> 
                        <th className="bg-slate-400">Created By</th> 
                        <th className="bg-slate-400">Image</th> 
                        <th className="bg-slate-400">Casts</th> 
                        <th className="text-center bg-slate-400">Action</th>
                    </tr>
                    </thead> 
                    <tbody>
                    {/* <TableRowListMovie movies={movies}/> */}
                    {movies.map((el, i) =>{
                        return(
                            <tr key={el.id}>
                                <th>{i+1}</th> 
                                <td>{el.title}</td> 
                                <td>{el.Genre.name}</td> 
                                <td>{el.rating}</td>
                                <td>{el.User.email}</td> 
                                <td>
                                    <img src={el.imgUrl} className="w-16" alt="" />
                                </td> 
                                <td>
                                    <button className="btn bg-green-400 hover:bg-green-500 btn-md rounded-lg text-sm" onClick={()=>{
                                        document.getElementById('my-modal-casts').checked = true;
                                        setCastsModal(el.Casts)
                                    }}> show casts</button>
                                </td> 
                                <td className="text-center">
                                    <label className="btn hover:bg-yellow-500 bg-yellow-300 rounded-xl btn-md" htmlFor="my-modal" onClick={(e)=>{
                                        handleEditMovie(e, el)
                                    }}><span className="material-symbols-outlined">edit</span></label>
                                    <button className="btn hover:bg-red-600 bg-red-500 rounded-xl" onClick={(e)=>{
                                        handleDelete(e, el.id)
                                    }}><span className="material-symbols-outlined" >delete</span></button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <ModalCasts casts={castsModal}/>
            {/* Modal */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div htmlFor="my-modal" className="modal cursor-pointer">
                <div className="modal-box flex flex-col relative">
                    <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className="font-semibold">Create New Movie</h1>
                    <form action="" onSubmit={(e)=>{
                        handleSubmitMovie(e)
                    }}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                className="input input-sm input-bordered w-full"
                                name="title"
                                value={formMovies.title}
                                onChange={(e)=>{
                                    handleChange(e)
                                }}  
                            />
                        </div>
                        <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Genres</span>
                        </label>
                        <select 
                            className="select select-bordered select-sm"
                            value={formMovies.genreId}
                            name="genreId"
                            onChange={(e)=>{
                                handleChange(e)
                            }}
                        >
                            <option disabled>Pick one</option>
                            {genres.map((genre)=>{
                                return(
                                    <option value={genre.id} key={genre.id}>{genre.name}</option>
                                )
                            })}
                        </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Image Url</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                className="input input-sm input-bordered w-full"
                                name="imgUrl"
                                value={formMovies.imgUrl}
                                onChange={(e)=>{
                                    handleChange(e)
                                }} 
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Trailer Url</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                className="input input-sm input-bordered w-full"
                                name="trailerUrl"
                                value={formMovies.trailerUrl}
                                onChange={(e)=>{
                                    handleChange(e)
                                }} 
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input 
                            type="number" 
                            placeholder="Type here" 
                            className="input input-sm input-bordered w-full"
                            name="rating"
                            value={formMovies.rating}
                            onChange={(e)=>{
                                handleChange(e)
                            }} 
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Synopsis</span>
                            </label>
                            <textarea 
                                className="textarea textarea-bordered h-24" 
                                placeholder="Description"
                                name="synopsis"
                                value={formMovies.synopsis}
                                onChange={(e)=>{
                                    handleChange(e)
                                }}
                            ></textarea>
                        </div>
                        {casts.map((el, i)=>{
                            return(
                                <div className="form-control w-full" key={i}>
                                    <div className="label">
                                        <span className="label-text">Casts</span> 
                                        {i === 0 ? "" : <button type="button" className="text-red-600 text-xs" onClick={()=>{
                                            removeInput(i)
                                        }}>Delete</button>}
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Cast Name" 
                                        className="input input-sm input-bordered w-full" 
                                        value={el.name}
                                        onChange={({target})=>{
                                            const clonedCasts = structuredClone(casts);
                                            clonedCasts[i].name = target.value;
                                            setCasts(clonedCasts)
                                        }} 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Cast Image Url" 
                                        className="input input-sm input-bordered w-full mt-1" 
                                        value={el.profilePict}
                                        onChange={({target})=>{
                                            const clonedCasts = structuredClone(casts);
                                            clonedCasts[i].profilePict = target.value;
                                            setCasts(clonedCasts)
                                        }} 
                                    />
                                </div>
                            )
                        })}
                        <div className="modal-action flex justify-between">
                            <label className="btn btn-sm bg-green-400 hover:bg-green-500" onClick={()=> setCasts([...casts, {movieId: casts[0].movieId,name: '', profilePict: ''}])}>Add Casts</label>
                            <button className="btn btn-sm bg-sky-500 hover:bg-sky-600" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* End Modal */}
        </div>
    )
}