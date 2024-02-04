import { FormEvent, useContext, useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import { APIErrorResponse, JournalWrittenEntriesGroup, backendUrlBase } from "../shared/types";
import { parsePreviousJournalEntries } from "../FrontendParser";
import UsernameContext from "../shared/UsernameContext";
import { APIRequestError } from "../shared/APIRequestError";

const PrevJournal: React.FC = () => {
  const { username } = useContext(UsernameContext);
  const [prevJournalEntriesArr, setPrevJournalEntriesArr] = useState<JournalWrittenEntriesGroup[]>([]);

  async function fetchPreviousJournalEntries() {
    await axios
      .get(`${backendUrlBase}/api/journal_entry/${username}`)
      .then((res) => {
        console.log("BEFORE PARSE: ");
        console.log(res.data);
        console.log("Got here 3");
        const parsedResult = parsePreviousJournalEntries(res.data);
        console.log("Got here");
        console.log(parsedResult);
        setPrevJournalEntriesArr(parsedResult);
      })
      .catch((err: AxiosError) => {
        const errorConfig = err.response?.data as APIErrorResponse;
        const error = new APIRequestError("Failed to GET any journal entries", errorConfig);
        console.error(error.toString());
      });
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     await fetchPreviousJournalEntries();
  //   }
  //   fetchData();
  // }, []);

  async function handleAPIButtonClick(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Pressed API Button!");
    await fetchPreviousJournalEntries();
  }

  async function handleDeleteJournalEntry(mongoGroupId: string, mongoEntryId: string) {
    await axios
      .delete(`${backendUrlBase}/api/journal_entry/${mongoGroupId}/${mongoEntryId}`)
      .then((res) => console.log(res))
      .catch((err: AxiosError) => {
        const errorConfig = err.response?.data as APIErrorResponse;
        const error = new APIRequestError("Failed to DELETE the journal entry", errorConfig);
        console.error(error.toString());
      });
  }

  return (
    <>
      <button type="submit" onClick={handleAPIButtonClick}>
        Get Previous Journal Entry Data
      </button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  borderRight: "1px solid lightgray",
                  paddingRight: "8px"
                }}
              >
                Username
              </TableCell>
              <TableCell
                style={{
                  borderRight: "1px solid lightgray",
                  paddingRight: "8px"
                }}
              >
                Journal #
              </TableCell>
              <TableCell>Previous Journal Entry Title</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prevJournalEntriesArr &&
              prevJournalEntriesArr.map((prevJournalEntryGroup) => (
                <TableRow key={prevJournalEntryGroup._id}>
                  <TableCell>
                    <Typography>{prevJournalEntryGroup.username}</Typography>
                  </TableCell>
                  {prevJournalEntryGroup.journalEntries &&
                    prevJournalEntryGroup.journalEntries.map((journalEntry, idx) => (
                      <TableRow key={journalEntry._id}>
                        <TableCell>
                          <Typography>{idx + 1}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{journalEntry.journalEntryTitle}</Typography>
                        </TableCell>
                        <TableCell>
                          <Delete
                            onClick={() => handleDeleteJournalEntry(prevJournalEntryGroup._id, journalEntry._id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default PrevJournal;
