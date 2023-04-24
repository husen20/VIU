export default function ModalCasts({casts}){
    return(
        <>
            <input type="checkbox" id="my-modal-casts" className="modal-toggle" />
            <div className="modal max-w-full">
                <div className="modal-box relative">
                <label htmlFor="my-modal-casts" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h1 className="font-semibold">Casts Profile Picture</h1>
                <div className="flex mt-5 gap-5 justify-evenly flex-wrap" >
                    {casts.map((el,i) =>{
                        return(
                            <div className="flex flex-col items-center gap-2" key={i}>
                                <img src={el.profilePict} alt="" className="w-52 rounded-xl" style={{height: "100%", objectFit: "cover"}} />
                                <h1>{el.name}</h1>
                            </div>
                        )
                    })}
                </div>
                </div>
            </div>
        </>
    )
}