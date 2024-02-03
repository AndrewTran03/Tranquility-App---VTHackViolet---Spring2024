import express from "express";

const router = express.Router();

router.get("/api/example", (_, res) => {
  return res.status(200).send({ data: "Example GET request at /api/example\n" });
});

router.post("/api/example", (req, res) => {
  return res.status(201).send({ data: "NEW example created!\n" });
});

export { router as exampleRouter };
