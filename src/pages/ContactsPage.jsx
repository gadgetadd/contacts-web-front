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
import Dialog from '@/components/Dialog';

import { openDrawerNew, closeDrawer, openDialog } from '@/redux/modalSlice';
import { useFetchContactsQuery } from '@/redux/contactsApi';
import { selectIsDrawerOpen } from '@/redux/selectors';

export default function ContactsPage() {
  const isDrawerOpen = useSelector(selectIsDrawerOpen);
  const dispatch = useDispatch();
  const { data = [], isError, isLoading } = useFetchContactsQuery();
  const isMobile = useMediaQuery('(max-width:786px)');

  const handleAccidentalClicks = (_, reason) => {
    if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
      dispatch(openDialog());
      return;
    }
    dispatch(closeDrawer());
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
        open={isDrawerOpen}
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
        onClick={() => dispatch(openDrawerNew())}
      >
        <AddIcon />
      </Fab>
      <Dialog />
    </Container>
  );
}
