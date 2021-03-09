import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../Dashboard";
import FormularyStep2 from "../FormularyStep2";
import { Container } from "./styles";
const validate = (values) => {
  console.log(values);
  const errors = {};
  if (!values.escolaridade) {
    errors.escolaridade = "Esse Campo é Obrigátorio";
  } else if (values.escolaridade.length > 30) {
    errors.escolaridade = "Seja Específico no Endereço";
  }

  if (!values.idade) {
    errors.idade = "Esse Campo é Obrigátorio";
  } else if (values.idade.length > 3) {
    errors.idade = "Insira uma idade Válida";
  }

  if (!values.civil) {
    errors.civil = "Esse Campo é Obrigátorio";
  }

  return errors;
};

export default function FormularyStep3({
  name,
  sobrenome,
  email,
  endereco,
  cep,
  estado,
}) {
  const [name1] = useState(name);

  const [sobrenome1] = useState(sobrenome);
  const [email1] = useState(email);
  const [endereco1] = useState(endereco);
  const [cep1] = useState(cep);
  const [estado1] = useState(estado);

  const [previousPage, setPreviousPage] = useState(false);
  const [firstPage, setFirstPage] = useState(false);
  function Home() {
    setTimeout(() => {
      setFirstPage(!firstPage);
    }, 3000);
  }
  async function step3(values) {
    //  setEscolaridade1(values.escolaridade);
    //  setIdade1(values.idade);
    //   setCivil1(values.civil);

    envio(values);

    toast.success("Você foi cadastrado com sucesso");
    //funcao com post
  }
  function previous() {
    setPreviousPage(true);
  }
  const formik = useFormik({
    initialValues: {
      escolaridade: "",
      idade: "",
      civil: "",
    },
    validate,
    onSubmit: (values) => {
      step3(values);
    },
  });

  const criarContato1 = gql`
    mutation createFormulary(
      $name: String!
      $sobrenome: String!
      $email: String!
      $endereco: String!
      $cep: String!
      $estado: String!
      $escolaridade: String!
      $idade: String!
      $civil: String!
    ) {
      createFormulary(
        name: $name
        sobrenome: $sobrenome
        email: $email
        endereco: $endereco
        cep: $cep
        estado: $estado
        escolaridade: $escolaridade
        idade: $idade
        civil: $civil
      ) {
        name
        email
      }
    }
  `;
  const [createUser, { data }] = useMutation(criarContato1);
  // const { loading, data } = useQuery(contatos);

  console.log(data);
  function envio(values) {
    setTimeout(() => {
      createUser({
        variables: {
          name: name1,
          sobrenome: sobrenome1,
          email: email1,
          endereco: endereco1,
          cep: String(cep1),
          estado: estado1,
          escolaridade: values.escolaridade,
          idade: String(values.idade),
          civil: values.civil,
        },
      }).then((data) => {
        console.log(data);
      });
      Home();
    }, 1000);
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     ts();
  //   }, 5000);
  // }, []);
  return (
    <Container>
      {firstPage === false ? (
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            {previousPage === false ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 500,
                  height: 600,
                  backgroundColor: " #FFFFFF",
                  borderBlockColor: "black",
                  borderColor: "black",
                  borderRadius: 10,
                  borderStyle: "solid",
                  borderWidth: "2px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h2> Registro Passo 3</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <p> Escolaridade:</p>
                    <input
                      id="escolaridade"
                      name="escolaridade"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.escolaridade}
                      placeholder="insira sua escolaridade aqui"
                    />
                    {formik.errors.escolaridade ? (
                      <div>
                        {" "}
                        <p style={{ color: "red" }}>
                          {formik.errors.escolaridade}
                        </p>{" "}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <p>Idade: </p>
                    <input
                      id="idade"
                      name="idade"
                      type="number"
                      inputMode="number"
                      onChange={formik.handleChange}
                      value={formik.values.idade}
                      placeholder="insira sua idade aqui"
                    />
                    {formik.errors.idade ? (
                      <div>
                        {" "}
                        <p style={{ color: "red" }}>
                          {formik.errors.idade}
                        </p>{" "}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <p>Estado Civil: </p>
                    <input
                      id="civil"
                      name="civil"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.civil}
                      placeholder="insira seu estado civil aqui"
                    />
                    {formik.errors.civil ? (
                      <div>
                        {" "}
                        <p style={{ color: "red" }}>
                          {formik.errors.civil}
                        </p>{" "}
                      </div>
                    ) : null}
                  </div>

                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => {
                        previous();
                      }}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        marginRight: 10,
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      {" "}
                      Voltar
                    </button>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        marginRight: 10,
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      {" "}
                      Cadastrar
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <FormularyStep2
                  name={name1}
                  sobrenome={sobrenome1}
                  email={email1}
                  enderecoreturn={endereco1}
                  cepreturn={cep1}
                  estadoreturn={estado1}
                />
              </>
            )}
          </div>
        </Container>
      ) : (
        <>
          <Dashboard />
        </>
      )}
    </Container>
  );
}
