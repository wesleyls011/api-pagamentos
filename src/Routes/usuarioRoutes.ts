import express from 'express';
import userController from '../Controllers/userController';

const router = express.Router();

router.post("/usuarios", async (req, res) => {
    await userController.createUser(req, res);
});

router.get("/usuarios/:id", async (req, res) => {
    await userController.getUserById(req, res);
});

router.put("/usuarios/:id", async (req, res) => {
    await userController.updateUser(req, res);
});

router.delete("/usuarios/:id", async (req, res) => {
    await userController.deleteUser(req, res);
});

export default router;
