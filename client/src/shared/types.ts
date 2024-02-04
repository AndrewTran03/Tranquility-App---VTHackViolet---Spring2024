import { ReactElement } from "react";
import { TransitionProps } from "@mui/material/transitions";
// Shared Typescript Types/Interfaces/Other Global-Variables Used Throughout the Project:

// Reference: https://www.totaltypescript.com/concepts/the-prettify-helper
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

const backendUrlBase = "http://localhost:3000";

// Required with All MongoDB Entries:
type MongoDBId = {
  readonly _id: string; // Primary Key (IDentifier)
};

type MongoDBEntry = Prettify<
  MongoDBId & {
    readonly __v: number; // Version Number (Auto-Increments - Avoiding Duplicate Entry-Modification)
    readonly createdDate: string;
    readonly updatedDate: string;
  }
>;

type MongoDBCombined<T> = Prettify<MongoDBEntry & T>;

type MongoDBWithId<T> = Prettify<MongoDBId & T>;

type APIErrorResponse = {
  errorLoc: string;
  errorMsg: string;
};

type JournalWrittenEntriesGroupBase = {
  username: string;
  journalEntries: JournalWrittenSingleEntry[];
};

type JournalWrittenEntriesGroup = MongoDBCombined<JournalWrittenEntriesGroupBase>;

type JournalWrittenSingleEntryBase = {
  journalEntryTitle: string;
  journalEntryText: string;
};

type JournalWrittenSingleEntry = MongoDBWithId<JournalWrittenSingleEntryBase>;

type TransitionPropsType = TransitionProps & {
  children: ReactElement<any, any>;
};

export {
  backendUrlBase,
  APIErrorResponse,
  JournalWrittenSingleEntry,
  JournalWrittenSingleEntryBase,
  JournalWrittenEntriesGroup,
  JournalWrittenEntriesGroupBase,
  TransitionPropsType
};
