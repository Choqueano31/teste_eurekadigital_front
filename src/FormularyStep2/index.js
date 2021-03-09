import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "./styles";
import { useFormik } from "formik";
import FormularyStep3 from "../FormularyStep3";
import FormularyStep1 from "../FormularyStep1";
const validate = (values) => {
  const errors = {};
  if (!values.endereco) {
    errors.endereco = "Esse Campo é Obrigátorio";
  } else if (values.endereco.length > 30) {
    errors.endereco = "Seja Específico no Endereço";
  }

  if (!values.cep) {
    errors.cep = "Esse Campo é Obrigátorio";
  } else if (values.cep.length === 8) {
    errors.cep = "Insira um Cep Válido";
  }

  if (!values.estado) {
    errors.estado = "Esse Campo é Obrigátorio";
  }

  return errors;
};

export default function FormularyStep2({
  name,
  sobrenome,
  email,
  enderecoreturn,
  cepreturn,
  estadoreturn,
}) {
  const [name1] = useState(name);
  console.log(name);
  const [sobrenome1] = useState(sobrenome);
  const [email1] = useState(email);
  const [endereco, setEndereco] = useState(enderecoreturn || null);
  const [cep, setCep] = useState(cepreturn || null);
  const [estado, setEstado] = useState(estadoreturn || null);
  const [next1, setNext1] = useState(false);
  const [previousPage, setPreviousPage] = useState(false);
  function step3(values) {
    setEndereco(values.endereco);
    setCep(values.cep);
    setEstado(values.estado);
    setNext1(!next1);
  }
  function previous() {
    setPreviousPage(true);
  }
  const formik = useFormik({
    initialValues: {
      endereco: enderecoreturn || "",
      cep: cepreturn || "",
      estado: estadoreturn || "",
    },
    validate,
    onSubmit: (values) => {
      step3(values);
      toast.success("Informações inseridas com sucesso");

      console.log(values);
      // alert("preencha os campos" + JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        {previousPage === false ? (
          <div>
            {next1 === false ? (
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
                  <h2> Registro Passo 2</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <p> Endereço:</p>
                    <input
                      id="endereco"
                      name="endereco"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.endereco}
                      placeholder="insira seu endereco aqui"
                    />
                    {formik.errors.endereco ? (
                      <div>
                        {" "}
                        <p style={{ color: "red" }}>
                          {formik.errors.endereco}
                        </p>{" "}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <p>CEP: </p>
                    <input
                      id="cep"
                      name="cep"
                      type="number"
                      inputMode="number"
                      onChange={formik.handleChange}
                      value={formik.values.cep}
                      placeholder="insira seu cep aqui"
                    />
                    {formik.errors.cep ? (
                      <div>
                        {" "}
                        <p style={{ color: "red" }}>{formik.errors.cep}</p>{" "}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <p>Estado: </p>
                    <input
                      id="estado"
                      name="estado"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.estado}
                      placeholder="insira seu estado aqui"
                    />
                    {formik.errors.estado ? (
                      <div>
                        {" "}
                        <p style={{ color: "red" }}>
                          {formik.errors.estado}
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
                      Avançar
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <FormularyStep3
                  name={name1}
                  sobrenome={sobrenome1}
                  email={email1}
                  endereco={endereco}
                  cep={cep}
                  estado={estado}
                />
              </>
            )}
          </div>
        ) : (
          <>
            <FormularyStep1
              namereturn={name1}
              sobrenomereturn={sobrenome1}
              emailreturn={email1}
              endereco={endereco}
              cep={cep}
              estado={estado}
            />
          </>
        )}
      </div>
    </Container>
  );
}
