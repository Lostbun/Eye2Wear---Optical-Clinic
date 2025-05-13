

          { activeinventorytable === 'bautistainventorytable' && ( <div id="bautistainventorytable" className="p-2  animate-fadeInUp flex  items-start border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >

          <div className="p-3 shadow-b-lg border-b-2  rounded-2xl w-[20%] h-full  mr-2 overflow-y-auto overflow-x-hidden">
        
                <div onClick={() => {setbautistainventorycategorynamebox(null); setshowaddbautistainventorycategorydialog(true);}}   className=" mt-1 mb-1 hover:cursor-pointer hover:scale-103 bg-[#383838] rounded-3xl flex justify-center items-center px-4 py-2 transition-all duration-300 ease-in-out"><p className="font-semibold font-albertsans text-white text-[18px] ml-2">Manage Categories</p></div>
                <div className="border-b-2 pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by category</h1></div>

                <div onClick={() => showbautistainventorycategory('all')}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activebautistainventorycategorytable ==='all' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activebautistainventorycategorytable ==='all' ? 'text-white' : ''}`}>All</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{bautistainventoryproducts.length}</span></div>


                {bautistainventorycategorylist.map(category => {
                  const productcount = bautistainventoryproducts.filter(product =>
                    product.bautistainventoryproductcategory === category.bautistainventorycategoryname).length;
                  return(
                  <div key={category._id} onClick={() => setactivebautistainventorycategorytable(category.bautistainventorycategoryname)}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activebautistainventorycategorytable ===category.bautistainventorycategoryname ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activebautistainventorycategorytable ===category.bautistainventorycategoryname ? 'text-white' : 'text-[#5d5d5d]'}`}>{category.bautistainventorycategoryname}</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{productcount}</span></div>
                  )
                })}



            
            {/*<div className=""> <AmbherinventorycategoryBox value={bautistainventorycategorynamebox} loading={loadingbautistainventorycategorylist} onChange={(e) => setbautistainventorycategorynamebox(e.target.value)} categories={bautistainventorycategorylist}/></div>*/}

          </div>
          <div className=" flex flex-col justify-start  ml-2 rounded-2xl w-[90%]  h-[540px] shadow-b-lg ">
              <div className="flex justify-end items-center w-full h-[9%] rounded-2xl mb-2"> <div onClick={() => setshowaddbautistainventoryproductdialog(true)}  className="w-50 p-2 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx  bx-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Add Product</p></div> </div>

              <div className="overflow-y-auto w-[100%] rounded-2xl h-full flex flex-wrap content-start gap-3 pl-2 pt-2 bg-[#fafafa]">
                

              <div className="flex flex-wrap p-4">
                {bautistaloadingproducts ? (
                  <div>Loading Ambher Products...</div> 
                ): bautistainventoryproducts.length === 0 ? (
                  <div>No Products Found...</div> 
                ):(
                  bautistafilteredproducts.map((product) => (
              <div key={product.bautistainventoryproductid} onClick={() => {setshowaddbautistainventoryproductdialog(true);
                                                                           setselectedbautistaproduct(product);
                                                                           setbautistacurrentimageindex(0);
                                                                           setbautistainventorycategorynamebox(product?.bautistainventoryproductcategory || '');
                                                                           setaddbautistainventoryproductname(product?.bautistainventoryproductname || '');
                                                                           setaddbautistainventoryproductbrand(product?.bautistainventoryproductbrand || '');
                                                                           setaddbautistainventoryproductmodelnumber(product?.bautistainventoryproductmodelnumber || '');
                                                                           setaddbautistainventoryproductdescription(product?.bautistainventoryproductdescription || '');
                                                                           setaddbautistainventoryproductprice(product?.bautistainventoryproductprice || 0);
                                                                           setaddbautistainventoryproductquantity(product?.bautistainventoryproductquantity || 0);
                                                                           setaddbautistainventoryproductimagepreviewimages(product?.bautistainventoryproductimagepreviewimages || []);
              }} className="mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl">
                <img src={product.bautistainventoryproductimagepreviewimages[0] || defaultimageplaceholder}  alt={product.bautistainventoryproductname} className="w-full h-45"/>
                <div className="mx-1  w-fit rounded-md py-1 px-2  bg-[#0d708f] rounded-1xl h-fit  mt-2 break-words min-w-0"><h1 className="font-medium italic text-white text-[16px] min-w-0 break-words">{product.bautistainventoryproductcategory}</h1></div>
                <div className="w-full h-auto ml-2 mt-2 "><h1 className="font-albertsans font-medium text-[#4e4f4f] text-[14px] min-w-0 break-words">{product.bautistainventoryproductname}</h1></div>
                <div className="w-fit h-auto ml-2 mt-1 "><h1 className="font-albertsans font-bold text-[#4e4f4f] text-[18px] min-w-0 break-words">₱ {product.bautistainventoryproductprice?.toLocaleString()}</h1></div>
                <div className="w-full h-auto ml-2 mt-5 mb-5 "><h1 className="font-albertsans font-medium text-[#4e4f4f] text-[15px] min-w-0 break-words">Stock Quantity: {product.bautistainventoryproductquantity}</h1></div>
              </div>
                  ))
                )}
              </div>

              
              

              </div>
          </div>

          </div>)}




        {/*Ambher Inventory Category*/}
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
        <div className="bg-yellow-100 w-full py-3 rounded-tl-2xl rounded-tr-2xl flex justify-center items-center"><h1 className="text-yellow-900 font-albertsans font-medium ">No Ambher Optical Inventory Categories</h1></div>
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

        {/*Ambher Inventory Product*/}
          {showaddbautistainventoryproductdialog && (

                         <div className="overflow-y-auto h-auto  bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="mt-10 pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-auto mb-10 animate-fadeInUp ">
                                <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                  <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">{selectedbautistaproduct ?  "Edit Product" : "Add Product"}</h1></div>
                                  <div onClick={() => {setshowaddbautistainventoryproductdialog(false);  resetaddbautistainventoryproductdialog(); }} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                </div>

                          <form className="flex flex-col  ml-15 mr-15 mt-5   w-fullx" onSubmit={selectedbautistaproduct ? handleupdatebautistainventoryproduct : handlesubmitaddbautistainventoryproduct}>
                                <div className="flex justify-center items-start bg-[#fcfcfc] rounded-2xl w-full h-auto">
                                  <div className="pb-10 w-full h-full mr-15 rounded-2xl flex justify-center mt-5">



                                      <div className="h-fit w-fit ">
  
                                <div className="relative">
                                <img  className="w-120 object-cover rounded-2xl h-120" src={(selectedbautistaproduct?.bautistainventoryproductimagepreviewimages?.[bautistacurrentimageindex]) || (addbautistainventoryproductimagepreviewimages?.[bautistacurrentimageindex]) || defaultimageplaceholder}/>


                                     {((selectedbautistaproduct?.bautistainventoryproductimagepreviewimages?.length || 0) > 1 || 
                                       addbautistainventoryproductimagepreviewimages?.length > 1) && (
                                         <>
                                           <button type="button" onClick={bautistahandlepreviousimage}  className="bg-opacity-50 hover:bg-opacity-75 rounded-full text-white p-2 absolute left-2 top-1/2 transform -translate-y-1/2 bg-black"><i className="bx bx-chevron-left text-2xl" /></button>

                                           <button type="button" onClick={bautistahandlenextimage}  className="rounded-full absolute bg-opacity-50 text-white p-2 transform -translate-y-1/2 bg-black hover:bg-opacity-75 right-2 top-1/2">  <i className="bx bx-chevron-right text-2xl" /></button>

                                         </>
                                       )}
                                     </div>
                                      
                                      
                                        {addbautistainventoryproductimagepreviewimages.length > 0 && (
                                          <div className="overflow-x-auto flex gap-2 mt-2 ">
                                            {addbautistainventoryproductimagepreviewimages.map((preview, index) => (
                                                <div key={index} className="relative">
                                                <img src={preview} className={`rounded-lg cursor-pointer object-cover w-20 h-20 ${bautistacurrentimageindex === index ? 'ring-2 ring-blue-500' : ''}`} />
                                                <button onClick={() => addbautistainventoryproductimagehandleremove(index)}   className="absolute -top-2 -right-2  rounded-full p-1 hover:bg-red-600 bg-red-500 text-white  " > <i className="bx bx-x text-lg" /></button>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      
                                      
                                        <input className="hidden"  multiple type="file" accept="image/jpeg, image/jpg, image/png" ref={addbautistainventoryproductimageimageinputref} onChange={addbautistainventoryproductimagehandlechange}    />

                                        <div onClick={addbautistainventoryproductimagehandleuploadclick} className="hover:cursor-pointer  hover:scale-105 transition-all mt-3 rounded-2xl flex justify-center items-center align-middle p-3 bg-[#0ea0cd]  " ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/>
                                          <p className="text-white font-semibold text-[20px] ">Upload {addbautistainventoryproductimagepreviewimages.length}/5 Images</p>

                                        </div>
                                      </div>









                                  </div>

                                  <div className="w-full h-auto flex items-start mb-10 rounded-2xl">
                                        <div className=" w-full h-auto  rounded-4xl">
                                  
                                  
              
                                        <div className="registration-container">
                                     
                                        <h1 className=" font-league text-[#3da9d1] text-[27px] ">Product Details</h1>
                                        {message.text && (
                                          <div className={`message ${message.type} text-${message.type === 'error' ? 'red' : 'green'}-600 font-bold`}>
                                            {message.text}
                                          </div>
                                        )}
                                  
                                        <h1 className=" font-albertsans font-semibold italic text-[#595968] text-[20px]">Let's add product inventory!</h1>
                                  
                                  
                                  
                                  
                                        <div className="form-group mt-10  flex">
                                        <label className="  font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="bautistainventorycategorynamebox">Category :</label>
                                        <div className="flex flex-col">
                                        <div className="ml-13"> <AmbherinventorycategoryBox  value={bautistainventorycategorynamebox} loading={loadingbautistainventorycategorylist} onChange={(e) => setbautistainventorycategorynamebox(e.target.value)} categories={bautistainventorycategorylist}/></div>
                                        </div>
                                        </div>
                                  
                                  
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductname">Product Name : </label>
                                        <input className="bg-gray-200 text-[18px] text-gray-600 pl-3 rounded-2xl ml-1 h-10 w-70" placeholder="Enter Product Name..." type="text" name="addbautistainventoryproductname" id="addbautistainventoryproductname" value={addbautistainventoryproductname} onChange={(e) => setaddbautistainventoryproductname(e.target.value)} required /></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductbrand">Product Brand : </label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-1 h-10 w-70" placeholder="Enter Product Brand..." type="text" name="addbautistainventoryproductbrand" id="addbautistainventoryproductbrand" value={addbautistainventoryproductbrand} onChange={(e) => setaddbautistainventoryproductbrand(e.target.value)} required/></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductmodelnumber">Model Number :</label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-2  h-10 w-70" placeholder="Enter Model Number..." type="text" name="addbautistainventoryproductmodelnumber" id="addbautistainventoryproductmodelnumber" value={addbautistainventoryproductmodelnumber} onChange={(e) => setaddbautistainventoryproductmodelnumber(e.target.value)} required/></div>
                                  
                                        <div className="form-group mt-5 flex flex-col">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductdescription">Product Description:</label>
                                         <textarea className="w-full text-[18px]  text-gray-600 rounded-md  border-2  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={addbautistainventoryproductdescription} onChange={(e) => {setaddbautistainventoryproductdescription(e.target.value); adjusttextareaheight();}} placeholder="Product description..."/>
                                        </div>
 
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductprice">Price :</label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-2  h-10 w-70" placeholder="Enter Price..." type="number" name="addbautistainventoryproductprice" id="addbautistainventoryproductprice" value={addbautistainventoryproductprice} onChange={(e) => setaddbautistainventoryproductprice(e.target.value)} required/></div>
                                  
                                        <div className="form-group mt-5">
                                        <label className="font-albertsans font-bold italic text-[#595968] text-[19px]" htmlFor="addbautistainventoryproductquantity">Quantity :</label>
                                        <input className="bg-gray-200 text-[18px]  text-gray-600 pl-3 rounded-2xl ml-2  h-10 w-70" placeholder="Enter Quantity..." type="number" name="addbautistainventoryproductquantity" id="addbautistainventoryproductquantity" value={addbautistainventoryproductquantity} onChange={(e) => setaddbautistainventoryproductquantity(e.target.value)} required/></div>
                                  

                                        <button type="submit" disabled={bautistainventoryproductissubmitting} className="submit-btn mt-12 w-full" style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                                                    {bautistainventoryproductissubmitting 
                                                   ? (selectedbautistaproduct ? "Updating..." : "Adding...") 
                                                   : (selectedbautistaproduct ? "Update Product" : "Add Product")}
                                        </button>
                                      {selectedbautistaproduct && (
                                       <div className="mt-3 w-full hover:cursor-pointer bg-[#4e0f0f] justify-center flex items-center  rounded-2xl h-fit w-fit px-7 py-3  transition-all duration-300 ease-in-out" onClick={() => {setshowdeletebautistaproduct(true); setselecteddeletebautistaproduct(selectedbautistaproduct);}}><p className=" text-[#ffffff] font-semibold font-albertsans text-[20px]">Delete</p></div>

                                      )}

                                  
                                  
                                        </div>
                                
                                  
                                  
                                        </div>

                                  </div>
                                </div>
                                </form>
                           </div>
                         </div>
              

          )}



          {showdeletebautistaproduct && (
                       <div className="bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#0000004a] bg-opacity-50">

                         <div className="flex flex-col items  bg-white rounded-2xl w-[600px] h-fit  animate-fadeInUp ">
               

                            <div className="flex items-center rounded-tl-2xl rounded-tr-2xl h-[70px] bg-[#3b1616]"><i className="ml-3 bx bxs-error text-[28px] font-albertsans font-bold text-[#f1f1f1] "/><h1 className="ml-2 text-[23px] font-albertsans font-bold text-[#f0f0f0]">Delete Bautista Eye Center Product</h1></div>
                            <div className="flex flex-col  items-center  h-fit rounded-br-2xl rounded-bl-2xl">
                                <div className="px-5 flex flex-col justify-center  h-[130px] w-full"><p className="font-albertsans font-medium text-[20px]">Are you sure you want to delete this product?</p>
                                {selecteddeletebautistaproduct && ( <>
                                          <p className="text-[18px] mt-3">Product Name: {selecteddeletebautistaproduct.bautistainventoryproductname}</p> </>)}  
                                </div>        
                                <div className="pr-5 flex justify-end  items-center  h-[80px] w-full">
                                  <div className="hover:cursor-pointer mr-2 bg-[#292929] hover:bg-[#414141]   rounded-2xl h-fit w-fit px-7 py-3 hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => setshowdeletebautistaproduct(false)}><p className=" text-[#ffffff]">Cancel</p></div>
                                      {selectedbautistaproduct && (
                                 <button type="button" onClick={deletebautistaproduct}  className="submit-btn w-full" style={{ backgroundColor: "#4e0f0f", fontSize: "20px", color: "white", borderRadius: "20px", width: "120px"}}>
                                    Delete
                                 </button>)} 
            
           
        
            
        
    
                                </div>
                            </div>

                         </div>
                       </div>
          )}










































































          
          
          const [showaddbautistainventoryproductdialog, setshowaddbautistainventoryproductdialog] = useState(false);
          const [bautistainventorycategorynamebox, setbautistainventorycategorynamebox] = useState("");
          const [addbautistainventoryproductname, setaddbautistainventoryproductname] = useState("");
          const [addbautistainventoryproductbrand, setaddbautistainventoryproductbrand] = useState("");
          const [addbautistainventoryproductmodelnumber, setaddbautistainventoryproductmodelnumber] = useState("");
          const [addbautistainventoryproductdescription, setaddbautistainventoryproductdescription] = useState("");
          const [addbautistainventoryproductprice, setaddbautistainventoryproductprice] = useState();
          const [addbautistainventoryproductquantity, setaddbautistainventoryproductquantity] = useState();
          const [addbautistainventoryproductimageselectedimages, setaddbautistainventoryproductimageselectedimages] = useState([]);
          const [addbautistainventoryproductimagepreviewimages, setaddbautistainventoryproductimagepreviewimages] = useState([]);
          const [bautistabautistacurrentimageindex, setbautistabautistacurrentimageindex] = useState(0);
          const addbautistainventoryproductimageimageinputref = useRef(null);
          const [bautistainventoryproductissubmitting, setbautistainventoryproductissubmitting] = useState(false);
          const [bautistainventoryproducts, setbautistainventoryproducts] = useState([]);
          const [bautistaloadingproducts, setbautistaloadingproducts] = useState(true);
          const [showviewbautistainventoryproductdialog, setshowviewbautistainventoryproductdialog] = useState(false);
          const [selectedbautistaproduct, setselectedbautistaproduct] = useState(null);
          const [showdeletebautistaproduct, setshowdeletebautistaproduct] = useState(false);
          const [selecteddeletebautistaproduct, setselecteddeletebautistaproduct] = useState([]);
          
          
          const bautistafilteredproducts = bautistainventoryproducts.filter(product => 
            activebautistainventorycategorytable === 'all' || 
            product.bautistainventoryproductcategory === activebautistainventorycategorytable
          );
          
          
          //PRODUCT IMAGE HANDLING
          
          const addbautistainventoryproductimagehandlechange = async (e) => {
            const files = Array.from(e.target.files);
          
            if(addbautistainventoryproductimageselectedimages.length + files.length > 5){
              alert("Maximum of only 5 product images");
              return;
            }
          
            const imagefiletype = ['image/png', 'image/jpeg', 'image/webp'];
            const maximagefile = 2;
          
            for(const file of files) {
              if(!imagefiletype.includes(file.type)) {
                alert("Please select image files (JPG / PNG");
                return;
              }
          
              if(file.size > maximagefile * 1024 * 1024) {
                alert("Please select images under 2MB");
                return;
              }
            }
          
          
          
            try{
              const compressedimages = await Promise.all(
                files.map(async (file) => {
                  const imageconfiguration = {
                    maximagemb: 1,
                    maxworh: 800,
                    useWebWorker: true,
                    initialQuality: 0.8
                  };
          
                  const compressedimage = await imageCompression(file, imageconfiguration);
                  return compressedimage;
                })
              );
          
          
          
              const previewurls = await Promise.all(
                compressedimages.map(async (image) => {
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      resolve(reader.result);
                    };
                    reader.readAsDataURL(image);
                  });
                })
              );
          
          
          
              setaddbautistainventoryproductimageselectedimages(prev => [...prev, ...compressedimages]);
              setaddbautistainventoryproductimagepreviewimages(prev => [...prev, ...previewurls]);
              setbautistacurrentimageindex(0);
          
          
            }catch(error){
              console.error("Image compression failed: ", error.message);
              alert("Image compression failed");
            }
          
            if(addbautistainventoryproductimageimageinputref.current){
               addbautistainventoryproductimageimageinputref.current.value = "";
            }
          
          };
          
          
          
          
          
          
          
          //PREVIOUS  IMAGE
          const bautistahandlepreviousimage = (e) => {
            e.preventDefault(); 
            if (selectedbautistaproduct) {
              if (!selectedbautistaproduct.bautistainventoryproductimagepreviewimages?.length) return;
              setbautistacurrentimageindex(prev => prev === 0 ? selectedbautistaproduct.bautistainventoryproductimagepreviewimages.length - 1 : prev - 1 );
          
            } else {
              if (!addbautistainventoryproductimagepreviewimages?.length) return;
              setbautistacurrentimageindex(prev => prev === 0 ? addbautistainventoryproductimagepreviewimages.length - 1 : prev - 1 );
            }
          };
          
          //NEXT IMAGE
          const bautistahandlenextimage = (e) => {
            e.preventDefault();
            if (selectedbautistaproduct) {
              if (!selectedbautistaproduct.bautistainventoryproductimagepreviewimages?.length) return;
              setbautistacurrentimageindex(prev => prev === selectedbautistaproduct.bautistainventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1 );
          
            } else {
              if (!addbautistainventoryproductimagepreviewimages?.length) return;
              setbautistacurrentimageindex(prev => prev === addbautistainventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1);
          
            }
          };
          
          
          
          
          
          const addbautistainventoryproductimagehandleremove = (indextoremove) => {
            setaddbautistainventoryproductimageselectedimages(prev =>
              prev.filter((_, index) => index !== indextoremove)
            );
          
            setaddbautistainventoryproductimagepreviewimages(prev =>
              prev.filter((_, index) => index !== indextoremove)
            );
          
            setbautistacurrentimageindex(prev =>
              prev >= indextoremove && prev > 0 ? prev - 1 : prev
            );
          };
          
          const addbautistainventoryproductimagehandleuploadclick = () => {
            addbautistainventoryproductimageimageinputref.current.click();
          };
          
           const resetaddbautistainventoryproductdialog = () => {
            setbautistainventorycategorynamebox("");
            setaddbautistainventoryproductname("");
            setaddbautistainventoryproductbrand("");
            setaddbautistainventoryproductmodelnumber("");
            setaddbautistainventoryproductdescription("");
            setaddbautistainventoryproductprice("");
            setaddbautistainventoryproductquantity("");
            setaddbautistainventoryproductimageselectedimages([]);
            setaddbautistainventoryproductimagepreviewimages([]);
            setbautistacurrentimageindex(0);
            setmessage('');
            setselectedbautistaproduct(null);
          };
          
          
          //FETCHING PRODUCTS
          
            const fetchbautistaproducts = async () => {
              try{
                const response = await fetch('http://localhost:3000/api/bautistainventoryproduct', {
                  headers:{
                    'Authorization' : `Bearer ${currentusertoken}`
                  }
                });
                
                if(!response.ok) throw new Error("Failed to fetch products");
          
                const data = await response.json();
                setbautistainventoryproducts(data);
                 setbautistaloadingproducts(false);
              }catch(error){
                console.error("Failed fetching products: ", error);
                setbautistaloadingproducts(false);
              }
            };
          
          
            useEffect(() => {
              fetchbautistaproducts();
            }, []);
          
          
          
          //INSERTING PRODUCT
          const handlesubmitaddbautistainventoryproduct = async (e) => {
          
              e.preventDefault();
              setbautistainventoryproductissubmitting(true);
          
            try{
          
             if (addbautistainventoryproductimagepreviewimages.length === 0) {
              alert("Upload at least 1 product image");
                     return;
              }
          
          
              const bautistainventoryproductdata = {
          
          
                bautistainventoryproductcategory: bautistainventorycategorynamebox || '',
                bautistainventoryproductname: addbautistainventoryproductname || '',
                bautistainventoryproductbrand:  addbautistainventoryproductbrand || '',
                bautistainventoryproductmodelnumber: addbautistainventoryproductmodelnumber || '',
                bautistainventoryproductdescription: addbautistainventoryproductdescription || '',
                bautistainventoryproductprice: Number(addbautistainventoryproductprice) || 0,
                bautistainventoryproductquantity:  Number(addbautistainventoryproductquantity) || 0,
                bautistainventoryproductimagepreviewimages: addbautistainventoryproductimagepreviewimages || '',
          
          
          
                bautistainventoryproductaddedbyprofilepicture: currentuserdata.profilepicture || '',
                bautistainventoryproductaddedbylastname: currentuserdata.lastname || '',
                bautistainventoryproductaddedbyfirstname: currentuserdata.firstname || '',
                bautistainventoryproductaddedbymiddlename: currentuserdata.middlename || '',
                bautistainventoryproductaddedbytype: currentuserdata.type || '',
                bautistainventoryproductaddedbyemail: currentuserdata.email || '',
          
          
          
              }
          
              console.log(bautistainventoryproductdata);
              const response = await fetch('http://localhost:3000/api/bautistainventoryproduct',{
                method: 'POST',
                headers: {
                  'Content-Type' : 'application/json',
                  'Authorization': `Bearer ${currentusertoken}`
                },
                body: JSON.stringify(bautistainventoryproductdata)
              });
          
          
          
              if(!response.ok){
                throw new Error(`Response fetching error! Error: ${response.status}`);
          
              }
          
          
              const result = await response.json();
              console.log('Ambher Inventory Product insertion successful: ', result);
              await fetchbautistaproducts();
              resetaddbautistainventoryproductdialog();
              setshowaddbautistainventoryproductdialog(false);
          
            }catch(error) {
              console.error('Error Ambher Inventory Product insertion: ', error);
              setbautistainventoryproductissubmitting(false);
            }finally{
              setbautistainventoryproductissubmitting(false);
            }
          
          };
          
          //UPDATING PRODUCT
          const handleupdatebautistainventoryproduct = async (e) => {
          
              e.preventDefault();
              setbautistainventoryproductissubmitting(true);
          
            try{
             
             if (!selectedbautistaproduct) {
                throw new Error ("No product is selected"); 
              }
          
          
              const updatebautistaproduct = {
          
          
                bautistainventoryproductcategory: bautistainventorycategorynamebox || '',
                bautistainventoryproductname: addbautistainventoryproductname || '',
                bautistainventoryproductbrand:  addbautistainventoryproductbrand || '',
                bautistainventoryproductmodelnumber: addbautistainventoryproductmodelnumber || '',
                bautistainventoryproductdescription: addbautistainventoryproductdescription || '',
                bautistainventoryproductprice: Number(addbautistainventoryproductprice) || 0,
                bautistainventoryproductquantity:  Number(addbautistainventoryproductquantity) || 0,
                bautistainventoryproductimagepreviewimages: addbautistainventoryproductimagepreviewimages || '',
          
          
          
                bautistainventoryproductaddedbyprofilepicture: currentuserdata.profilepicture || '',
                bautistainventoryproductaddedbylastname: currentuserdata.lastname || '',
                bautistainventoryproductaddedbyfirstname: currentuserdata.firstname || '',
                bautistainventoryproductaddedbymiddlename: currentuserdata.middlename || '',
                bautistainventoryproductaddedbytype: currentuserdata.type || '',
                bautistainventoryproductaddedbyemail: currentuserdata.email || '',
          
          
          
              }
          
          
              const response = await fetch(`http://localhost:3000/api/bautistainventoryproduct/${selectedbautistaproduct.bautistainventoryproductid}`,{
                method: 'PUT',
                headers: {
                  'Content-Type' : 'application/json',
                  'Authorization': `Bearer ${currentusertoken}`
                },
                body: JSON.stringify(updatebautistaproduct)
              });
          
          
          
              if(!response.ok){
                throw new Error(`Response fetching error! Error: ${response.status}`);
          
              }
          
          
              const result = await response.json();
              console.log('Ambher Inventory Product updated successful: ', result);
          
          
              const updatedbautistaproduct = bautistainventoryproducts.map(product =>
                product.bautistainventoryproductid === selectedbautistaproduct.bautistainventoryproductid ? result : product);
          
              setbautistainventoryproducts(updatedbautistaproduct);
              resetaddbautistainventoryproductdialog();
              setshowaddbautistainventoryproductdialog(false);
              setselectedbautistaproduct(null);
          
            }catch(error) {
              console.error('Error Ambher Inventory Product update: ', error);
              setbautistainventoryproductissubmitting(false);
            }finally{
              setbautistainventoryproductissubmitting(false);
            }
          
          };
          
          
          //DELETE PRODUCT
          const deletebautistaproduct = async (e) => {
              e.preventDefault();
          
              if(!selectedbautistaproduct) {
                alert("No product is selected");
                return;
              }
          
              try{
                const response = await fetch(`http://localhost:3000/api/bautistainventoryproduct/${selectedbautistaproduct.bautistainventoryproductid}`,{
                  method: 'DELETE',
                  headers: {
                    'Authorization' : `Bearer ${currentusertoken}`
                  }
                });
          
                if(!response.ok) {
                  throw new Error(`Failed to delete bautista product: ${response.status}`);
                }
          
          
                setbautistainventoryproducts(prev => prev.filter(product => product.bautistainventoryproductid!== selectedbautistaproduct.bautistainventoryproductid));
                resetaddbautistainventoryproductdialog();
                setselectedbautistaproduct(null);
                setshowaddbautistainventoryproductdialog(false);
                setshowdeletebautistaproduct(false);
          
             
             
              }catch(error){
                console.error('Error deleting bautista product:', error);
              }
          
          };
          
          