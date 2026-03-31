import { Request, Response } from "express"
import { sql } from "../config/db"

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await sql`
            SELECT * FROM appointments
            ORDER BY requested_at DESC
            `;
            
            console.log("Fetched Appointments: ", appointments)
            res.status(200).json({success:true, data: appointments})

    } catch (error) {
        console.error("Error in getAppointments: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
};

export const getAppointment = async (req: Request, res: Response) => {
    const { id }=req.params

    try {
        const appointment = await sql`
        SELECT * FROM appointments WHERE id=${id}
        `

        res.status(200).json({ success: true, data: appointment[0]})

    } catch (error) {
        console.log("Error in updateAppointment: ", error)
        res.status(500).json({success: false, message: "Internal Server Error" })
    }
};

export const createAppointment = async (req: Request, res: Response) => {
    const { name, email, appointment_at } = req.body;

    if (!name || !email || !appointment_at) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {

        // Check if the client already exists by searching email
        let [client] = await sql`
            SELECT id FROM clients WHERE email=${email}
        `

        if (!client) {
             // Creat Client and get ID
            [client] = await sql`
                INSERT INTO clients (name, email) 
                VALUES (${name}, ${email}) 
                RETURNING id
            `
            console.log("New client created with ID:", client?.id)

        } 
        else {
            console.log("Existing client found with ID:", client.id);
        }

        // Create Appointment using Client's ID
        const [appointment] = await sql`
            INSERT INTO appointments (client_id, appointment_at)
            VALUES (${client?.id}, ${appointment_at})
            RETURNING id
        `
        res.status(201).json({ success: true, data: appointment });

    } catch (error) {
        console.log("Error in createAppointments: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
};

export const updateAppointment = async (req: Request, res: Response) => {
    const { id }=req.params
    const { name, email, appointment_at } = req.body;

    try {
        // Find the client_id associated with this appointment
        const [appointment] = await sql`
            SELECT client_id FROM appointments WHERE id = ${id}
        `
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // Update the Client data

        await sql`
            UPDATE clients
            SET name=${name}, email=${email}
            WHERE id=${appointment.client_id}
        `
        // Update the Appointment data
        const [updatedAppointment] = await sql`
            UPDATE appointments
            SET appointment_at = ${appointment_at}
            WHERE id = ${id}
            RETURNING *
        `

        if(updateAppointment.length === 0) {
            return res.status(404).json({success: false, message: "Appointment not Found" })
        }

            res.status(200).json({ success: true, data: updatedAppointment });

    } catch (error) {
        console.error("Error in updateAppointment: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteAppointment = async (req: Request, res: Response) => {
    const { id }=req.params

    try {
        const deletedAppointment = await sql`
        DELETE FROM appointments WHERE id=${id} RETURNING *
        `
        if(deletedAppointment.length === 0) {
            return res.status(404).json({success: false, message: "Appointment not Found" })
        }

        res.status(200).json({ success: true, data: deletedAppointment[0] })
    } catch (error) {
        console.log("Error in deleteAppointment: ", error)
        res.status(500).json({success: false, message: "Internal Server Error" })
    }
};