import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import FormularyStep1 from "../FormularyStep1";
import { Card, Container, ContainerRow } from "./styles";
function Dashboard() {
  const contatos = gql`
    query {
      formularies {
        name
        email
        endereco
        cep
        estado
      }
    }
  `;

  const { data, refetch } = useQuery(contatos);
  const [showFormulary1, setSHowFormulary1] = useState(false);

  function changePage() {
    setSHowFormulary1(!showFormulary1);
  }
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {showFormulary1 === false ? (
        <Container>
          <h1> Meus Formulários</h1>
          <ContainerRow>
            <button
              onClick={() => {
                changePage();
              }}
              style={{
                cursor: "pointer",
                backgroundColor: "blue",
                color: "white",
                marginRight: 10,
                width: 150,
                height: 35,
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            >
              cadastrar Formulario
            </button>
          </ContainerRow>
          {data !== undefined ? (
            <>
              {data.formularies.map((item) => {
                return (
                  <Card
                    style={{
                      cursor: "pointer",
                      backgroundColor: " #FFFFFF",
                      borderBlockColor: "black",
                      borderColor: "black",
                      borderRadius: 10,
                      borderStyle: "solid",
                      borderWidth: "2px",
                    }}
                  >
                    <p style={{ marginLeft: 10 }}>
                      Nome: {item.name} email: {item.email} <br />
                      endereço: {item.endereco}, {item.estado}, cep: {item.cep}
                    </p>
                  </Card>
                );
              })}
            </>
          ) : (
            <ContainerRow>
              <h3> Não Há Formulários Cadastrados</h3>
            </ContainerRow>
          )}{" "}
        </Container>
      ) : (
        <>
          <FormularyStep1 />{" "}
        </>
      )}
    </Container>
  );
}

export default Dashboard;
