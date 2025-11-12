import express from 'express';
import{resgister,login} from '../controllers/auth.js';
import {resgisterValidator,loginValidator} from '../schemas/auth.js';
import { validationResult } from 'express-validator';   

const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/register', resgisterValidator, validate, resgister);
router.post('/login', loginValidator, validate, login);

export default router;