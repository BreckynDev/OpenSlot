import express from "express";
import { 
    getAppointments, 
    getAppointment, 
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getClients,
    deleteClient,

} from "../controllers/appointmentsController";

const router = express.Router();

router.route('/')
    .get(getAppointments)
    .post(createAppointment)

router.route('/clients')
    .get(getClients)

router.route('/clients/:id')
    .delete(deleteClient)
    
router.route('/:id')
    .get(getAppointment)
    .patch(updateAppointment)
    .delete(deleteAppointment)

export default router;