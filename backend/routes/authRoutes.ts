import express from "express";
import { 
    login,
    createAccount,

} from "../controllers/authController";

const router = express.Router();

router.route('/login')
    .post(login)

router.route('/register')
    .post(createAccount)

export default router;