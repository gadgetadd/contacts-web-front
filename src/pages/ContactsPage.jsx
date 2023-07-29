import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Fab,
  Drawer,
  Typography,
  Container,
  Alert,
  AlertTitle,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';

import ContactForm from '@/components/ContactForm';
import ContactList from '@/components/ContactList';
import Filter from '@/components/Filter';
import Loader from '@/components/Loader';
import Warning from '@/components/Warning';

import { openFormNew, closeForm } from '@/redux/modalSlice';
import { useFetchContactsQuery } from '@/redux/contactsApi';
import { selectIsFormOpen, selectIsFormEdited } from '@/redux/selectors';

export default function ContactsPage() {
  const [isWarning, setWarning] = useState(false);
  const isFormEdited = useSelector(selectIsFormEdited);
  const isFormOpen = useSelector(selectIsFormOpen);
  const dispatch = useDispatch();
  const { data = [], isError, isLoading } = useFetchContactsQuery();
  const isMobile = useMediaQuery('(max-width:786px)');

  const handleCloseForm = () => dispatch(closeForm());

  const handleAccidentalClicks = (_, reason) => {
    if (isFormEdited) {
      if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
        setWarning(true);
        return;
      }
    }
    handleCloseForm();
  };

  return (
    <Container component="main">
      {isLoading && <Loader />}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong. Please reload the page
        </Alert>
      )}
      {!isLoading && !isError && data.length === 0 ? (
        <Typography sx={{ mt: 4 }} align="center" variant="h5" paragraph>
          Your phone book is empty. Please click the button in the lower right
          corner and add new contacts.
        </Typography>
      ) : (
        !isLoading &&
        !isError && (
          <>
            <Typography align="center" component="h1" variant="h4">
              Contacts
            </Typography>
            <Filter />
            <ContactList />
          </>
        )
      )}
      <Drawer
        anchor={isMobile ? 'top' : 'bottom'}
        open={isFormOpen}
        ModalProps={{ onClose: handleAccidentalClicks }}
      >
        <ContactForm />
      </Drawer>
      <Fab
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        color="primary"
        aria-label="add"
        onClick={() => dispatch(openFormNew())}
      >
        <AddIcon />
      </Fab>
      <Warning
        action={handleCloseForm}
        isActive={isWarning}
        onClose={() => setWarning(false)}
        variant="edit"
      />
    </Container>
  );
}
