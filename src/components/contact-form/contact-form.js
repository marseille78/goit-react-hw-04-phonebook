import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import css from './contact-form.module.css';

const ContactForm = ({ onAddUser }) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isInvalid()) return;

    const user = {
      id: nanoid(),
      name,
      number,
    };

    onAddUser(user);

    clearForm();
  }

  const handleInput = (e) => {
    const target = e.target;

    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'number':
        setNumber(target.value);
        break;
      default:
        return;
    }
  }

  const clearForm = () => {
    setName('');
    setNumber('');
  }

  const isInvalid = () => {
    return !(name.length > 0 && number.length > 0);
  }

  return (
    <div className={ css.container }>
      <form onSubmit={ handleSubmit }>
        <label>
          <h3>Name</h3>
          <input
            className={ css.field }
            type='text'
            name='name'
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={ name }
            onChange={ handleInput }
          />
        </label>

        <label>
          <h3>Number</h3>
          <input
            className={ css.field }
            type='tel'
            name='number'
            pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
            title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
            required
            value={ number }
            onChange={ handleInput }
          />
        </label>

        <div className={ css.btnBlock }>
          <button
            className={ css.btn }
            type='submit'
            disabled={ isInvalid() }
          >
            Add contact
          </button>
        </div>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  onAddUser: PropTypes.func.isRequired
};

export default ContactForm;
