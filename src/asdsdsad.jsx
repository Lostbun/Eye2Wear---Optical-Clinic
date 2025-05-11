                          <div className=" w-fit h-fit mt-5">
                              <img className=" object-cover max-w-320 rounded-2xl" src={otherclinicpreviewimage || defaultimageplaceholder}/>
                                              
                              <input  className="hidden" type="file" onChange={otherclinichandleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={otherclinicimageinputref} />
                              <div onClick={otherclinichandleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                                                                      
                              {otherclinicselectedimage && (<div onClick={otherclinichandleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                          </div>