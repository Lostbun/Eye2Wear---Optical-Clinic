          {showpatientorderbautistascheduleandreview && (

                 <div className="overflow-y-auto h-auto  bg-opacity-0 flex justify-center items-center z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                   <div className="flex items-center motion-opacity-in-0 w-auto gap-10 p-10 py-8.6 bg-[#fefefe] rounded-2xl h-auto mb-10 animate-fadeInUp ">
                    
                    <img  className="mt-2 w-120 object-cover rounded-2xl h-120" src={(selectedbautistaproduct?.bautistainventoryproductimagepreviewimages?.[bautistacurrentimageindex]) || (addbautistainventoryproductimagepreviewimages?.[bautistacurrentimageindex]) || defaultimageplaceholder}/>
                     <div className=" w-150  registration-container">

                                    
                                        <div className="flex items-center mx-1  w-fit  h-fit  mt-2 break-words min-w-0 "><h1 className="font-albertsans rounded-md py-1 px-2  rounded-1xl bg-[#F0F6FF] font-medium   text-[#0d0d0d]  min-w-0 break-words ">{bautistainventorycategorynamebox}</h1>
                                        <p className="font-albertsans ml-1">by</p>
                                        <p className="font-albertsans ml-1 font-semibold  ">{addbautistainventoryproductbrand}</p>
                                        </div>
                                        
                                     

                                        <h1 className="font-albertsans mt-3 min-w-0 break-words h-fit w-full font-albertsans font-bold text-[#212121] text-[29px]">{addbautistainventoryproductname}</h1>
                         

                        
                                  
                                        <p className="mt-5 font-albertsans font-semibold text-[#478d12] text-[40px]">₱{addbautistainventoryproductprice}</p>
                                  
                                        <p className="font-albertsans mt-6  font-medium text-[#020202] text-[18px]">Description</p>
                                        <p className="font-albertsans font-semibold text-[#4b4b4b] mt-1">{addbautistainventoryproductdescription}</p>
                                      
                                       
                                        <div className="gap-4 mt-5 flex items-center">
                                          <p className="font-albertsans font-semibold ">Quantity: <span className="ml-3">{bautistacount}</span></p>
                                         </div>
                                         
                                       <div className="flex items-center mt-3">
                                        
                                      <p className="font-albertsans font-semibold ">Select Pickup Date:</p>   
                                      <input   className="w-38 justify-center border-b-2 border-[#272727] ml-3 text-[16px] font-semibold [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[70%]"
                                               value={patientorderbautistaproductchosenpickupdate}  
                                               onChange={(e) => {const selecteddate = new Date(e.target.value);
                                                                  if (selecteddate < dateinphtomorrow) {
                                                                    e.preventDefault();
                                                                    return;
                                                                  }
                                                                  setpatientorderbautistaproductchosenpickupdate(e.target.value);  }}  
                                                                  type="date"
                                                                  name="patientorderbautistaproductchosenpickupdate"
                                                                  id="patientorderbautistaproductchosenpickupdate"
                                                                  min={dateinphtomorrow.toISOString().split('T')[0]}
                                                                  max={dateinphmaxdate.toISOString().split('T')[0]}
                                                                  placeholder=""/> </div>


                                      {patientorderbautistaproductchosenpickupdate &&(
                                          <div  className="mt-10 hover:cursor-pointer hover:scale-102  font-albertsans bg-[#117db0]  hover:rounded-2xl transition-all duration-300 ease-in-out rounded-2xl px-25 py-2.5 text-center flex justify-center items-center "><span className="font-albertsans font-bold text-white text-[17px]">Submit Order</span></div>
                                      )}
                                          

                                        </div>
                    
                    </div>
                  </div>
              

          )}