          { activeinventorytable === 'bautistainventorytable' && ( <div id="bautistainventorytable" className="p-2  animate-fadeInUp flex  items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >

          <div className="p-3 shadow-lg rounded-2xl w-[20%] h-full  mr-2 overflow-y-auto overflow-x-hidden">
        
                <div onClick={() => {setbautistainventorycategorynamebox(null); setshowaddbautistainventorycategorydialog(true);}}   className=" mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#383838] rounded-3xl flex justify-center items-center px-4 py-2 transition-all duration-300 ease-in-out"><p className="font-semibold font-albertsans text-white text-[18px] ml-2">Manage Categories</p></div>
                <div className="flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by category</h1></div>

                <div onClick={() => showbautistainventorycategory('all')}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activebautistainventorycategorytable ==='all' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activebautistainventorycategorytable ==='all' ? 'text-white' : ''}`}>All</h1></div>


                {bautistainventorycategorylist.map(category => (
                  <div key={category._id} onClick={() => showbautistainventorycategory(category._id)}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activebautistainventorycategorytable ==='' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activebautistainventorycategorytable ==='' ? 'text-white' : ''}`}>{category.bautistainventorycategoryname}</h1></div>
                ))}



            
            {/*<div className=""> <BautistainventorycategoryBox value={bautistainventorycategorynamebox} loading={loadingbautistainventorycategorylist} onChange={(e) => setbautistainventorycategorynamebox(e.target.value)} categories={bautistainventorycategorylist}/></div>*/}

          </div>
          <div className="ml-2 rounded-2xl w-[90%] h-full bg-[#E5E7EB]">

          </div>

          </div>)}









          {showaddbautistainventorycategorydialog && (

       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-[700px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Category Management</h1></div>
                <div onClick={() => setshowaddbautistainventorycategorydialog(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>
          
              <div className="flex flex-col justify-center items-center h-[84%] rounded-2xl w-full">
                <div className=" h-[10%] mb-2 mt-2 w-full rounded-2xl flex justify-end items-center">
                      <div onClick={() => setshowaddbautistaaddinventorycategory(true)}  className="py-2 w-[200px] mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx bx-categories text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Category</p></div>

                </div>
                <div  className="p-2  animate-fadeInUp flex  items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
<div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">
    {bautistainventorycategorylist.length === 0 ? (
        <div className="bg-yellow-100 w-full py-3 rounded-tl-2xl rounded-tr-2xl flex justify-center items-center"><h1 className="text-yellow-900 font-albertsans font-medium ">No Bautista Eye Center Categories</h1></div>
  ):(
   <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-">
        <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl">
          <th className="rounded-tl-2xl pb-3 pt-3 pl-2 pr-2 text-center">Category</th> 
          <th className=" pb-3 pt-3 pl-2 pr-2 text-center">Created By</th> 
          <th className="pb-3 pt-3 pl-2 pr-2  text-center">Date Created</th>

  
          <th className="rounded-tr-2xl pb-3 pt-3 pl-2 pr-2  text-center">Actions</th>
        </tr>
      </thead>




      <tbody className="divide-y divide-gray-200 bg-white">
  {loadingbautistainventorycategorylist ? (
    <tr>

        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>

    </tr>
  ): (
    bautistainventorycategorylist.map((category) => (

      <tr 
        key={category._id}
        className="hover:bg-gray-50 transition-all ease-in-out duration-300 border-b-2"
      >

        <td className="px-5 font-albertsans text-[#171717]  text-center text-[15px] font-medium ">
          {category.bautistainventorycategoryname}
        </td>
        <td className="px-5 font-albertsans text-[#171717]  text-center text-[15px] font-medium ">
          <div className="flex items-center justify-center">
            <img 
              src={category.bautistainventorycategoryaddedbyprofilepicture || 'default-profile.png'}
              alt="Profile" 
              className="rounded-full h-12 w-12 object-cover mr-3"
              onError={(e) => {
                e.target.src = 'default-profile.png';
              }}
            />
            <div>
              <p className="font-medium">
                {category.bautistainventorycategoryaddedbyfirstname} {category.bautistainventorycategoryaddedbylastname}
              </p>
              <p className="text-gray-500 text-sm ">
                {category.bautistainventorycategoryaddedbytype}
              </p>
            </div>
          </div>
        </td>
        <td className="px-5 font-albertsans text-[#171717]  text-center text-[15px] font-medium ">
          {new Date(category.createdAt).toLocaleDateString()}
        </td>
        <td className="flex justify-center items-center  font-medium px-5 py-4 whitespace-nowrap text-sm  ">


            <div onClick={() => {setshowdeletebautistainventorycategorydialog(true);
                                setselectedbautistainventorycategory(category);}} className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div>
        </td>
      </tr>
    ))
  )}
</tbody>
 </table>
  )}
    
    </div>
                </div>
              </div>
          
        
         </div>
       </div>
 


          )}

          {showaddbautistaaddinventorycategory && (

       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
         <div className="pl-5 pr-5 bg-white rounded-2xl w-[700px] h-[270px]  animate-fadeInUp ">
              <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Add Category Name</h1></div>
                <div onClick={() => setshowaddbautistaaddinventorycategory(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
              </div>
        <form onSubmit={submitbautistainventorycategory}>
              <div className="flex flex-col justify-center items-center h-[84%] rounded-2xl w-full">
                <div className="  mt-10 h-auto  w-full rounded-2xl flex flex-col  justify-center items-end">
                       <div className="w-full ">
                          <label className="font-albertsans font-bold italic text-[#595968] text-[21px]" htmlFor="lastname">Category Name :</label>
                          <input className="bg-gray-200 text-[20px]  text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-120"  value={bautistainventorycategorynameset} onChange={(e) => setbautistainventorycategorynameset(e.target.value)} type="text" name="patientlastname" id="patientlastname"  required/></div>
                     
                          {bautistainventorycategorynamecheck && (
                             <div className="mt-1 w-120">
                                      <p className="text-gray-500  font-medium font-albertsans">Checking Category Name...</p>
                             </div>
                          )}
                          
                          {bautistainventorycategorynameexist && (
                             <div className="mt-1 w-120">
                                      <p className="text-red-500 font-medium font-albertsans">Category is already existing...</p>
                             </div>
                          )}


              
                      <button type="submit" disabled={bautistainventorycategoryissubmitting} className="submit-btn mt-2 w-full" style={{ backgroundColor: "#4ca22b", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px", width: "200px"  }}>
                        {bautistainventorycategoryissubmitting ? "Adding..." : "Add"}
                      </button>       
           

                </div>
                <div className=" h-full w-full rounded-2xl"></div>
             
              </div>
      </form>
         </div>
       </div>

          )}

          {showdeletebautistainventorycategorydialog && (
                       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#0000004a] bg-opacity-50">

                         <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
               

                            <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#f0f0f0]">Delete Inventory Category</h1></div>
                            <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this category?</p>
                                {selectedbautistainventorycategory && ( <>
                                          <p className="text-[18px] mt-3">Category Name: {selectedbautistainventorycategory.bautistainventorycategoryname}</p> </>)}  
                                </div>        
                                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => setshowdeletebautistainventorycategorydialog(false)}><p className=" text-[#ffffff]">Cancel</p></div>
                                  <div className="hover:cursor-pointer bg-[#4e0f0f] hover:bg-[#7f1a1a] ml-2 rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => deletebautistainventorycategory()}><p className=" text-[#ffffff]">Delete</p></div>
                                </div>
                            </div>

                         </div>
                       </div>
          )}
