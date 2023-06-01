import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Record } from '../models/Record';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectQueriesState, setCurrentPage } from '../store/queries-slice';
import MarkedText from './MarkedText';
import { Divider } from '@mui/material';

const QueryResults = () => {

  const dispatch = useAppDispatch();

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const queriesState = useAppSelector(selectQueriesState);

  const handleChangePage = (event: any, newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    dispatch(setCurrentPage(0));
  };
 
  return (
    <>
      <h3>Query Results:</h3>
      <Divider style={{backgroundColor: 'orange'}}/>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableBody>
              {queriesState.queryResults
                .slice(queriesState.currentPage * rowsPerPage, queriesState.currentPage * rowsPerPage + rowsPerPage)
                .map((row: Record, index: number) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <a target="_blank" href={row.url}>
                          <MarkedText
                            lineText={row.title}
                            term={queriesState.currentTerm}
                          />
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {queriesState.queryResults?.length > 0 ? (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={queriesState.queryResults.length}
            rowsPerPage={rowsPerPage}
            page={queriesState.currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : (
          <div style={{ textAlign: "center", fontSize: "16px" }}>
            No results found
          </div>
        )}
      </Paper>
    </>
  );
}

export default QueryResults;