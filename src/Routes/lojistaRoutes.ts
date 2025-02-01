import express from 'express';
import lojistaController from '../Controllers/lojistaController';

const router = express.Router();

router.post("/create", async (req, res) => {
    await lojistaController.createLojista(req, res);
});

router.get("/:id", async (req, res) => {
    await lojistaController.getLojistaById(req, res);
});

router.put("/:id", async (req, res) => {
    await lojistaController.updateLojista(req, res);
});

router.delete("/:id", async (req, res) => {
    await lojistaController.deleteLojista(req, res);
});

export default router;