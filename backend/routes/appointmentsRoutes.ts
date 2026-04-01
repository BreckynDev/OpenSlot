import express from "express";
import { 
    getAppointments, 
    getAppointment, 
    createAppointment,
    updateAppointment,
    deleteAppointment
} from "../controllers/appointmentsController";

const router = express.Router();

router.route('/')
    .get(getAppointments)
    .post(createAppointment)

router.route('/:id')
    .get(getAppointment)
    .patch(updateAppointment)
    .delete(deleteAppointment)

export default router;