import { useDispatch, useSelector } from 'react-redux';
import { ContactItems, Contact, Button, Text } from './ContactList.styled'
import { selectFilteredContacts, selectError, selectIsLoading } from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/fetchData';
import { useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {isLoading && !error ? (
        <Loader />
      ) : filteredContacts.length === 0 && !error ? (
          <Text>There no matches in phonebook.</Text>
        ) : (
          filteredContacts.map(({ id, name, number }) => (
        <ContactItem key={id} contact={{ id, name, number }}/>
          ))
      )}
    </ul>
  );
}

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <ContactItems>
      <Contact>{contact.name}</Contact>
      <Contact>{contact.number}</Contact>
      <Button onClick={handleDelete}>Delete</Button>
    </ContactItems>
  );
}