import express from "express";
import { exampleRouter } from "./example";
import { journalEntryRouter } from "./journal.entry";

const router = express.Router();

router.use(exampleRouter); // Example route
// Add more local routes here...
router.use(journalEntryRouter);

export default router;
