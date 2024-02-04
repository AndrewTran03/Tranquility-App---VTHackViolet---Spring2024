import { FormEvent, useContext, useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { JournalWrittenEntriesGroup, backendUrlBase } from "../shared/types";
import { parsePreviousJournalEntries } from "../FrontendParser";
import UsernameContext from "../shared/UsernameContext";

const PrevJournal: React.FC = () => {
  const { username } = useContext(UsernameContext);
  const [prevJournalEntriesArr, setPrevJournalEntriesArr] = useState<JournalWrittenEntriesGroup[]>([]);

  async function fetchPreviousJournalEntries() {
    await axios.get(`${backendUrlBase}/api/journal_entry/${username}`).then((res) => {
      const parsedResult = parsePreviousJournalEntries(res.data);
      setPrevJournalEntriesArr(parsedResult);
    });
  }

  useEffect(() => {
    async function fetchData() {
      await fetchPreviousJournalEntries();
    }
    fetchData();
  }, []);

  async function handleAPIButtonClick(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Pressed API Button!");
    await fetchPreviousJournalEntries();
    console.log("Finished fetching data!");
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
                <TableRow>
                  <TableCell>
                    <Typography>{prevJournalEntryGroup.username}</Typography>
                  </TableCell>
                  {prevJournalEntryGroup.journalEntries &&
                    prevJournalEntryGroup.journalEntries.map((journalEntry, idx) => (
                      <TableRow>
                        <TableCell>
                          <Typography>{idx + 1}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{journalEntry.journalEntryTitle}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableCell>
                    <Delete />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default PrevJournal;
