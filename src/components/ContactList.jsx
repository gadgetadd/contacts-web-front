import { useSelector } from 'react-redux';
import { List } from '@mui/material';

import ContactItem from '@/components/ContactItem';
import { useFetchContactsQuery } from '@/redux/contactsApi';
import { selectNameFilter, selectFavoritesFilter } from '@/redux/selectors';

export default function ContactList() {
  const { data = [] } = useFetchContactsQuery();
  const nameFilter = useSelector(selectNameFilter);
  const favoritesFilter = useSelector(selectFavoritesFilter);

  const filterContacts = contacts => {
    let filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(nameFilter)
    );
    if (favoritesFilter !== 'all') {
      filtered = filtered.filter(
        contact => contact.favorite === favoritesFilter
      );
    }
    return filtered;
  };

  return (
    <List>
      {filterContacts(data).map(contact => (
        <ContactItem key={contact._id} {...contact} />
      ))}
    </List>
  );
}
