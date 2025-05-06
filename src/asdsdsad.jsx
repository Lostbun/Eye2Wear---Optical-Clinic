<div className="flex ">     
        
<div className="flex flex-col w-full">           
<div className=" flex flex-col h-fit form-group ml-3 mt-4 w-full ">
      <label className="text-[18px]  font-bold  text-[#434343] "htmlFor="patientambherappointmentdate">Appointment Details : </label>     
   {/*<input className="h-10 w-60 p-3 mt-2 justify-center border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold"   type="date" name="patientambherappointmentdate" id="patientambherappointmentdate" placeholder="" required={!!ambherservicesselected}/>*/}
   <div className="h-max w-full flex flex-col items-start p-3 mt-2 justify-start border-b-2 border-gray-600 bg-gray-200 rounded-2xl text-[#2d2d44] text-[18px]  font-semibold">
     {(selectedpatientappointment.patientambherappointmentstatus === "Accepted" ||
     selectedpatientappointment.patientambherappointmentstatus === "Completed") && (

       <h1>{selectedpatientappointment.patientambherappointmenteyespecialist}</h1>

   )}
    <h1>{formatappointmatedates(selectedpatientappointment.patientambherappointmentdate)} <span className="ml-2">({formatappointmenttime(selectedpatientappointment.patientambherappointmenttime)})</span></h1>


    {selectedpatientappointment.patientambherappointmentstatus === "Completed" && (
 <div id="patientambherappointmentpaymentotal" className="mt-5" >
   <h3 className="font-bold text-[15px] text-[#1a690e]">Payment Total:</h3>
   <p className="text-[#2d2d44] text-[18px]">
     ₱{selectedpatientappointment.patientambherappointmentpaymentotal}
   </p>
 </div>
)}
   </div>
   
    </div>






</div>

</div>
