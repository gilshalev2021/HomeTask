import { Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useEffect } from "react";
import API from "../API";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectQueriesState, setCurrentQueryString, setPastQueries, setQueryResults,setCurrentPage } from "../store/queries-slice";
         
const PastQueries = () => {

  const dispatch = useAppDispatch();

  const queriesState = useAppSelector(selectQueriesState);
  
  const fetchQueries = async () => {
    const response = await API.get("/query/past-queries").catch((error) => {
      console.log(error);
    });
    dispatch(setPastQueries(response?.data));
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const runQuery = async (queryString: string) => {
    const response = await API.get("/query/?query=" + queryString).catch(
      (error) => {
        console.log(error);
      }
    );
    let queyResults = response?.data;
    dispatch(setQueryResults(queyResults));
    dispatch(setCurrentQueryString(queryString));
    dispatch(setCurrentPage(0));
  };

  return (
    <>
      <h3>Past Queries:</h3>
      <Divider style={{backgroundColor: 'orange'}}/>
      <List>
        {queriesState.pastQueries?.length > 0 ? (
          queriesState.pastQueries.map((query:string, index:number) => (
            <ListItem key={index} style={{ padding: "1px 20px" }}>
              <ListItemButton style={{ padding: "0" }}>
                <ListItemText onClick={() => runQuery(query)}>
                  {query}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <div style={{ textAlign: "center", fontSize: "16px" }}>
            No queries found
          </div>
        )}
      </List>
    </>
  );
}
export default PastQueries;

   