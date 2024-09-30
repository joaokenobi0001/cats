const express = require("express");
const CharacterApi = require("../api/character");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/", CharacterApi.findAllCharacters);
router.get("/:id", authMiddleware, CharacterApi.findOneCharacter);
router.post("/", authMiddleware, CharacterApi.createCharacter);
router.put("/:id", authMiddleware, CharacterApi.updateCharacter);
router.delete("/:id", authMiddleware, CharacterApi.deleteCharacter);

module.exports = router;
