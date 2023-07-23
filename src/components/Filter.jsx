import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { selectNameFilter, selectFavoritesFilter } from '@/redux/selectors';
import { setNameFilter, setFavoritesFilter } from '@/redux/filterSlice';

export default function Filter() {
  const nameFilter = useSelector(selectNameFilter);
  const favoritesFilter = useSelector(selectFavoritesFilter);
  const dispatch = useDispatch();

  const nameFilterHandler = e => {
    const { value } = e.target;
    dispatch(setNameFilter(value.toLowerCase()));
  };

  const favoritesFilterHandler = e => {
    const { value } = e.target;
    dispatch(setFavoritesFilter(value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 4,
      }}
    >
      <TextField
        sx={{ flexGrow: 1 }}
        id="standard-controlled"
        label="Find contacts by name"
        variant="standard"
        value={nameFilter}
        onChange={nameFilterHandler}
      />
      <FormControl>
        <InputLabel id="favorites">Favorites</InputLabel>
        <Select
          sx={{ width: 160 }}
          labelId="favorites"
          variant="standard"
          onChange={favoritesFilterHandler}
          value={favoritesFilter}
        >
          <MenuItem value={true}>Favorites</MenuItem>
          <MenuItem value={false}>Non-Favorites</MenuItem>
          <MenuItem value={'none'}>Show All</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
