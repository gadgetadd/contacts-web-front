import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  TextField,
  Button,
  Container,
  Avatar,
  CircularProgress,
} from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EditIcon from '@mui/icons-material/Edit';
import { enqueueSnackbar } from 'notistack';
import { string } from 'yup';

import { closeDrawer } from '@/redux/modalSlice';
import { selectDrawerVariant, selectIdToEdit } from '@/redux/selectors';
import {
  useAddContactMutation,
  useEditContactMutation,
  useFetchContactsQuery,
} from '@/redux/contactsApi';

export default function ContactForm() {
  const drawerVariant = useSelector(selectDrawerVariant);
  const contactId = useSelector(selectIdToEdit);
  const [isValid, setValid] = useState({ name: true, number: true });
  const { data: contacts } = useFetchContactsQuery();
  const [addContact, { isLoading: isAdding }] = useAddContactMutation();
  const [editContact, { isLoading: isEditing }] = useEditContactMutation();
  const isLoading = isAdding || isEditing;
  const dispatch = useDispatch();

  const formVariant = {
    new: 'new',
    edit: 'edit',
  };

  const isNew = drawerVariant === formVariant.new;
  const isEdit = drawerVariant === formVariant.edit;

  const findContact = contactId =>
    contacts.find(({ _id }) => _id === contactId);

  const [name, setName] = useState(
    contactId ? findContact(contactId).name : ''
  );
  const [number, setNumber] = useState(
    contactId ? findContact(contactId).number : ''
  );

  const nameSchema = string()
    .matches(/^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]+([' -][a-zA-Zа-яіїєґА-ЯІЇЄҐ]*)*$/)
    .max(35);

  const numberSchema = string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .max(20);

  const inputChangeHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        nameSchema
          .validate(value)
          .then(() => setValid(prev => ({ ...prev, name: true })))
          .catch(() => setValid(prev => ({ ...prev, name: false })));
        setName(value);
        break;
      case 'number':
        numberSchema
          .validate(value)
          .then(() => setValid(prev => ({ ...prev, number: true })))
          .catch(() => setValid(prev => ({ ...prev, number: false })));
        setNumber(value);
        break;
      default:
        throw new Error('unsupported input name');
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    const {
      name: { value: name },
      number: { value: number },
    } = e.currentTarget.elements;
    if (!isValid.name) {
      enqueueSnackbar('Please enter the correct name', {
        variant: 'error',
      });
      return;
    }
    if (!isValid.number) {
      enqueueSnackbar('Please enter the correct number', {
        variant: 'error',
      });
      return;
    }

    if (isNew) {
      addContact({ name, number })
        .then(({ data }) => {
          dispatch(closeDrawer());
          enqueueSnackbar(`Contact ${data.name} added`, {
            variant: 'success',
          });
        })
        .catch(() =>
          enqueueSnackbar('Something went wrong', {
            variant: 'error',
          })
        );
    }
    if (isEdit) {
      editContact([contactId, { name, number }])
        .then(({ data }) => {
          dispatch(closeDrawer());
          enqueueSnackbar(`Contact ${data.name} edited`, {
            variant: 'success',
          });
        })
        .catch(() =>
          enqueueSnackbar('Something went wrong', {
            variant: 'error',
          })
        );
    }
  };

  return (
    <Container maxWidth="xs" sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : isEdit ? (
            <EditIcon />
          ) : (
            <ContactPageIcon />
          )}
        </Avatar>
        <Box
          sx={{ textAlign: 'center' }}
          component="form"
          onSubmit={submitHandler}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            type="text"
            name="name"
            value={name}
            error={!isValid.name}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            autoFocus
            onChange={inputChangeHandler}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Number"
            type="tel"
            name="number"
            value={number}
            error={!isValid.number}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={inputChangeHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isNew ? 'Add new contact' : 'Save contact'}
          </Button>
        </Box>{' '}
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => dispatch(closeDrawer())}
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
}
