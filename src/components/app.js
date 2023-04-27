import { useEffect, useState } from 'react';
import ContactForm from './contact-form';
import Filter from './filter';
import ContactList from './contact-list';

export const App = () => {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const listContacts = JSON.parse(localStorage.getItem('contacts'));

    if (listContacts) {
      setContacts(listContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const getVisibleItems = () => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
  }

  const handleFilter = (text) => {
    setFilter(text);
  }

  const handleAddUser = (user) => {

    const repeated = contacts.find(({ name }) => name === user.name);

    if (repeated) {
      alert(`${user.name} is already in contacts`);
      return;
    }

    setContacts([user, ...contacts]);
  }

  const handleDeleteUser = (idUser) => {
    setContacts(contacts.filter(({id}) => idUser !== id));
  }

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onAddUser={ handleAddUser } />

      <h2>Contacts</h2>
      <Filter onFilter={ handleFilter }/>
      <ContactList visibleList={ getVisibleItems() } onDeleteUser={ handleDeleteUser }/>
    </>
  );
};
