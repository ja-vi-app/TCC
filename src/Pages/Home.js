import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { collection } from "firebase/firestore";

import { Button, Grid } from "@mui/material";
import { SESSION_STORAGE_ITEM, URLS } from "../Utils/Constants";

import { addDB, deleteDB, getDB } from "../Service/Utils/Functions";
import { db } from "../Service/dbConection";
import { USERS } from "../Service/Utils/Tables";
import CardMovie from "../Components/CardMovie/CardMovie";

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
    sessionStorage.clear();

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
      <h1>Bem-Vindo {sessionStorage.getItem(SESSION_STORAGE_ITEM.nameUser)}</h1>
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
      <Grid container spacing={3} p={3}>
        <Grid item xs={6} md={4} xl={1.6}>
          <CardMovie
            icon="ac_unit"
            title="paypal"
            description="Freelance Payment"
            value="$455.00"
          />
        </Grid>
      </Grid>
    </>
  );
}
