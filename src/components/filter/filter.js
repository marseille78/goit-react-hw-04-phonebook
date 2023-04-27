import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './filter.module.css';

const Filter = ({ onFilter }) => {

  const [filter, setFilter] = useState('');

  const handleFilter = (e) => {
    e.preventDefault();

    const target = e.target;

    setFilter(target.value);

    onFilter(target.value.trim().toLowerCase());
  }

  return (
    <div className={ css.container }>
      <h3>Find contacts by name</h3>
      <input
        className={ css.field }
        type='text'
        name='filter'
        value={ filter }
        onChange={ handleFilter }
      />
    </div>
  );
}

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
