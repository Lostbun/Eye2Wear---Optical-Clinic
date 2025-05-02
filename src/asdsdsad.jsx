            <form onSubmit={handledemosubmit}>
                         
                           <div className="ml-25 mt-5 flex ">
     
     
                           <div className=" w-60 h-60 ml-10">
                             <img className=" object-cover h-60 w-full rounded-full" src={previewimage || defaultprofilepic}/>
     
                             <input  className="hidden" type="file" onChange={handleprofilechange} accept="image/jpeg, image/jpg, image/png" ref={imageinputref} />
                             <div onClick={handleuploadclick}  className="mt-5 flex justify-center items-center align-middle p-3 bg-[#0ea0cd] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-image pr-2 font-bold text-[22px] text-white"/><p className="font-semibold text-[20px] text-white">Upload</p></div>
                             
                             {selectedprofile && (<div onClick={handleremoveprofile} className="mt-5 flex justify-center items-center align-middle p-3 bg-[#bf4c3b] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" ><i className="bx bx-x font-bold text-[30px] text-white"/><p className="font-semibold text-[20px] text-white">Remove</p></div>)}
                           </div>
     
                           <div className=" ml-15">
                            <div className=" h-fit form-group  ">
                             <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientlastname">Last Name :</label>     
                             <input className="w-120 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientlastname} onChange={(e) => setdemoformdata({...demoformdata, patientlastname: e.target.value})} type="text" name="patientlastname" id="patientlastname" placeholder="Patient Last Name..."/></div>
     
                             <div className=" h-fit form-group  mt-5">
                             <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientfirstname">First Name :</label>     
                             <input className="w-120 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientfirstname} onChange={(e) => setdemoformdata({...demoformdata, patientfirstname: e.target.value})}  type="text" name="patientfirstname" id="patientfirstname" placeholder="Patient First Name..."/></div>
     
                             <div className=" h-fit form-group  mt-5 flex">
                             <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientmiddlename">Middle Name :</label>     
                             <input className="w-112 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientmiddlename} onChange={(e) => setdemoformdata({...demoformdata, patientmiddlename: e.target.value})}  type="text" name="patientmiddlename" id="patientmiddlename" placeholder="Patient Middle Name.."/></div>
     
     
     
                             <div className=" mt-5 flex items-center">
                             <div className="">
     
                             <div className=" h-fit form-group">
                             <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientage">Age :</label>     
                             <input className="w-32 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientage} onChange={(e) => setdemoformdata({...demoformdata, patientage: e.target.value})} type="number" name="patientage" id="patientage" placeholder="Age..."/></div>
     
                                 </div>
     
                                 <div className="">
                                   
                                 <div className=" h-fit form-group ml-15">
                                <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientbirthdate">Birthdate :</label>     
                                <input className="w-38 justify-center border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientbirthdate} onChange={(e) => setdemoformdata({...demoformdata, patientbirthdate: e.target.value})}  type="date" name="patientbirthdate" id="patientbirthdate" placeholder=""/> </div>
     
                                 </div>
     
     
                             </div>
     
     
     
     
                             <div className=" h-fit form-group  mt-5 flex">
                             <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientgender">Gender :</label>     
                             <div className="ml-3"><GenderBox value={demoformdata.patientgender} onChange={(gender) => setdemoformdata({...demoformdata, patientgender: gender})} /></div>  </div>
     
     
                             <div className=" h-fit form-group  mt-5 flex">
                             <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patientcontactnumber">Contact Number :</label>     
                             <input className="w-104 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientcontactnumber} onChange={(e) => setdemoformdata({...demoformdata, patientcontactnumber: e.target.value})} type="text" name="patientcontactnumber" id="patientcontactnumber" placeholder="Ex: 09xxxxxxxxx"/> </div>
     
                             <div className=" h-fit form-group  mt-5 flex">
                             <label className="text-[23px]  font-bold  text-[#2d2d44] "htmlFor="patienthomeaddress">Home Address :</label>     
                             <input className="w-104 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"   value={demoformdata.patienthomeaddress} onChange={(e) => setdemoformdata({...demoformdata, patienthomeaddress: e.target.value})}  type="text" name="patienthomeaddress" id="patienthomeaddress" placeholder="Ex: #001 Sison St., Townsite, Limay, Bataan"/> </div>
     
     
                             <div className=" h-fit form-group  mt-20 flex">
                             <label className="text-[20px]  font-bold  text-[#2d2d44] "htmlFor="patientemergencycontactname">Emergency Contact Name :</label>     
                             <input className="w-90 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold"  value={demoformdata.patientemergencycontactname} onChange={(e) => setdemoformdata({...demoformdata,patientemergencycontactname: e.target.value})}  type="text" name="patientemergencycontactname" id="patientemergencycontactname" placeholder="Ex: Juan Dela Cruz"/> </div>
     
                             <div className=" h-fit form-group  mt-5 flex">
                             <label className="text-[20px]  font-bold  text-[#2d2d44] "htmlFor="patientemergencycontactnumber">Emergency Contact Number :</label>     
                             <input className="w-84 border-b-2 border-gray-600 ml-3 text-[#2d2d44] text-[20px]  font-semibold" value={demoformdata.patientemergencycontactnumber} onChange={(e) => setdemoformdata({...demoformdata, patientemergencycontactnumber: e.target.value})}  type="text" name="patientemergencycontactnumber" id="patientemergencyconctactnumber" placeholder="Ex: 09xxxxxxxxx"/> </div>
     
     
            
                           <div className=" mt-15">
     
                           <button type="submit" disabled={issubmitting} className={`submit-btn mt-12 w-full flex justify-center items-center ${issubmitting? "opacity-75 cursor-not-allowed" : "" }`} style={{ backgroundColor: "#2b2b44", fontSize: "20px", padding: "10px 20px", color: "white", borderRadius: "20px",   }}>
                              Save Changes
                           </button>
     
                             </div>
     
     
                       
     
                          </div>
                             
     
                           </div>
                         
       
                          </form>
         </div>
       </div>)}

