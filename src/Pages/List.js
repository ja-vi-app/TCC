/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Fab,
} from "@mui/material";
import { Add, AddPhotoAlternate, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TOAST_TYPE, URLS } from "../Utils/Constants";
import { sleep, toasterModel } from "../Utils/Functions";
import { CustomTextField } from "../Components/CustomTextField/CustomTextField";
import axios from "axios";

const optionsCategory = [
  { id: "movie", descricao: "Filme" },
  { id: "series", descricao: "Séries" },
];

const initialState = {
  category: [],
  title: "",
};

export default function List() {
  const navigate = useNavigate();
  const [{ category, title }, setState] = useState({ ...initialState });
  const [isOpenAccordion, setIsOpenAccordion] = useState(false);
  const [file, setFile] = useState(null);

  function handleExpandAccordion() {
    if (!isOpenAccordion) {
      navigate(URLS.list);
      sleep(1000);
      setIsOpenAccordion(true);
      return;
    }
    navigate(URLS.home);
    setIsOpenAccordion(false);
  }

  useEffect(() => {}, [isOpenAccordion]);

  async function handleUploadClick(event) {
    setFile(event.target.files[0]);
    // TODO: verificar se o arquivo realmente é uma imagem
    // setFile(file);
  }

  async function handleUploadImage() {
    const formData = new FormData();
    formData.set("file", file);
    return axios({
      method: "post",
      url: `http://ec2-44-204-105-222.compute-1.amazonaws.com:8080/movie/image`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.data;
      })
      .catch(() => {
        toasterModel(
          "Falha ao fazer upload da imagem, tente novamente mais tarde!",
          TOAST_TYPE.error
        );
      });
  }

  function onChange(fieldKey, value) {
    setState((prevState) => ({ ...prevState, [fieldKey]: value }));
  }

  function handleSaveNewCardMovie() {
    // TODO: logica para salvar a imagem e os itens no firebase
  }

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "2%" }}>
        <Accordion
          expanded={isOpenAccordion}
          onChange={handleExpandAccordion}
          style={{
            backgroundColor: "#262626",
            width: "65%",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          <AccordionSummary
            expandIcon={
              <Button style={{ background: "#050505" }}>
                {isOpenAccordion ? (
                  <Remove fontSize="large" style={{ color: "#fff" }} />
                ) : (
                  <Add fontSize="large" style={{ color: "#fff" }} />
                )}
              </Button>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ height: "100px" }}
          >
            <div style={{ display: "grid" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>CRIAR </span>
              <span style={{ fontSize: "13px" }}>
                Crie um card pra se lembrar de seu filme favorito!
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <CustomTextField
              value={title}
              onChange={(e) => onChange("title", e.target.value)}
              id="title"
              multiline={true}
              maxRows="2"
              label="Título"
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              multiple={false}
              type="file"
              onChange={handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Fab component="span">
                <AddPhotoAlternate />
              </Fab>
            </label>
            {file ? file.name : null}

            <Autocomplete
              disablePortal
              id="category"
              key="category"
              options={optionsCategory}
              multiple={false}
              onChange={(e, newValue) => onChange("category", newValue)}
              value={category}
              getOptionLabel={(prop) => (prop.descricao ? prop.descricao : prop)}
              sx={{ width: 300 }}
              renderInput={(params) => <CustomTextField {...params} label="Categoria" />}
            />

            <Button
              onClick={handleSaveNewCardMovie}
              style={{ background: "#8980E8", color: "white" }}
              size="large"
            >
              Adicionar
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
