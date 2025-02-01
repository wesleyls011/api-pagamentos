import express from 'express';
import lojistaController from '../Controllers/lojistaController';

const router = express.Router();

router.post("/lojistas", async (req, res) => {
    await lojistaController.createLojista(req, res);
});

router.get("/lojistas/:id", async (req, res) => {
    await lojistaController.getLojistaById(req, res);
});

router.put("/lojistas/:id", async (req, res) => {
    await lojistaController.updateLojista(req, res);
});

router.delete("/lojistas/:id", async (req, res) => {
    await lojistaController.deleteLojista(req, res);
});

export default router;