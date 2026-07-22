import { Request, Response } from "express"
import { sql } from "../config/db"
import { transporter } from "../config/mailer"

const business_name = "Tran Nails LLC" //Temp

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await sql`
            SELECT
                a.id,
                a.appointment_at,
                a.appointment_status AS status,
                c.name AS client,
                c.email,
                s.service_type AS service
            FROM appointments a
            JOIN clients c ON c.id = a.client_id
            LEFT JOIN appointment_services aps ON aps.appointment_id = a.id
            LEFT JOIN services s ON s.id = aps.service_id
            ORDER BY a.requested_at DESC
        `;
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        console.error("Error in getAppointments: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
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
        let [appointment] = await sql`
            SELECT appointment_at FROM appointments WHERE appointment_at=${appointment_at}
        `
        if (!appointment) {
            [appointment] = await sql`
                INSERT INTO appointments (client_id, appointment_at)
                VALUES (${client?.id}, ${appointment_at})
                RETURNING id
            `
            const info = await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: `Booked at ${new Date(appointment_at).toLocaleDateString()}`,
                text: "Thank you for booking. Your appointment is at: " + appointment_at,
                html: `<p>Thank you <strong>${name}</strong> for booking. Your appointment is at: <strong>${new Date(appointment_at).toLocaleDateString()}</strong></p>`,
                });
            console.log("Message sent: %s", info.messageId);

            if (info.rejected.length > 0) {
                console.warn("Some recipients were rejected:", info.rejected);
            }

            res.status(201).json({ success: true, data: appointment });
        }

        else {
            return res.status(409).json({ success: false, message: "Appointment_at taken" });
        }

    } catch (error) {
        console.log("Error in createAppointments: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
};

export const updateAppointment = async (req: Request, res: Response) => {
    const { id }=req.params
    const { name, email, appointment_at, appointment_status} = req.body;

    try {
        // Find the client_id associated with this appointment
        const [appointment] = await sql`
            SELECT client_id FROM appointments WHERE id = ${id}
        `
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // Update the Client data
        const updatedAppointment = await sql.transaction([
            sql`
            UPDATE clients
            SET name=${name}, email=${email}
            WHERE id=${appointment.client_id}`,
            
            sql`
            UPDATE appointments
            SET appointment_at = ${appointment_at}, appointment_status = ${appointment_status}
            WHERE id = ${id}
            RETURNING *`,
        ])
        res.status(200).json({ success: true, data: updatedAppointment });

    } catch (error) {
        await sql`
            ROLLBACK
        `
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

export const getClients = async (req: Request, res: Response) => {
    try {
        const clients = await sql`
            SELECT c.*, COUNT(a.id) AS visits
            FROM clients c
            LEFT JOIN appointments a ON a.client_id = c.id
            GROUP BY c.id
            ORDER BY c.name
        `;
        res.status(200).json({ success: true, data: clients });
    } catch (error) {
        console.error("Error in getClients: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    const { id }=req.params

    try {
        const deletedClient = await sql`
        DELETE FROM clients WHERE id=${id} RETURNING *
        `
        if(deletedClient.length === 0) {
            return res.status(404).json({success: false, message: "Client not Found" })
        }
        res.status(200).json({ success: true, data: deletedClient[0] })

    } catch (error) {
        console.log("Error in deleteClinet: ", error)
        res.status(500).json({success: false, message: "Internal Server Error" })
    }
};