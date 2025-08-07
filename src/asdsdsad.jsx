         <div className=" w-[100%] registration-container">

                                    
                                        <div className="flex items-center mx-1  w-fit  h-fit  mt-2 break-words min-w-0 "><h1 className="font-albertsans rounded-md py-1 px-2  rounded-1xl bg-[#F0F6FF] font-medium   text-[#0d0d0d]  min-w-0 break-words ">{bautistainventorycategorynamebox}</h1>
                                        <p className="font-albertsans ml-1">by</p>
                                        <p className="font-albertsans ml-1 font-semibold  ">{addbautistainventoryproductbrand}</p>
                                        </div>
                                        
                                     

                                        <h1 className="font-albertsans mt-3 min-w-0 break-words h-fit w-full font-albertsans font-bold text-[#212121] text-[29px]">{addbautistainventoryproductname}</h1>
                         
                                        <div className="mt-1 flex items-center">
                                          <img src={starimage} className="w-5 h-5"/>
                                          <p className="font-albertsans ml-2 mt-1 text-[15px] font-semibold">4.8</p><span className="mt-1 text-[13px] pr-3 ml-2">(89 reviews)</span>
                                          
                                          <p className="mt-1 font-albertsans border-l-2  border-[#8c8c8c] pl-3  text-[13px]">50 sold</p>
                                        </div>
                        
                                  
                                        <p className="mt-5 font-albertsans font-semibold text-[#478d12] text-[40px]">₱{Number(addbautistainventoryproductprice).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</p>
                                  
                                        <p className="font-albertsans mt-6  font-medium text-[#020202] text-[18px]">Description</p>
                                        <p className="font-albertsans font-semibold text-[#4b4b4b] mt-3">{addbautistainventoryproductdescription}</p>
                                      
                                       

                                      {addbautistainventoryproductquantity === 0 ? ( 
                                        <div className="bg-gray-400 py-2 px-3 rounded-md justify-center  gap-4 mt-15 flex items-center">
                                          <p className="font-albertsans font-semibold ">Out of Stock</p>
                                         </div>
                                       
                                      ):(
                                        <div className="gap-4 mt-15 flex items-center">
                                          <p className="font-albertsans font-semibold ">In Stock:</p>
                                          <p className="font-albertsans font-semibold text-[#616161] text-[14px]">{addbautistainventoryproductquantity} pieces available </p>
                                         </div>
                                      )}    



                                           <div className="flex w-auto items-center justify-between mt-10 h-22 w-full bg-[#fbfbfb] rounded-2xl">
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={find} className="w-8 h-8"/><p className="font-albertsans text-[13px] font-medium">Browse Products</p></div>
                                              <div className="gap-2 h-full w-30 flex items-center flex-col justify-center"><img src={nextimage} className="w-8 h-8"/></div>
                                              <div className="gap-2 h-full w-auto min-w-[160px] flex items-center flex-col justify-center"><img src={storeimage} className="w-8 h-8"/> <p className="font-albertsans text-[13px] font-medium whitespace-nowrap">Go to Bautista Eye Center</p></div>
                                              <div className="gap-2 h-full w-30 flex items-center flex-col justify-center"><img src={nextimage} className="w-8 h-8"/></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={inquire} className="w-8 h-8"/><p className=" font-albertsans text-[13px] font-medium">Inquire</p></div>
                                           </div>
                                   
                                        </div>