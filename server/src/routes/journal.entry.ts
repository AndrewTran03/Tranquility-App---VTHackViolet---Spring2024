import express from "express";
import { APIErrorResponse, JournalWrittenEntriesGroup } from "../../assets/types";
import { JournalEntryUserModel, journalEntriesCollectionName } from "../models/journal.entry.model";
import log from "../utils/logger";

const router = express.Router();

router.get("/api/journal_entry", async (_, res) => {
  try {
    const currItems = await JournalEntryUserModel.find<JournalWrittenEntriesGroup>();
    return res.status(200).send(JSON.stringify(currItems));
  } catch (err) {
    log.error("Did not find any Journal Entries for any course! Please try again!");
    const resErrBody: APIErrorResponse = {
      errorLoc: "GET",
      errorMsg: "No items found in MongoDB database"
    };
    return res.status(400).send(JSON.stringify(resErrBody));
  }
});

router.get("/api/journal_entry/:username", async (req, res) => {
  const selectedUsername = req.params.username;

  try {
    const currItems = await JournalEntryUserModel.find<JournalWrittenEntriesGroup>({ username: selectedUsername });
    return res.status(200).send(JSON.stringify(currItems));
  } catch (err) {
    log.error("Did not find any Journal Entries (for that particular username) for any course! Please try again!");
    const resErrBody: APIErrorResponse = {
      errorLoc: "GET",
      errorMsg: "No items found in MongoDB database"
    };
    return res.status(400).send(JSON.stringify(resErrBody));
  }
});

router.post("/api/journal_entry", async (req, res) => {
  const { username, journalEntryTitle, journalEntryText } = req.body;
  try {
    const existResult = await JournalEntryUserModel.findOne({ username: username });
    if (existResult) {
      log.warn("An entry with the same username already exists...attempting to update the array");
      existResult.journalEntries.push({ journalEntryTitle, journalEntryText });
      const updateExistingResult = await existResult.save();
    } else {
      const journalEntryToInsert = new JournalEntryUserModel({
        username: username,
        journalEntries: [{ journalEntryTitle: journalEntryTitle, journalEntryText: journalEntryText }]
      });
      const insertResult = await journalEntryToInsert.save();
    }
    log.info("Inserted (or updated an existing entry for) the specified journal entry successfully! Congratulations!");
  } catch (err) {
    log.error("Could not insert the specified journal entry! Please try again!");
    const resErrBody: APIErrorResponse = {
      errorLoc: "POST",
      errorMsg: "Failed to insert into the MongoDB database"
    };
    return res.status(400).send(JSON.stringify(resErrBody));
  }
});

router.delete("/api/journal_entry/:_id", async (req, res) => {
  const journalEntryToDeleteId = req.params._id;

  try {
    const deleteResult =
      await JournalEntryUserModel.findByIdAndDelete<JournalWrittenEntriesGroup>(journalEntryToDeleteId);
    log.info("Deleted the specified journal entry successfully! Congratulations!");
    return res.status(200).json(deleteResult);
  } catch (err) {
    log.error("Could not delete the specified journal entry! Please try again!");
    const resErrBody: APIErrorResponse = {
      errorLoc: "DELETE",
      errorMsg: "Failed to delete from the MongoDB database"
    };
    return res.status(400).send(JSON.stringify(resErrBody));
  }
});

export { router as journalEntryRouter };
