import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { collection } from "firebase/firestore";

import { Button } from "@mui/material";
import { LOCAL_STORAGE_ITEM, URLS } from "../Utils/Constants";

import { addDB, deleteDB, getDB } from "../Service/Utils/Functions";
import { db } from "../Service/dbConection";
import { USERS } from "../Service/Utils/Tables";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const userCollectionRef = collection(db, USERS);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setUsers(await getDB(userCollectionRef));
    }
    fetchData();
  }, [userCollectionRef]);

  function handleLogout() {
    localStorage.removeItem(LOCAL_STORAGE_ITEM.is_logged_in);
    navigate(URLS.login);
  }

  async function handleSave() {
    await addDB(userCollectionRef, { name, email });
    setEmail("");
    setName("");
  }

  async function deleteUser(id) {
    await deleteDB(USERS, id);
  }

  return (
    <>
      <h1>HOME</h1>
      <h5>Exemplo de GET firebase</h5>
      <div>
        <ul>
          {users.map((user) => (
            <>
              <li key={user.id}>
                Nome: {user.name} || Email: {user.email}
              </li>
              <button onClick={() => deleteUser(user.id)}>Deletar</button>
            </>
          ))}
        </ul>
      </div>
      <div>
        <h5>Exemplo de POST firebase</h5>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSave} variant="contained" sx={{ mt: 3, mb: 2 }}>
          Salvar Dados
        </Button>
      </div>
      <Button onClick={handleLogout} variant="contained" sx={{ mt: 3, mb: 2 }}>
        Logout
      </Button>
    </>
  );
}
