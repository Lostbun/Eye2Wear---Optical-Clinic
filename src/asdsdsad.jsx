    {(() => {
      // Filter and sort completed appointments
      const completedAppointments = patientappointments
        .filter(appointment => 
          appointment.patientappointmentemail === selectedpatientmedicalrecord.patientemail && 
          ((appointment.patientambherappointmentstatus === 'Completed') || 
           (appointment.patientbautistaappointmentstatus === 'Completed'))
        )
        .sort((a, b) => {
          const dateA = new Date(a.patientambherappointmentdate || a.patientbautistaappointmentdate);
          const dateB = new Date(b.patientambherappointmentdate || b.patientbautistaappointmentdate);
          return dateB - dateA;
        });



      // Render each appointment
      return completedAppointments.map((appointment, index) => (
        <div key={index} className="pl-3 w-full h-[80px] shadow-sm bg-white rounded-2xl flex justify-between items-center mt-3">
          {/* Subject */}
          <div className="px-2 flex justify-center items-center rounded-2xl h-full w-[220px]">
            <h1 className="font-albertsans truncate w-full font-semibold text-[18px]">
              {appointment.patientambherappointmentstatus === 'Completed' 
                ? appointment.patientambherappointmentconsultationremarkssubject
                : appointment.patientbautistaappointmentconsultationremarkssubject}
            </h1>
          </div>

          {/* Date and Time */}
          <div className="px-2 flex flex-col justify-center items-center rounded-2xl h-full w-[220px]">
            <h1 className="font-medium truncate w-full">
              {formatappointmatedates(
                appointment.patientambherappointmentstatus === 'Completed'
                  ? appointment.patientambherappointmentdate
                  : appointment.patientbautistaappointmentdate
              )}
            </h1>
            <h1 className="font-sm truncate w-full text-[14px]">
              {formatappointmenttime(
                appointment.patientambherappointmentstatus === 'Completed'
                  ? appointment.patientambherappointmenttime
                  : appointment.patientbautistaappointmenttime
              )}
            </h1>
          </div>

          {/* Eye Specialist */}
          <div className="px-2 flex justify-center items-center rounded-2xl h-full w-[220px]">
            <h1 className="font-medium truncate w-full">
              {appointment.patientambherappointmentstatus === 'Completed'
                ? appointment.patientambherappointmenteyespecialist
                : appointment.patientbautistaappointmenteyespecialist}
            </h1>
          </div>

          {/* View Button */}
          <div className="rounded-2xl h-full w-auto mr-4 flex justify-center items-center">
            <div 
              onClick={() => {
                setselectedpatientappointment(appointment);

              }}
              className="bg-[#383838] hover:bg-[#595959] transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"
            >
              <h1 className="text-white">View</h1>
            </div>
          </div>
        </div>
      ));
    })()}







     {(()=>{

  const completedappointments = patientappointments
  .filter(appointment =>
    appointment.patientappointmentemail === selectedpatientmedicalrecord.patientemail && 
    ((appointment.patientambherappointmentstatus === 'Completed') ||
    (appointment.patientbautistaappointmentstatus === 'Completed'))
  )
  .sort((a,b) => {
    const datea = new Date(a.patientambherappointmentdate || a.patientbautistaappointmentdate);
    const dateb = new Date(b.patientambherappointmentdate || b.patientbautistaappointmentdate);
    return dateb - datea;
  })



  return completedappointments.map((appointment,index) => (
    <div key={index} className="pl-3 w-full h-[80px] shadow-sm bg-white rounded-2xl flex justify-between items-center">
      <div className="px-2 flex justify-center items-center rounded-2xl h-full w-[220px]">
          <h1 className="font-albertsans truncate w-full font-semibold text-[18px]">{appointment.patientambherappointmentstatus === 'Completed'
                    ? appointment.patientambherappointmentconsultationremarkssubject
                    : appointment.patientbautistaappointmentconsultationremarkssubject}</h1>
      </div>


      <div className=" px-2 flex flex-col justify-center items-center rounded-2xl h-full w-[220px]">
        <h1 className="font-medium truncate w-full">{formatappointmatedates(
                  appointment.patientambherappointmentstatus === 'Completed'
                  ? appointment.patientambherappointmentdate
                  : appointment.patientbautistaappointmentdate
        )}</h1> 
        <h1 className="font-medium truncate w-full">{formatappointmenttime(
                  appointment.patientambherappointmentstatus === 'Completed'
                  ? appointment.patientambherappointmenttime
                  : appointment.patientbautistaappointmenttime
        )}</h1> 
      </div>

      <div className=" px-2 flex justify-center items-center rounded-2xl h-full w-[220px] ">
        <h1 className="font-medium truncate w-full">{appointment.patientambherappointmentstatus === 'Completed'
                    ? appointment.patientambherappointmenteyespecialist
                    : appointment.patientbautistaappointmenteyespecialist}</h1>
      </div>

      <div className="rounded-2xl h-full w-auto mr-4 flex justify-center items-center "><div onClick={setselectedpatientappointment(appointment)} className="bg-[#383838]  hover:bg-[#595959]   transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><h1 className="text-white ">View</h1></div></div>
    </div>
  ))

 })}