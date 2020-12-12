import React, { useState } from 'react';

/*
 * Situation: `Create a search bar` that filters items in the list as the user types.
 * Feel free to refactor as you feel necessary.
*/

export default function Question2(props) {

  const [searchText, setSearchText] = useState('');

  const shoppingList = [
    'Peanut Butter',
    'Peas',
    'Butter',
    'Beans',
    'Eggs',
    'Quiche',
    'Cheese'
  ];

  const handleSearchTextChange = (event) => {
    const {target: {value}} = event
    setSearchText(value);
  }

  return (
    <div>
      <input value={searchText} onChange={handleSearchTextChange}/>
      {shoppingList
        .filter((i) => i.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
        .map(item => {
          return (
            <div key={item}>
              {item}
            </div>
          )
        })}
    </div>
  )
}
