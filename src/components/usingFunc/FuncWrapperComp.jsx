import React, { useState, useEffect } from "react";
import Form from "./Form";
import Users from "./Users";
import { v4 as uuidv4 } from "uuid";
import { handleize } from "../../util/util";
import { Link } from 'react-router-dom';

const FuncWrapperComp = () => {
  const [users, setUsers] = useState({
    colors: { red: 0, green: 0, blue: 0 },
    list: [],
  });
  const [updateData, setUpdateData] = useState(null);

  const handleAddUsers = (name, color) => {
    const NAME_KEY = handleize(name);
    const COLOR_KEY = handleize(color);
    const { list } = users;
    if (list[NAME_KEY]) return;
    list[NAME_KEY] = { name, color, id: uuidv4() };

    setUsers({
      colors: {
        ...users.colors,
        [COLOR_KEY]: users.colors[COLOR_KEY] + 1,
      },
      list,
    });
  };

  const handleDeleteUser = (name) => {
    const NAME_KEY = handleize(name);
    const { list } = users;
    if (!list[NAME_KEY]) return;
    const { color } = list[NAME_KEY];
    const COLOR_KEY = color.toLowerCase().trim();
    delete list[NAME_KEY];
    setUsers({
      colors: {
        ...users.colors,
        [COLOR_KEY]: users.colors[COLOR_KEY] - 1,
      },
      list,
    });
  };

  const handleEditUser = (name, new_color) => {
    const NAME_KEY = handleize(name);
    const { list } = users;
    const { color: PREV_COLOR_KEY } = list[NAME_KEY];
    const NEW_COLOR_KEY = new_color.toLowerCase().trim();
    list[NAME_KEY].color = new_color;
    setUsers({
      colors: {
        ...users.colors,
        [PREV_COLOR_KEY]: users.colors[PREV_COLOR_KEY] - 1,
        [NEW_COLOR_KEY]: users.colors[NEW_COLOR_KEY] + 1,
      },
      list: {
        ...list,
      },
    });
  };

  const handleUpdateData = (data) => {
    setUpdateData(data);
  };

  useEffect(() => {
    handleUpdateData(null);
  }, [users]);

  console.log("FuncWrapper Comp");

  return (
    <section>
      <div className="container">
        <h1>
          <Link to="/mt-react-practice">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <span>Functional Multi Component</span>
        </h1>
      </div>
      <Form
        users={users}
        handleAddUsers={handleAddUsers}
        updateData={updateData}
        handleEditUser={handleEditUser}
        handleUpdateData={handleUpdateData}
      />
      <Users
        users={users}
        handleDeleteUser={handleDeleteUser}
        handleUpdateData={handleUpdateData}
      />
    </section>
  );
};

export default FuncWrapperComp;
