import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// Creates a SQL connection
// .env variables instead of hardcoded string
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

// Initalizes Tables
export async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS clients (                
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) not NULL,
                email VARCHAR(255) not NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        await sql` CREATE TABLE IF NOT EXISTS services (
                id SERIAL PRIMARY KEY,
                service_type VARCHAR(50) NOT NULL UNIQUE
            )`
        await sql `CREATE TABLE IF NOT EXISTS appointments (
                id SERIAL PRIMARY KEY,
                client_id INT REFERENCES clients(id),
                appointment_at TIMESTAMP NOT NULL,
                requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                appointment_status VARCHAR(50) DEFAULT 'pending'
            )`
        await sql`CREATE TABLE IF NOT EXISTS appointment_services (
                appointment_id INT REFERENCES appointments(id) ON DELETE CASCADE,
                service_id INT REFERENCES services(id)
            )`
        await sql`INSERT INTO services (service_type) VALUES ('manicure') ON CONFLICT (service_type) DO NOTHING`
        await sql`INSERT INTO services (service_type) VALUES ('pedicure') ON CONFLICT (service_type) DO NOTHING`
        await sql`INSERT INTO services (service_type) VALUES ('acrylic') ON CONFLICT (service_type) DO NOTHING`
        await sql`INSERT INTO services (service_type) VALUES ('gel') ON CONFLICT (service_type) DO NOTHING`
        await sql`INSERT INTO services (service_type) VALUES ('dip') ON CONFLICT (service_type) DO NOTHING`
        await sql`INSERT INTO services (service_type) VALUES ('nail art') ON CONFLICT (service_type) DO NOTHING`    

    } catch (error) {
        console.error("Failed to initialize database:", error)
        console.log("Shutting Down")
        process.exit(1)
    }
}