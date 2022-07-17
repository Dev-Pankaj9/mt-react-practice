import React, { useState } from 'react';
import Form from './components/usingFunc/Form';
import NameList from './components/usingFunc/NameList';
import { v4 as uuidv4 } from 'uuid';

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
        [NAME_KEY]: {...data}
      }
    });
  }
  const handleDeleteUser = (name) => {
    const NAME_KEY = name.toLowerCase().trim();
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

  const handleEditUser = (name, color) => {
    const { list } = users;
    list[name].color = color; 
    setUsers({
      ...users,
      list
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
    <Form users={users} handleSetUsers={handleSetUsers} updateData={updateData} handleUpdateData={handleUpdateData} handleEditUser={handleEditUser} />
    <NameList users={users} handleDeleteUser={handleDeleteUser} handleUpdateData={handleUpdateData} />
    </>
  );
}

export default App;
