    import PatientAppointment from "../models/patientappointment.js";








    //Create Patient Appointment
    export const createpatientappointment = async (req, res) => {
        try{
            const newpatientappointment = new PatientAppointment(req.body);
            const savedpatientappointment = await newpatientappointment.save();
            res.status(201).json(savedpatientappointment);

        }catch(error){
            res.status(400).json({message: error.message});
        }
    };





    //Get All Patient Appointments
    export const getallpatientappointments = async (req, res) => {
        try{
            const patientappointments = await PatientAppointment.find().sort({patientappointmentid: -1});
            res.json(patientappointments);
    
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };



    //Get Single Appointments by Id
    export const getpatientappointmentbyid = async (req, res) => {
        try{
            const patientappointment = await PatientAppointment.findOne({patientappointmentid: req.params.id});
            
            if(!patientappointment) return res.status(404).json({message: "Appointment not found"});
            res.json(patientappointment);
        
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };






    //Get Appointment By Email
    export const getappointmentsbyemail = async (req, res) => {
        try{
            const patientappointmentsbyemail = await PatientAppointment.find({
                patientappointmentemail: req.params.email
            }).sort({patientappointmentid: -1});


            if(!patientappointmentsbyemail || patientappointmentsbyemail === 0){
                return res.status(404).json({message: "No appointments found in this email"});  
            }

            res.json(patientappointmentsbyemail);
        

        }catch(error){
            res.status(500).json({message: error.message});
        }
    };








    //Update Appointment Details

    export const updateappointmentbyid = async (req,res) => {
        try{
            const { id } = req.params;
            const updateData = req.body;

            const appointment = await PatientAppointment.findOne({patientappointmentid: id});
            if(!appointment) {
                return res.status(404).json({message: "Appointment not found"});
            }

            if(updateData.patientambherappointmentstatus) {
                if(!appointment.patientambherappointmentstatushistory) {
                    appointment.patientambherappointmentstatushistory = [];
                }
                appointment.patientambherappointmentstatushistory.push({
                    status: updateData.patientambherappointmentstatus,
                    changedAt: new Date(),
                    changedBy: updateData.patientambherappointmentstatushistory.changedBy
                });

            }


            const updatedAppointment = await PatientAppointment.findOneAndUpdate(
                { patientappointmentid: id},
                updateData,
                { new: true}
            );
            res.status(200).json(updatedAppointment);
        } catch(error){
            console.error("Error updating appointment: ", error);
            res.status(500).json({message: error.message});
        }
    }

  



    //Delete AppointmentId Details
    export const deleteappointmentbyid = async (req,res) => {
        try{
            const deleteappointment = await PatientAppointment.findOneAndDelete({
                patientappointmentid: req.params.id
            });

            if(!deleteappointment) return res.status(404).json({message: "Appointment not found"});
            res.json({message: "Appointment deleted successfully"});

        }catch(error){
            res.status(500).json({message: error.message});
        }
    }


