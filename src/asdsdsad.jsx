 { activedashboard === 'appointmentmanagement' && (<div id="appointmentmanagement" className="pl-5 pr-5 pb-4 pt-4 transition-all duration-300  ease-in-out border-1 bg-white border-gray-200 shadow-lg w-[100%] h-[100%] rounded-2xl" >   

<div className="flex items-center"><i className="bx bxs-calendar text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Appointment Management</h1></div>
<div className="flex justify-between items-center mt-3 h-[60px]">
  <div onClick={() => showappointmentstable('allappointmentstable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmentstable ==='allappointmentstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmentstable ==='allappointmentstable' ? 'text-white' : ''}`}>All</h1></div>
  <div onClick={() => showappointmentstable('ambherappointmentstable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmentstable ==='ambherappointmentstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmentstable ==='ambherappointmentstable' ? 'text-white' : ''}`}>Ambher Optical</h1></div>
  <div onClick={() => showappointmentstable('bautistaappointmentstable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeappointmentstable ==='bautistaappointmentstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeappointmentstable ==='bautistaappointmentstable' ? 'text-white' : ''}`}>Bautista Eye Center</h1></div>
</div>



{/*All Appointments Table*/}{/*All Appointments Table*/}{/*All Appointments Table*/}{/*All Appointments Table*/}{/*All Appointments Table*/}{/*All Appointments Table*/}{/*All Appointments Table*/}
 { activeappointmentstable === 'allappointmentstable' && ( <div id="allappointmentstable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >

      <div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
      <div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." value={searchAlls} onChange={(e) => {setsearchAlls(e.target.value); filterallappointments(e.target.value);}} className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
      </div>

      <div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">

      </div>





 </div> )}



{/*Staff appointments Table*/} {/*Staff appointments Table*/} {/*Staff appointments Table*/} {/*Staff appointments Table*/} {/*Staff appointments Table*/} {/*Staff appointments Table*/} {/*Staff appointments Table*/} {/*Staff appointments Table*/}              
 { activeappointmentstable === 'ambherappointmentstable' && ( <div id="ambherappointmentstable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >

<div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
<div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." value={searchstaffs} onChange={(e) => {setsearchstaffs(e.target.value); filterambherappointments(e.target.value);}} className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
</div>

<div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">

</div>




 </div> )}



{/*Owner appointments Table*/} {/*Owner appointments Table*/} {/*Owner appointments Table*/} {/*Owner appointments Table*/} {/*Owner appointments Table*/} {/*Owner appointments Table*/} {/*Owner appointments Table*/}
 { activeappointmentstable === 'bautistaappointmentstable' && ( <div id="bautistaappointmentstable" className="animate-fadeInUp flex flex-col items-center border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >

<div className=" mt-5  w-full h-[60px] flex justify-between rounded-3xl pl-5 pr-5">              
<div className="flex justify-center items-center"><h2 className="font-albertsans font-bold text-[20px] text-[#434343] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input type="text" placeholder="Enter here..." value={searchowners} onChange={(e) => {setsearchowners(e.target.value); filterbautistaappointments(e.target.value);}} className="transition-all duration-300 ease-in-out py-2 pl-10 rounded-3xl border-2 border-[#6c6c6c] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
</div>

<div className=" rounded-3xl h-full w-full mt-2 bg-[#f7f7f7]">

</div>







{/*End Appointment Management*/}
</div>)}
