import mongoose from "mongoose";
import config from "config";
import { JournalWrittenSingleEntry, JournalWrittenEntriesGroup } from "../../assets/types";

const mongoDBName = config.get<string>("mongoDBName");
const journalEntriesCollectionName = config.get<string>("journalEntriesCollectionName");

// Reference: https://mongoosejs.com/docs/api/schemastring.html
// Allow empty strings to pass "required" check (needed for initial empty string of "canvasMatchedLearningObjective" property)
mongoose.Schema.Types.String.checkRequired((v) => v !== null && v !== undefined);

const JournalSingleWrittenEntrySchema = new mongoose.Schema<JournalWrittenSingleEntry>({
  journalEntryTitle: {
    type: String,
    required: true
  },
  journalEntryText: {
    type: String,
    required: true
  }
});

const JournalEntryUserSchema = new mongoose.Schema<JournalWrittenEntriesGroup>(
  {
    username: {
      type: String,
      required: true
    },
    journalEntries: {
      type: [JournalSingleWrittenEntrySchema],
      required: true,
      default: []
    }
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date"
    },
    collection: journalEntriesCollectionName
  }
);

const JournalEntryUserModel = mongoose.model<JournalWrittenEntriesGroup>(
  `${mongoDBName}_JournalEntries`,
  JournalEntryUserSchema
);

export { JournalEntryUserModel, journalEntriesCollectionName };
