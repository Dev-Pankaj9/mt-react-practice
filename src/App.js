import React, { useState } from 'react';
import Form from './components/usingFunc/Form';
import NameList from './components/usingFunc/NameList';
import { v4 as uuidv4 } from 'uuid';
import { handleize } from './util/util';

function App() {
  const [users, setUsers] = useState({
    colors: {red:0, green:0, blue:0},
    list: {}
  });
  const [updateData, setUpdateData] = useState(null);

  const handleSetUsers = (name, color) => {
    const NAME_KEY = name.toLowerCase().trim();
    const COLOR_KEY = color.toLowerCase().trim();
    if(users.list[NAME_KEY]) return;
    const data = { name, color, id: uuidv4()};
    
    setUsers({
      colors: {
        ...users.colors,
        [COLOR_KEY]: users.colors[COLOR_KEY] + 1
      },
      list: {
        ...users.list,
        [NAME_KEY]: data
      }
    });
  }
  const handleDeleteUser = (name) => {
    const NAME_KEY = handleize(name);
    const { list } = users;
    if(!list[NAME_KEY]) return;
    const {color} = list[NAME_KEY];
    const COLOR_KEY = color.toLowerCase().trim();
    delete list[NAME_KEY];
    setUsers({
      colors: {
        ...users.colors,
        [COLOR_KEY]: users.colors[COLOR_KEY] - 1
      },
      list
    });
  }
  const handleEditUser = (name, prev_color, new_color) => {
    const NEW_COLOR_KEY = new_color.toLowerCase().trim();
    const PREV_COLOR_KEY = prev_color.toLowerCase().trim();
    const { list } = users;
    list[name].color = new_color; 
    setUsers({
      colors: {
        ...users.colors,
        [PREV_COLOR_KEY]: users.colors[PREV_COLOR_KEY] - 1,
        [NEW_COLOR_KEY]: users.colors[NEW_COLOR_KEY] + 1
      },
      list: {
        ...list
      }
    });
  }
  const handleUpdateData = data => {
    // const { list } = users;
    // const keys_len = Object.keys(list).length;
    // if(keys_len === 0 || typeof data !== 'object' || !data.name) return;
    setUpdateData(data)
  }

  return (
    <>
    <Form users={users} handleSetUsers={handleSetUsers} updateData={updateData} handleEditUser={handleEditUser} handleUpdateData={handleUpdateData} />
    <NameList users={users} handleDeleteUser={handleDeleteUser} handleUpdateData={handleUpdateData} />
    </>
  );
}

export default App;
