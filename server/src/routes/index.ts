import express from "express";
import { exampleRouter } from "./example";

const router = express.Router();

router.use(exampleRouter); // Example route
// Add more local routes here...

export default router;
