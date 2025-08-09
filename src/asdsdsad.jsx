          {showpatientorderedbautista && (
            <>
            {console.log("Modal data:", selectedorderbautistaproduct)}
                         <div className="overflow-y-auto h-auto px-10 bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="motion-preset-fade  h-auto min-h-180  mb-7 mt-7 pl-5 pr-5 bg-white rounded-2xl w-full  animate-fadeInUp ">
                                <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                  <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">View Order </h1></div>
                                  <div onClick={() => {
                                     setorderbautistaEmail('');
                                     setorderbautistaprofilePicture('');
                                     setorderbautistafullName('');
                                     setorderbautistalastName('');
                                     setorderbautistamiddleName('');
                                     setorderbautistafirstName('');
                                     setorderbautistacontactNumber('');
                                     setorderbautistadownPayment('');
                                     setorderbautistacustomFee('');
                                     setorderbautistaamountPaid('');
                                     setorderbautistaNotes('');
                                     setactivebautistapickupnoworlater(null);
                                     setbautistaCount(0); 
                                     setbautistaproductsoldCount(0);
                                     setselectedorderbautistaproduct(null);
                                     setshowpatientorderedbautista(false);}} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                </div>




                       

          
                         <div className="pb-20 motion-opacity-in-0  bg-[#fefefe] rounded-2xl w-full h-auto animate-fadeInUp ">

                          <form className="flex flex-col  ml-15 mr-15 mt-5    pb-10" >
                                <div className=" flex justify-center items-start rounded-2xl w-full h-auto">
                                  <div className=" pb-10 w-full h-full mr-15 rounded-2xl flex justify-center ">



                                      <div className=" h-fit w-fit flex-none">
  
                                <div className=" relative">
                                

                                <img  className="mt-2 w-100 object-cover rounded-2xl h-100" src={(selectedorderbautistaproduct?.bautistainventoryproductimagepreviewimages?.[orderbautistacurrentimageindex]) || defaultimageplaceholder}/>

                                     {((selectedorderbautistaproduct?.bautistainventoryproductimagepreviewimages?.length || 0) > 1 || 
                                       addbautistainventoryproductimagepreviewimages?.length > 1) && (
                                         <>
                                           <div type="button" onClick={orderbautistahandlepreviousimage}  className="cursor-pointer bg-opacity-50 hover:bg-opacity-75 rounded-2xl text-white p-2 absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-500"><i className="bx bx-chevron-left text-2xl" /></div>

                                           <div type="button" onClick={orderbautistahandlenextimage}  className="cursor-pointer rounded-2xl absolute bg-opacity-50 text-white p-2 transform -translate-y-1/2 bg-gray-500 hover:bg-opacity-75 right-2 top-1/2">  <i className="bx bx-chevron-right text-2xl" /></div>

                                         </>
                                       )}

                                      {orderbautistainventoryproductimagepreviewimages.length > 0 && (
                                          <div className="overflow-x-auto flex gap-2 mt-2 p-4 border-y-1 rounded-2xl bg-[#fbfbfb]  items-center ">
                                              {orderbautistainventoryproductimagepreviewimages.map((preview, index) => (
                                                  <div key={index} className="relative">
                                                  <img 
                                                      onClick={() => setorderbautistacurrentimageindex(index)} 
                                                      src={preview} 
                                                      className={`rounded-lg cursor-pointer object-cover w-20 h-20 ${orderbautistacurrentimageindex === index ? 'border-2 border-[#78b0d4]' : ''}`} 
                                                  />
                                                  </div>
                                              ))}
                                          </div>
                                        )}

                                     </div>
                                      
                                      

                                      </div>



                                  </div>
                          
                                  <div className="  w-full h-auto flex items-start mb-10 rounded-2xl min-w-0">
                                        <div className=" w-[100%] h-auto  rounded-4xl">
                                  
                                  
              
                                        <div className=" w-[100%] registration-container">

                                    
                                        <div className="flex items-center mx-1  w-fit  h-fit  mt-2 break-words min-w-0 "><h1 className="font-albertsans rounded-md py-1 px-2  rounded-1xl bg-[#F0F6FF] font-medium   text-[#0d0d0d]  min-w-0 break-words ">{selectedorderbautistaproduct?.patientorderbautistaproductcategory}</h1>
                                        <p className="font-albertsans ml-1">by</p>
                                        <p className="font-albertsans ml-1 font-semibold  ">{selectedorderbautistaproduct?.patientorderbautistaproductbrand}</p>
                                        </div>
                                        
                                     

                                        <h1 className="font-albertsans mt-3 min-w-0 break-words h-fit w-full font-albertsans font-bold text-[#212121] text-[29px]">{selectedorderbautistaproduct?.patientorderbautistaproductname}</h1>
                         
                                        <div className="mt-1 flex items-center">
                                          <img src={starimage} className="w-5 h-5"/>
                                          <p className="font-albertsans ml-2 mt-1 text-[15px] font-semibold">4.8</p><span className="mt-1 text-[13px] pr-3 ml-2">(89 reviews)</span>
                                          
                                          <p className="mt-1 font-albertsans border-l-2  border-[#8c8c8c] pl-3  text-[13px]">{bautistaproductsoldCount} sold</p>
                                        </div>
                        
                                  
                                        <p className="mt-5 font-albertsans font-semibold text-[#478d12] text-[40px]">₱{Number(selectedorderbautistaproduct?.patientorderbautistaproductprice).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</p>
                                  
                                        <p className="font-albertsans mt-6  font-medium text-[#020202] text-[18px]">Description</p>
                                        <p className="font-albertsans font-semibold text-[#4b4b4b] mt-3">{selectedorderbautistaproduct?.patientorderbautistaproductdescription}</p>
                                      
                                    <div className="gap-4 mt-15 flex items-center">
                                          <p className="font-albertsans font-semibold ">Quantity:</p>
                                        <div className="w-auto h-10  flex items-center justify-between border-1 rounded-2xl">
                                          <div   className={`font-bold h-full w-10 bg-gray-100 rounded-l-2xl flex items-center justify-center cursor-pointer select-none ${bautistacount <= 1 ? "opacity-50 cursor-not-allowed" : "active:bg-gray-200"}`} style={{ WebkitTapHighlightColor: 'transparent' }} type="button" onClick={() => setbautistaCount (c => Math.max(1, c - 1))}>-</div>

                                              <input type="number" min="1" max={orderbautistainventoryproductquantity}  value={bautistacount}
                                                     onChange={(e) => {
                                                       const bautistacountvalue = parseInt(e.target.value);
                                                       if (!isNaN(bautistacountvalue)) {
                                                         const clampedbautistacountValue = Math.max(1, Math.min(orderbautistainventoryproductquantity, bautistacountvalue));
                                                         setbautistaCount(clampedbautistacountValue);
                                                       }
                                                     }}
                                                     className="w-16 text-center border-0 focus:outline-none font-semibold"/>
                                                   
                                          <div  className={`font-bold h-full w-10 bg-gray-100 rounded-r-2xl flex items-center justify-center cursor-pointer select-none  ${bautistacount >= orderbautistainventoryproductquantity ? "opacity-50 cursor-not-allowed" : "active:bg-gray-200"}`} style={{ WebkitTapHighlightColor: 'transparent' }}  type="button" onClick={() => setbautistaCount ((c) => Math.min(c + 1, orderbautistainventoryproductquantity))}>+</div> 
                                         </div>
                                               <p className="font-albertsans font-semibold text-[#616161] text-[14px]">{orderbautistainventoryproductquantity} pieces available </p>
                                       </div>


                                   
                                        </div>
                                

                                  
                                        </div>


                                  </div>
                                </div>
                                 <div className=" border-1 mt-10 p-5 w-full h-auto rounded-md ">
                                 <div className="w-full  flex items-center justify-center"><h1 className=" font-albertsans text-[#184d85] text-[25px] font-bold">Product Order Form</h1> </div>

                              <div className="flex items-start justify-center mt-10">                  
                                 <div className="pb-2  w-[100%] h-[100%]">
                                 <div className="flex items-center gap-2  ">
                                    <h1 className=" w-35 text-[#242424] font-albertsans font-semibold text-[17px]">Customer Email : </h1>
                                    <div><input value={orderbautistaEmail} onChange={(e) => setorderbautistaEmail(e.target.value)} type="text" placeholder="Enter customer email..."   className="transition-all duration-300 ease-in-out  px-5 py-1.5 rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input>
                                  {orderbautistacheckEmail && ( <p className="text-gray-500 text-sm ml-1">Checking email...</p>)}
                                    {orderbautistaemailError && (<p className="text-red-500 text-sm ml-1">Email does not exist</p>)}
                                       </div>
                                     
                                 </div>

                                 <div className="flex items-center gap-2 mt-3">
                                    <h1 className=" w-35 text-[#242424] font-albertsans font-semibold text-[17px]">Full Name : </h1>
                                    <input  readOnly value={orderbautistafullName} onChange={(e) => setorderbautistafullName(e.target.value)} type="text"   className="transition-all duration-300 ease-in-out  min-w-14 w-auto px-5 py-1.5  rounded-2xl  bg-[#e4e4e4] "></input>
                                 </div>

                                 <div className="flex items-center gap-2  mt-3">
                                    <h1 className=" w-35 text-[#242424] font-albertsans font-semibold text-[17px]">Contact Number : </h1>
                                    <input readOnly value={orderbautistacontactNumber} onChange={(e) => setorderbautistacontactNumber(e.target.value)} type="text"   className="transition-all duration-300 ease-in-out  min-w-14 w-auto px-5 py-1.5  rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input>
                                 </div>



                                <div className="flex items-center gap-2  mt-3">
                                    <h1 className="w-35 text-[#242424] font-albertsans font-semibold text-[17px]">Custom Fee : </h1>
                                    <input  value={orderbautistacustomFee} onChange={(e) => setorderbautistacustomFee(e.target.value)} type="text"   className=" transition-all duration-300 ease-in-out  min-w-14 w-auto px-5 py-1.5  rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input>
                                 </div>

                                 <div className="flex items-center gap-2  mt-3">
                                    <h1 className="w-35 text-[#242424] font-albertsans font-semibold text-[17px]">Amount Paid : </h1>
                                    <input  value={orderbautistaamountPaid} onChange={(e) => setorderbautistaamountPaid(e.target.value)}  type="text" placeholder="10% for downpayment"  className=" transition-all duration-300 ease-in-out  min-w-14 w-auto px-5 py-1.5  rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input>
                                 </div>
                                

                                {Number(orderbautistaamountPaid) >= Number(orderbautistatotalwithFee) > 0 &&(
                                    <div className="flex items-center gap-2  mt-3">
                                            <h1 className=" w-35 text-[#242424] font-albertsans font-semibold text-[17px]">Pickup : </h1>
                                            <div onClick={() => showbautistapickupnoworlater('bautistaorderpickupnow')}  className={`px-5 py-2 cursor-pointer mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-2xl   text-center flex justify-center items-center ${activebautistapickupnoworlater ==='bautistaorderpickupnow' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activebautistapickupnoworlater ==='bautistaorderpickupnow' ? 'text-white' : ''}`}>Now</h1></div>
                                            <div onClick={() => showbautistapickupnoworlater('bautistaorderpickuplater')}  className={`px-5 py-2 cursor-pointer ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-2xl  text-center flex justify-center items-center ${activebautistapickupnoworlater ==='bautistaorderpickuplater' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activebautistapickupnoworlater ==='bautistaorderpickuplater' ? 'text-white' : ''}`}>Later</h1></div>
                                    </div>
                                )}


                                 <div className="flex items-center gap-2  mt-3">
                                    <h1 className="w-35 text-[#242424] font-albertsans font-semibold text-[17px]">Order Notes : </h1>
                                    <textarea className=" transition-all duration-300 ease-in-out  w-56 px-5 py-1.5  rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500" value={orderbautistaNotes} ref={textarearef} rows={1} style={{minHeight:'30px'}} type="text"  onChange={(e) =>  {setorderbautistaNotes(e.target.value); adjusttextareaheight();}} />
                                 </div>


                                 </div>

                                 <div className="flex flex-col justify-center items-start w-[100%] h-[100%]">                
                                 <div className="flex justify-center items-start w-[100%] h-[100%]">
                                     <div className=" gap-2 flex flex-col h-full w-full "> 
                                        <h1 className="text-[15px] font-albertsans font-semibold">Item Price </h1>
                                        <h1 className="text-[15px] font-albertsans font-semibold">Quantity </h1>
                                        <h1 className="text-[15px] font-albertsans font-semibold">Subtotal </h1>
                                        <h1 className="text-[15px] w-full font-albertsans font-semibold">Customization Fee </h1> 
                                        <h1 className="text-[15px] border-b-1 pb-2 w-full font-albertsans font-semibold">Discount </h1>     
                                        <h1 className=" font-albertsans font-semibold text-[19px] mt-5">Overall Total </h1>
                                        <h1 className=" w-full font-albertsans font-semibold">Amount Paid </h1> 
                                        {Number(orderbautistaamountPaid) > Number(orderbautistatotalwithFee) ? (
                                         <h1 className=" w-full font-albertsans font-semibold">Change </h1>   
                                        ):(
                                         <h1 className=" w-full font-albertsans font-semibold">Remaining Balance </h1>       
                                        )}
                                        
                                       
                                     </div>
                                     <div className=" flex flex-col items-end gap-2  justify-end h-full w-full "> 
                                        <h1 className="font-albertsans font-medium text-[#242424]">₱ {Number(orderbautistainventoryproductprice).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})} </h1>
                                        <h1 className="font-albertsans font-semibold">x {bautistacount}</h1>
                                        <h1 className="font-albertsans font-medium">₱ {Number(orderbautistainventoryproductprice * bautistacount).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</h1>
                                        <h1 className="font-albertsans font-medium">₱ {Number(orderbautistacustomFee).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</h1>
                                        <h1 className=" font-albertsans font-medium">0</h1>     
                                        <h1 className="font-albertsans font-bold text-[#478d12] text-[25px] mt-3">₱ {Number(orderbautistatotalwithFee).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</h1>
                                        <h1 className="font-albertsans font-medium">₱ {Number(orderbautistaamountPaid).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</h1>
                                        {Number(orderbautistaamountPaid) > Number(orderbautistatotalwithFee) ? (
                                         <h1 className="font-albertsans font-medium">₱ {Number(orderbautistaamountpaidChange).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</h1>
                                        ):(
                                          <h1 className="font-albertsans font-medium">₱ {Number(orderbautistaremainingBalance).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</h1>
                                        )}

                                     </div> 


                                 </div>

                                {(Number(orderbautistaremainingBalance) === 0 || Number(orderbautistaamountpaidChange) > 0) && activebautistapickupnoworlater==='bautistaorderpickupnow' ? (
                                  <div onClick={(e) => submitpatientorderbautista(e)} className="w-full mt-10 p-2 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-2xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><p className="font-bold font-albertsans text-white text-[18px] ml-2">Complete Order</p></div>
                                  ) : (
                                 (Number(orderbautistaamountPaid) >= Number(orderbautistatotalwithFee) * 0.10) || activebautistapickupnoworlater==='bautistaorderpickuplater' ? (
                                  <div onClick={(e) => submitpatientpendingorderbautista(e)} className="w-full mt-10 p-2 hover:cursor-pointer hover:scale-103 bg-[#F08000] rounded-2xl flex justify-center items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><p className="font-bold font-albertsans text-white text-[18px] ml-2">Set as Pending Order</p></div>
                                  ) : null)}
                                    
 


                              </div>   
                              </div> 
                                 </div>

                                </form>
                           </div>
                   
                   



                                      
                              


                                </div>
                           </div>
                   
              </>

                )}