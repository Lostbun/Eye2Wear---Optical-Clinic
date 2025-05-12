const { useEffect } = require("react");







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
        const demoresponse = await fetch(`http://localhost:3000/api/patientdemographics/patientemail/${encodeURIComponent(demoformdata.patientemail)}`);

        const demodata = await demoresponse.json();

        if(demodata && !demodata.message){
          setdemopatientemailerror(true);
          setdemopatientemailexist(true);
          setemailisnotpatient(false);
          setemailisnotpatienterror(false);
          setdemopatientcheckemail(false);
          return;
        }

        const [patientresponse, staffresponse, ownerresponse, adminresponse] = await Promise.all([
          fetch(`http://localhost:3000/api/patientaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/staffaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/owneraccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/adminaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`)
        ]);


        const [patientdata, staffdata, ownerdata, admindata] = await Promise.all([
            patientresponse.json(),
            staffresponse.json(),
            ownerresponse.json(),
            adminresponse.json()
        ]);


        const accountexists = patientdata.exists || staffdata.exists || ownerdata.exists || admindata.exists;

        if(accountexists){
            const isnonpatient = staffdata.exists || ownerdata.exists || admindata.exists;
            setdemopatientemailerror(false);
            setdemopatientemailexist(false);
            setemailisnotpatient(isnonpatient);
            setemailisnotpatienterror(isnonpatient);
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
        setdemopatientemailerror(true);
        setdemopatientemailexist(false);
        setemailisnotpatient(false);
        setemailisnotpatienterror(false); 
        return;
      }

      setdemopatientcheckemail(true);

      try {
        // First check if email exists in patientdemographics
        const demoresponse = await fetch(
          `http://localhost:3000/api/patientdemographics/patientemail/${encodeURIComponent(demoformdata.patientemail)}`
        );

        const demodata = await demoresponse.json();

        if(demodata && !demodata.message) {
          setdemopatientemailerror(true);
          setdemopatientemailexist(true);
          setemailisnotpatient(false);
          setemailisnotpatienterror(false);
          setdemopatientcheckemail(false);
          return;
        }

        // Check other collections
        const [patientresponse, staffresponse, ownerresponse, adminresponse] = await Promise.all([
          fetch(`http://localhost:3000/api/patientaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/staffaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/owneraccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`),
          fetch(`http://localhost:3000/api/adminaccounts/check-email/${encodeURIComponent(demoformdata.patientemail)}`)
        ]);

        const [patientdata, staffdata, ownerdata, admindata] = await Promise.all([
          patientresponse.json(),
          staffresponse.json(),
          ownerresponse.json(),
          adminresponse.json()
        ]);

        const accountexists = patientdata.exists || staffdata.exists || ownerdata.exists || admindata.exists;

        if(accountexists) {
          const isnonpatient = staffdata.exists || ownerdata.exists || admindata.exists;
          setdemopatientemailerror(false);
          setdemopatientemailexist(false);
          setemailisnotpatient(isnonpatient);
          setemailisnotpatienterror(isnonpatient);
        } else {
          setdemopatientemailerror(false);
          setdemopatientemailexist(false);
          setemailisnotpatient(false);
          setemailisnotpatienterror(false);
        }
      } catch(error) {
        console.error("Failed Email Validation: ", error);
        setdemopatientemailerror(false);
        setdemopatientemailexist(false);
        setemailisnotpatient(false);
        setemailisnotpatienterror(false);
      } finally {
        setdemopatientcheckemail(false);
      }
    };

    const timer = setTimeout(demoformdebounceemailcheck, 500);
    return () => clearTimeout(timer);
  }, [demoformdata.patientemail]);
