import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../Dashboard";
import FormularyStep2 from "../FormularyStep2";
import { Container } from "./styles";
const validate = (values) => {
  console.log(values.nome);
  const errors = {};
  if (!values.nome) {
    errors.nome = "Esse Campo é Obrigatorio";
  } else if (values.nome.length > 15) {
    errors.nome = "Must be 15 characters or less";
  }

  if (!values.sobrenome) {
    errors.sobrenome = "Esse Campo é Obrigatorio";
  } else if (values.sobrenome.length > 20) {
    errors.sobrenome = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Esse Campo é Obrigatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Insira um Email Válido";
  }

  return errors;
};
export default function FormularyStep1({
  namereturn,
  sobrenomereturn,
  emailreturn,
  endereco,
  cep,
  estado,
}) {
  console.log(namereturn);

  const [name, setName] = useState(namereturn || null);
  const [sobrenome, setSobrenome] = useState(sobrenomereturn || null);
  const [email, setEmail] = useState(emailreturn || null);
  const [endereco1] = useState(endereco || null);
  const [cep1] = useState(cep || null);
  const [estado1] = useState(estado || null);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  function step2(values) {
    setName(values.nome);
    setSobrenome(values.sobrenome);
    setEmail(values.email);
    console.log(typeof values.nome);
    setNext(true);
  }
  function back() {
    setPrev(!prev);
  }
  const formik = useFormik({
    initialValues: {
      nome: namereturn || "",
      sobrenome: sobrenomereturn || "",
      email: emailreturn || "",
    },
    validate,
    onSubmit: (values) => {
      step2(values);

      toast.success("Informações inseridas com sucesso");
      // alert("preencha os campos" + JSON.stringify(values, null, 2));
    },
  });
  // async function submit() {
  //   if (
  //     name !== null &&
  //     sobrenome !== null &&
  //     email !== null &&
  //     endereco !== null &&
  //     cpf !== null
  //   ) {
  //     console.log("teste");
  //     toast.success("Dados Inseridos com sucesso");
  //     setTimeout(() => {
  //       step2();
  //     }, 1000);
  //   } else {
  //     console.log("nao funciona");
  //     return toast.error("Prencha os Campos Obrigátorios");
  //   }
  // }

  return (
    <Container>
      {prev === false ? (
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {next === false ? (
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
                <h2> Registro Passo 1</h2>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <p> Nome:</p>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.nome}
                    placeholder="insira seu nome aqui"
                  />
                  {formik.errors.nome ? (
                    <div>
                      {" "}
                      <p style={{ color: "red" }}>{formik.errors.nome}</p>{" "}
                    </div>
                  ) : null}
                </div>
                <div>
                  <p>Sobrenome: </p>
                  <input
                    id="sobrenome"
                    name="sobrenome"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.sobrenome}
                    placeholder="insira seu sobrenome aqui"
                  />
                  {formik.errors.sobrenome ? (
                    <div>
                      {" "}
                      <p style={{ color: "red" }}>
                        {formik.errors.sobrenome}
                      </p>{" "}
                    </div>
                  ) : null}
                </div>
                <div>
                  <p>Insira seu Email</p>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="insira seu Email aqui"
                  />
                  {formik.errors.email ? (
                    <div>
                      {" "}
                      <p style={{ color: "red" }}>{formik.errors.email}</p>{" "}
                    </div>
                  ) : null}
                </div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => {
                      back();
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
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      marginRight: 10,
                      borderBottomLeftRadius: "8px",
                      borderBottomRightRadius: "8px",
                    }}
                    type="submit"
                  >
                    {" "}
                    Avançar
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <FormularyStep2
                name={name}
                sobrenome={sobrenome}
                email={email}
                enderecoreturn={endereco1}
                cepreturn={cep1}
                estadoreturn={estado1}
              />
            </>
          )}
        </Container>
      ) : (
        <>
          <Dashboard />
        </>
      )}
    </Container>
  );
}
