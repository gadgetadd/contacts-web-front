import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@mui/material';

import { selectFilter } from '@/redux/selectors';
import { setFilter } from '@/redux/filterSlice';

export default function Filter() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const filterHandler = e => {
    const { value } = e.currentTarget;
    dispatch(setFilter(value.toLowerCase()));
  };

  return (
    <TextField
      fullWidth
      id="standard-controlled"
      label="Find contacts by name"
      variant="standard"
      value={filter}
      onChange={filterHandler}
    />
  );
}
