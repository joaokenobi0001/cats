const express = require("express");
const gatosApi = require("../api/gatos");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/", gatosApi.listarGatos);
//router.get("/:id", authMiddleware(['admin']), gatosApi.obterGato);
router.post("/", authMiddleware(['admin']), gatosApi.criarGatos);
router.put("/:id", authMiddleware(['admin']), gatosApi.alterarGatos);
router.delete("/:id", authMiddleware(['admin']), gatosApi.deletarGatos);

module.exports = router;
