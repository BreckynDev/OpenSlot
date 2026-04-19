import { Request, Response } from "express"
import { sql } from "../config/db"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'


export const createAccount = async (req: Request, res: Response) => {
    const { email, password, name} = req.body
    const saltRounds = 10;

    try {
        const hash = await bcrypt.hash(password, saltRounds)
        const [result] = await sql`
            INSERT INTO owners (email, password) 
            VALUES (${email}, ${hash})
            RETURNING id
        `;

        const business = await sql`
            INSERT INTO businesses (owner_id, name)
            VALUES (${result?.id}, ${name})
        `;

        res.status(201).json({ success: true, data: email });

    } catch(error) {
        console.log("Error in createAccount: ", error)
        res.status(500).json({success: false, message: "Internal Server Error" })
    };
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const [ownerRow] = await sql`
            SELECT id, password FROM owners WHERE email = ${email}
        `as { id: number, password: string }[]
        
        if (!ownerRow) {
            return res.status(404).json({ success: false, message: "Account not found" });
        }

        const isMatch = await bcrypt.compare(password, ownerRow.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect Password"})
        }

        const token = jwt.sign(
            { id: ownerRow.id, email: email},
            process.env.JWT_SECRET!,
            { expiresIn: "1h"}
        );

        return res.status(200).json({ success: true, message: "Login successful", token: token})

    } catch (error) {
        console.log("Error in getAccount: ", error)
        res.status(500).json({success: false, message: "Internal Server Error" })
    }
};