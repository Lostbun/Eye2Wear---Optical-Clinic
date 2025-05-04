

  //Debounce Email Check
  useEffect(() =>{
    const demoformdebounceemailcheck = async () => {

      if(!demoformdata.patientemail) {
        setdemopatientemailerror(false);
        setdemopatientemailexist(false);
        setemailisnotpatient(false);
        setemailisnotpatienterror(false);
        return;
      }



      if(!demopatientemailcharacters.test(demoformdata.patientemail)){
        setdemopatientemailerror(false);
        setdemopatientemailexist(false);
        setemailisnotpatient(false);
        setemailisnotpatienterror(false); 
        return;
      }


      setdemopatientcheckemail(true);





      try{
        const [patientresponse, staffresponse, ownerresponse, adminresponse] = await Promise.all([
          fetch(`http://localhost:3000/api/patientaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/staffaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/owneraccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/adminaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
        ]);


        const [patientdata, staffdata, ownerdata, admindata] = await Promise.all([
          patientresponse.json(),
          staffresponse.json(),
          ownerresponse.json(),
          adminresponse.json()
        ]);

        const accountexists = patientdata.exists || staffdata.exists || ownerdata.exists || admindata.exists;

        if(accountexists){
            const demoresponse = await fetch(
              `http://localhost:3000/api/patientdemographics/patientemail/${encodeURIComponent(demoformdata.patientemail)}`
            );

            const demodata = await demoresponse.json();

            if(demodata.exists) {
              setdemopatientemailerror(true);
              setdemopatientemailexist(true);
              setemailisnotpatient(false);
              setemailisnotpatienterror(false); 
            }else{
              
              const isnonpatient = staffdata.exists || ownerdata.exists || admindata.exits;
              setdemopatientemailerror(false);
              setdemopatientemailexist(false);
              setemailisnotpatient(isnonpatient);
              setemailisnotpatienterror(isnonpatient);
            }
        }else{
          setdemopatientemailerror(false);
          setdemopatientemailexist(false);
          setemailisnotpatient(false);
          setemailisnotpatienterror(false); 

        }


      }catch(error){
        console.error("Failed Email Validation: ", error);
        setdemopatientemailerror(false);
        setdemopatientemailexist(false);
        setemailisnotpatient(false);
        setemailisnotpatienterror(false); 
      
      }finally{
        setdemopatientcheckemail(false);
      }

    };

    const timer = setTimeout(demoformdebounceemailcheck, 500);
    return () => clearTimeout(timer);
  }, [demoformdata.patientemail]);
 


  //INSERT PATIENT PROFILE  //INSERT PATIENT PROFILE  //INSERT PATIENT PROFILE  //INSERT PATIENT PROFILE  //INSERT PATIENT PROFILE  //INSERT PATIENT PROFILE
  const addpatientprofile = async (e) => {
    e.preventDefault();
    setaddpatientprofileissubmitting(true);
    setaddpatientprofilemessage({text: "", type: ""});

    try{
      if(demopatientemailerror || demopatientemailexist || emailisnotpatienterror) {
        throw new Error("Fix email validation before submitting");
      }


      const demoformdatatosend = {
        ...demoformdata,
        patientprofilepicture: addpatientprofilepreviewimage || demoformdata.patientprofilepicture
      };

      const response = await fetch("http://localhost:3000/api/patientdemographics", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${currentusertoken}`
        },
        body: JSON.stringify(demoformdatatosend)
      });


      if(!response.ok) {
            const errordata = await response.json();
            throw new Error(errordata.message || "Failed to create patient profile");
      }

      const fetchresponse = await fetch('/api/patientdemographics', {
        headers: {
          'Authorization' : `Bearer ${currentusertoken}`
        }
      });

      const updateddata = await fetchresponse.json();
      setpatientdemographics(updateddata);

      resetpatientprofileformdata();
      setaddpatientprofilemessage({
        text: "Patient Profile successfully created",
        type: "success"
      });

    }catch (error) {
      console.error("Error creating patient profile: ", error);
      setaddpatientprofilemessage({
        text: error.message || "Failed to create patient profile",
        type: "success"
      });
    }finally{
      setaddpatientprofileissubmitting(false);
    }
  }





































  
  <div className="form-group flex mb-3">
  <label className="text-[23px] font-bold text-[#2d2d44]"  htmlFor="patientemail">Patient Email :</label>
  <div className="flex flex-col">
  <input className="bg-gray-200 text-[20px] text-gray-600 pl-3 rounded-2xl ml-3 h-10 w-114" onChange={(e) => setdemoformdata({...demoformdata, patientemail: e.target.value.trim()})} value={demoformdata.patientemail} id="patientemail" name="patientemail" required type="email" placeholder="Patient Email"/>
  <div>
         {demopatientcheckemail && (
          <p className="text-gray-500 text-sm">Checking Email...</p>
         )}

         {!demopatientcheckemail && (
          <>
          
          {demopatientemailerror && !demopatientemailexist && (
               <p className="text-red-500 text-sm">
                 Please enter a valid email address
               </p>
             )}


          {demopatientemailexist && (
               <p className="text-red-500 text-sm">
                  A patient profile already exists with this email
               </p>
              )}


          {emailisnotpatienterror && (
                <p className="text-red-500 text-sm">
                   This email belongs to a staff/admin account and cannot be used for patient profiles
                </p>
               )}
          </>
         )}

  </div>
  </div>

  </div>


















































  export const createpatientdemographic = async (req,res) => {
    try{


      const requiredfields = [
        'patientemail','patientlastname','patientfirstname','patientmiddlename',
        'patientage','patientbirthdate','patientgender','patientcontactnumber','patienthomeaddress',
        'patientemergencycontactname','patientemergencycontactnumber'
      ];


      for(const field of requiredfields) {
        if(!req.body[field]){
          return res.stats(400).json({message: `${field} is required`});
        }
      }


      const existing = await Patientdemographic.findOne({
        patientemail: req.body.patientemail
      });

      if(existing) {
        return res.status(400).json({
          message: "This email has already existing patient demographic profile"
        });
      }


      const newdemographic = await Patientdemographic.creaet(req.body);
      res.status(201).json(newdemographic);


  }catch(error){
    res.status(500).json({
      message: error.message.includes("validation")
      ? "Invalid Format"
      : "Server Error",
      details: error.message
    });
  }
}