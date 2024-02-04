import React, { FormEvent, useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import {
  APIErrorResponse,
  JournalWrittenEntriesGroup,
  JournalWrittenSingleEntry,
  backendUrlBase
} from "../shared/types";
import { parsePreviousJournalEntries } from "../FrontendParser";
import UsernameContext from "../shared/UsernameContext";
import { APIRequestError } from "../shared/APIRequestError";
import DashboardTransition from "../shared/DashboardTransition";

const PrevJournal: React.FC = () => {
  const { username } = useContext(UsernameContext);
  const [prevJournalEntriesArr, setPrevJournalEntriesArr] = useState<JournalWrittenEntriesGroup[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletedJournalEntry, setDeletedJournalEntry] = useState<JournalWrittenSingleEntry | undefined>(undefined);

  async function fetchPreviousJournalEntries() {
    await axios
      .get(`${backendUrlBase}/api/journal_entry/${username}`)
      .then((res) => {
        const parsedResult = parsePreviousJournalEntries(res.data);
        console.log(parsedResult);
        setPrevJournalEntriesArr(parsedResult);
      })
      .catch((err: AxiosError) => {
        const errorConfig = err.response?.data as APIErrorResponse;
        const error = new APIRequestError("Failed to GET any journal entries", errorConfig);
        console.error(error.toString());
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
  }

  function handleDeleteIconClick(journalEntryToDelete: JournalWrittenSingleEntry) {
    console.log(`Attempting to delete journal entry ${journalEntryToDelete._id}`);
    setShowDeleteDialog(true);
    setDeletedJournalEntry(journalEntryToDelete);
  }

  function handleCloseDialog() {
    setShowDeleteDialog(false);
  }

  async function handleDeleteJournalEntry(mongoGroupId: string) {
    console.assert(deletedJournalEntry !== undefined);
    await axios
      .delete(`${backendUrlBase}/api/journal_entry/${mongoGroupId}/${deletedJournalEntry!._id}`)
      .then((res) => console.log(res))
      .catch((err: AxiosError) => {
        const errorConfig = err.response?.data as APIErrorResponse;
        const error = new APIRequestError("Failed to DELETE the journal entry", errorConfig);
        console.error(error.toString());
      });
    setDeletedJournalEntry(undefined);
    handleCloseDialog();
    await fetchPreviousJournalEntries();
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
              <TableCell
                style={{
                  borderRight: "1px solid lightgray",
                  paddingRight: "8px"
                }}
              >
                Previous Journal Entry Title
              </TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prevJournalEntriesArr &&
              prevJournalEntriesArr.map((prevJournalEntryGroup) => (
                <React.Fragment key={prevJournalEntryGroup._id}>
                  {prevJournalEntryGroup.journalEntries &&
                    prevJournalEntryGroup.journalEntries.map((journalEntry, idx) => (
                      <TableRow key={journalEntry._id}>
                        <TableCell>
                          <Typography>{prevJournalEntryGroup.username}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>{idx + 1}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>{journalEntry.journalEntryTitle}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton color="secondary">
                            <Delete onClick={() => handleDeleteIconClick(journalEntry)} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
                // <TableRow key={prevJournalEntryGroup._id}>
                //   <TableCell colSpan={1}>
                //     <Typography>{prevJournalEntryGroup.username}</Typography>
                //   </TableCell>
                //   {prevJournalEntryGroup.journalEntries &&
                //     prevJournalEntryGroup.journalEntries.map((journalEntry, idx) => (
                //       <TableRow key={journalEntry._id}>
                //         <TableCell colSpan={1}>
                //           <Typography>{idx + 1}</Typography>
                //         </TableCell>
                //         <TableCell colSpan={1}>
                //           <Typography>{journalEntry.journalEntryTitle}</Typography>
                //         </TableCell>
                //         <TableCell colSpan={1}>
                //           <IconButton color="secondary">
                //             <Delete onClick={() => handleDeleteIconClick(journalEntry)} />
                //           </IconButton>
                //           {/* https://mui.com/material-ui/react-dialog/ */}
                //           <Dialog
                //             open={showDeleteDialog}
                //             TransitionComponent={DashboardTransition}
                //             keepMounted
                //             onClose={handleCloseDialog}
                //             aria-describedby="dialog-slide-description"
                //           >
                //             <DialogTitle>Delete Journal Entry Confirmation</DialogTitle>
                //             <DialogContent id="owner-dialog-slide-description-content">
                //               Are you sure you want to delete this journal entry titled{" "}
                //               {`"${deletedJournalEntry?.journalEntryTitle}`}?
                //             </DialogContent>
                //             <DialogActions>
                //               <Button variant="outlined" onClick={() => handleCloseDialog()}>
                //                 Cancel
                //               </Button>
                //               <Button
                //                 variant="contained"
                //                 color="error"
                //                 onClick={() => handleDeleteJournalEntry(prevJournalEntryGroup._id)}
                //               >
                //                 Delete
                //               </Button>
                //             </DialogActions>
                //           </Dialog>
                //         </TableCell>
                //       </TableRow>
                //     ))}
                // </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default PrevJournal;
