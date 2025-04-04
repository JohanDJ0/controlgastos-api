import { Router } from "express";
import {getEmployees, createEmployee} from '../controllers/employees.controller.js'
const router = Router()


router.get('/employees',getEmployees)

router.post('/employees', createEmployee)



export default router