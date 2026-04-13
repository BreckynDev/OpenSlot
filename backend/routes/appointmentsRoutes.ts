import express from "express";
import { 
    getAppointments, 
    getAppointment, 
    createAppointment,
    updateAppointment,
    deleteAppointment,
    deleteClient,
    createAccount,

} from "../controllers/appointmentsController";

const router = express.Router();

router.route('/')
    .get(getAppointments)
    .post(createAppointment)

router.route('/:id')
    .get(getAppointment)
    .patch(updateAppointment)
    .delete(deleteAppointment)

router.route('/clients/:id')
    .delete(deleteClient)

router.route('auth/register')
    .post(createAccount)

export default router;