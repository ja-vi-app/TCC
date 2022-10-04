import React, { useState } from "react";

import { collection } from "firebase/firestore";

import { Button, Grid } from "@mui/material";

import { SESSION_STORAGE_ITEM } from "../Utils/Constants";

import { addDB, deleteDB, getDB } from "../Service/Utils/Functions";
import { db } from "../Service/dbConection";
import { USERS } from "../Service/Utils/Tables";

import CardMovie from "../Components/CardMovie/CardMovie";
import List from "./List";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const userCollectionRef = collection(db, USERS);

  async function handleSave() {
    await addDB(userCollectionRef, { name, email });
    setUsers(await getDB(userCollectionRef));
    setEmail("");
    setName("");
  }

  async function deleteUser(id) {
    await deleteDB(USERS, id);
    setUsers(await getDB(userCollectionRef));
  }

  return (
    <>
      <List />
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
      <Grid container spacing={3} p={3}>
        <Grid item xs={6} md={4} xl={1.6}>
          <CardMovie
          // TODO: link s3, vai ser pego via api
          // TODO: passar os emoji por params
          // TODO: passar demais parametros por params
          />
        </Grid>
      </Grid>
    </>
  );
}
