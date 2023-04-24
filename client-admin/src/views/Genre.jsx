import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { deleteGenre, editGenre, fetchGenres } from "../stores/actions/actionCreator";
import { addGenre } from "../stores/actions/actionCreator";
import Swal from "sweetalert2";
import Preloader from "../components/Preloader";

export default function Genre(){
    const dispatch = useDispatch()
    const genres = useSelector((state)=> state.genresReducer.genres)
    const [loading, setLoading] = useState(false)

    const [editStatus, setEditStatus] = useState({
        edit: false
    })

    const [formGenres, setFormGenres] = useState({
        name: ''
    })

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

    const handleDelete = async (id) => {
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
                    await dispatch(deleteGenre(id))
        
                    handleFetchGenres() // eslint-disable-next-line
                    animasiSuccess("Delete")
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        }
    }

    const handdleEditGenre = (dataGenre)=>{
        setFormGenres({name: dataGenre.name, id: dataGenre.id})
        setEditStatus({edit: true})
        document.getElementById('my-modal-genre').checked = true;
    }

    const handleCreateEmpty = ()=>{
        setFormGenres({name: ""})
        setEditStatus({edit: false})
        document.getElementById('my-modal-genre').checked = true;
    }

    const handleFetchGenres = async ()=> {
        setLoading(true)
        try {
            await dispatch(fetchGenres()); // eslint-disable-next-line
            setTimeout(()=>{
                handleLoading()
            },500)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        }
    }
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
        const newForm = {...formGenres}
        newForm[name] = value;

        setFormGenres(newForm)
    }

    const handleSubmitGenre = async (e)=>{
        e.preventDefault()
        try {
            if (editStatus.edit) {
                await dispatch(editGenre(formGenres))
                animasiSuccess("Edit")
            }else{
                await dispatch(addGenre(formGenres))
                animasiSuccess("Add")
            }
            handleFetchGenres()
            document.getElementById('my-modal-genre').checked = false
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        }
    }

    useEffect(()=>{
        handleFetchGenres() // eslint-disable-next-line
    },[])

    return(
        <div className="w-full flex justify-center">
            {loading ? <Preloader /> : ""}
            <div className="w-9/12 flex justify-center items-center mt-6 flex-col">
                <div className="flex w-11/12 justify-between items-center border-b-2 border-black pb-2">
                    <h1 className="text-2xl font-bold">Genre List</h1>
                    <button className="btn hover:bg-sky-500 bg-sky-400 rounded-xl" htmlFor="my-modal-genre" onClick={()=>{
                        handleCreateEmpty();
                    }}>Create Genres</button>
                </div>
                <div className="overflow-y-auto w-11/12 mt-3" style={{height: '565px'}}>
                    <table className="table w-full mt-3" style={{height: '565px'}} >
                        <thead>
                            <tr>
                                <th className="bg-slate-400"></th>
                                <th className="bg-slate-400">Name</th>
                                <th className="bg-slate-400 text-center mt-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres.map((el,i)=>{
                                return(
                                    <tr key={i}>
                                        <th>{i+1}</th>
                                        <td>{el.name}</td>
                                        <td className="text-end">
                                            <label className="btn hover:bg-yellow-500 bg-yellow-300 rounded-xl btn-md" htmlFor="my-modal" onClick={(e)=>{
                                            handdleEditGenre(el)
                                        }}><span className="material-symbols-outlined">edit</span></label>
                                            <button className="btn hover:bg-red-600 bg-red-500 rounded-xl" onClick={(e)=>{
                                            handleDelete(el.id)
                                        }}><span className="material-symbols-outlined" >delete</span></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* modal */}
            <input type="checkbox" id="my-modal-genre" className="modal-toggle" />
            <div className="modal max-w-full">
                <div className="modal-box relative">
                <label htmlFor="my-modal-genre" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h1 className="font-semibold">Create New Genre</h1>
                <div className="flex mt-5 gap-5 justify-evenly flex-wrap" >
                    <form action="" className="w-full" onSubmit={(e)=>{
                        handleSubmitGenre(e)
                    }}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                className="input input-sm input-bordered w-full"
                                name="name"
                                value={formGenres.name}
                                onChange={(e)=>{
                                    handleChange(e)
                                }}  
                            />
                        </div>
                        <div className="modal-action flex justify-end">
                            <button className="btn btn-sm bg-sky-500 hover:bg-sky-600" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}