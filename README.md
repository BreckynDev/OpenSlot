# OpenSlot
A full-stack appointment booking application engineered to bridge the gap between small business owners and their clients. It streamlines the booking lifecycle from registration and availability management to automated client confirmations.
Built as a portfolio project to demonstrate end-to-end TypeScript development using a PERN architecture.

## Key Features
- **Business Dashboard:** Comprehensive tools for owners to manage schedules and track client history.
- **Client Portal:** A seamless React-based interface for booking, viewing, and canceling appointments.
- **Automated Notifications:** Integrated email service to ensure clients stay informed and reduce no-shows.
- **Type-Safe Architecture:** Built with a shared-schema approach using TypeScript across the entire PERN stack.

## Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL via Neon
- **Communication:** Nodemailer + Gmail SMTP
- **Security:**	bcrypt (password hashing)

## Database Schema
| Table | Responsibility | Relationships |
| --- | --- | --- |
| owners | Owners accounts | one → many businesses |
| businesses | Identity | one → many clients, services, appointments |
| clients | Booking customers | many clients → one business |
| services | Offered services | many services → one business |
| appointments | Booking records | many appointments → one client |
| appointment_services | Service junction | many appointments ↔ many services |

- **Scalable Multi-tenancy:** Data is scoped by business_id to ensure that business owners can only access their specific client and appointment records.
- **Normalized Many-to-Many:** The appointment_services junction table allows for flexible bookings where a single appointment can include multiple line-item services

## Setup

### Prerequisites
- Node.js v18+
- A Neon project with a PostgreSQL database
- A Gmail account with an app password for SMTP

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file using `.env.example` as a reference
4. Run `npm run dev`
