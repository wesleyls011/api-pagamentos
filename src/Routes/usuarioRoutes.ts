import express from 'express';
import userController from '../Controllers/userController';

const router = express.Router();

router.post("/create", async (req, res) => {
    await userController.createUser(req, res);
});

router.get("/:id", async (req, res) => {
    await userController.getUserById(req, res);
});

export default router;