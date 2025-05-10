  <div className="flex items-center mt-5 ml-7">
    <input className="w-7 h-7 mr-3 appearance-none border-2 border-[#2d2d44] rounded-md checked:bg-[#2d2d44] checked:border-[#2d2d44] after:text-white after:text-lg after:absolute after:left-1/2 after:top-1/2 after:content-['✓'] after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 relative cursor:pointer transition-all"  checked={selectedpatientappointment.patientbautistaappointmentotherservice} onChange={(e) => setshowotherpatientbautistaappointmentotherservice(e.target.checked)}  type="checkbox" name="patientbautistaappointmentotherservice" id="patientbautistaappointmentotherservice" />
    <label className="text-[18px]  font-semibold font-albertsans  text-[#343436] "htmlFor="patientbautistaappointmentotherservice">Other</label>   
    </div>  
     

     {selectedpatientappointment.patientbautistaappointmentotherservice && (
          <div className="mt-3 ml-5">
              <textarea className="text-[20px] rounded-md p-2 border-2 border-[#2d2d44] w-full text-[#2d2d44]  " ref={textarearef} rows={1} style={{minHeight:'44px'}} type="text" value={selectedpatientappointment.patientbautistaappointmentotherservicenote} onChange={(e) => {setpatientbautistaappointmentotherservicenote(e.target.value); adjusttextareaheight();}} placeholder="Please specify other bautista Optical services.."/>
          </div>
      )}   