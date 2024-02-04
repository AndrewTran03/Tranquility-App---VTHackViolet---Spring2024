import { JournalWrittenEntriesGroup, JournalWrittenSingleEntry } from "./shared/types";

function parsePreviousJournalEntries(entryDataArr: any[]) {
  const journalGroupEntries: JournalWrittenEntriesGroup[] = [];

  entryDataArr.forEach((journalGroupEntry: any) => {
    const _id = journalGroupEntry._id;
    const __v = journalGroupEntry._v;
    const createdDate = journalGroupEntry.created_date;
    const updatedDate = journalGroupEntry.updated_date;
    const username = journalGroupEntry.username;
    const journalEntries = journalGroupEntry.journalEntries as JournalWrittenSingleEntry[];
    journalEntries.forEach((journalEntry: JournalWrittenSingleEntry) => {
      const _id = journalEntry._id;
      const journalEntryTitle = journalEntry.journalEntryTitle;
      const journalEntryText = journalEntry.journalEntryText;

      const newJournalEntry: JournalWrittenSingleEntry = {
        _id: _id,
        journalEntryTitle: journalEntryTitle,
        journalEntryText: journalEntryText
      };
      journalEntries.push(newJournalEntry);
    });

    const newJournalEntryGroupEntry: JournalWrittenEntriesGroup = {
      _id: _id,
      __v: __v,
      createdDate: createdDate,
      updatedDate: updatedDate,
      username: username,
      journalEntries: journalEntries
    };
    journalGroupEntries.push(newJournalEntryGroupEntry);
  });

  return journalGroupEntries;
}

export { parsePreviousJournalEntries };
