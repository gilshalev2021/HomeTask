import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import HighlightIcon from '@mui/icons-material/Highlight';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectQueriesState, setCurrentTerm } from '../store/queries-slice';
import { Tooltip } from "@mui/material";
import { Record } from '../models/Record';

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

const FindButton = () => {
    const [appearancesCount, setAppearancesCount ] = useState(0);
    
    const dispatch = useAppDispatch();
    
    const queriesState = useAppSelector(selectQueriesState);

    const findTermChanged = (event: any) => {
    
      dispatch(setCurrentTerm(event.target.value));

      let appearancesCount = 0;

      const term = event.target.value;
     
      if(term !== "") {
        const termRegex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        queriesState.queryResults.forEach((item:Record) => {
          const matches = item.title.match(termRegex);
          if (matches) {
            appearancesCount += matches.length;
          }
        });
      }
      setAppearancesCount(appearancesCount);
    }
  
    return (
      <Tooltip title="Enter a term to be highlighted.">
        <Search>
          <SearchIconWrapper>
            <HighlightIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Highlight Terms…"
            inputProps={{ "aria-label": "search" }}
            value={queriesState.currentTerm}
            onChange={findTermChanged}
          />
          <span style={{margin: '2px', padding:'2px'}}>{appearancesCount}</span>
        </Search>
      </Tooltip>
    );
};

export default FindButton;