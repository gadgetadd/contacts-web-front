import { useSelector } from 'react-redux';
import { List } from '@mui/material';

import ContactItem from '@/components/ContactItem';
import { useFetchContactsQuery } from '@/redux/contactsApi';
import { selectFilter } from '@/redux/selectors';

export default function ContactList() {
  const { data = [] } = useFetchContactsQuery();
  const filter = useSelector(selectFilter);

  const visibleContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <List>
      {visibleContacts.map(contact => (
        <ContactItem key={contact._id} {...contact} />
      ))}
    </List>
  );
}
