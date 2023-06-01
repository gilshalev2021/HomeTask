import { Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import API from "../API";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectQueriesState, setQueryResults, setCurrentQueryString, addQuery,setCurrentPage } from "../store/queries-slice";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const SearchButton = () => {
  
  const queriesState = useAppSelector(selectQueriesState);
  
  const dispatch = useAppDispatch();

  const fetchRecords = async (queryString: string) => {
    const response = await API.post('/query/', {query: queryString}).catch(
      (error) => {
        console.log(error);
      }
    );
    dispatch(setQueryResults(response?.data));
    dispatch(setCurrentPage(0));
  };

  const selectQueryString = (e: any) => {
    if(e.target.value || e.target.value === "") {
      dispatch(setCurrentQueryString(e.target.value));
    }
  }

  const handleSearchKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if(event.target.value === "")
        return;
      const queryString = event.target.value;
      fetchRecords(queryString);
      dispatch(addQuery(queryString));
    }
  };

  return (
    <Tooltip title="Enter a query string and press Enter.">
      <Search>
        <SearchIconWrapper>
          <SearchIcon/>
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          value={queriesState.currentQueryString}
          onChange={selectQueryString}
          inputProps={{ "aria-label": "search" }}
          onKeyDown={handleSearchKeyDown}
        />
      </Search>
    </Tooltip>
  );
}

export default SearchButton;