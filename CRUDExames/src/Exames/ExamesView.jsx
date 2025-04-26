import { useState, useRef, useEffect } from "react";
import { findAll, deleteById, insert } from "./ExamesAPI";

export function ExamesView() {
  const [exames, setExames] = useState([]);

  const inputDesc = useRef();
  const inputData = useRef();
  const inputpreco = useRef();

  const inputNome = useRef();
  const inputRg = useRef();
  const inputEmail = useRef();

  useEffect(() => {
    consultar();

    inputDesc.current.focus();
  }, []);

  const consultar = async () => {
    console.log("Consultando Exames...");
    const dados = await findAll();
    setExames(dados);
  };

  const salvar = async () => {
    console.log(
      "Salvando Exame...",
      inputDesc.current.value,
      inputData.current.value,
      inputpreco.current.value,

      inputNome.current.value,
      inputRg.current.value,
      inputEmail.current.value,
    );

    await insert(
      inputDesc.current.value,
      inputData.current.value,
      inputpreco.current.value,

      inputNome.current.value,
      inputRg.current.value,
      inputEmail.current.value,
    );

    alert("Exame salvo com sucesso!");
    await consultar();

    inputDesc.current.value = "";
    inputData.current.value = "";
    inputpreco.current.value = "";

    inputNome.current.value = "";
    inputRg.current.value = "";
    inputEmail.current.value = "";
  };

  const excluir = async (id) => {
    await deleteById(id);
    alert("Exame excluído com sucesso!");

    await consultar();
  };

  return (
    <main
      onKeyDown={(event) => {
        if (event.key === "Enter") salvar();
      }}
    >
      <h1>Listagem de Exames</h1>

      <label>Descrição</label>
      <input type="text" ref={inputDesc} />
      <label>Data</label>
      <input type="text" ref={inputData} placeholder="aaaa-mm-dd"/>
      <label>Preço</label>
      <input type="text" ref={inputpreco} placeholder="000.00"/>

      <label>Nome</label>
      <input type="text" ref={inputNome} />
      <label>RG</label>
      <input type="text" ref={inputRg} />
      <label>Email</label>
      <input type="tel" ref={inputEmail} />

      <button onClick={salvar}>SALVAR</button>
      <button onClick={consultar}>CONSULTAR</button>

      <table>
        <tr>
          <th>DESCRIÇÃO</th>
          <th>DATA</th>
          <th>PREÇO</th>

          <th>NOME</th>
          <th>RG</th>
          <th>EMAIL</th>
        </tr>

        {exames.map((e) => (
          <tr>
            <td>{e.descricao}</td>
            <td>{e.data}</td>
            <td>{e.preco}</td>
            <td>{e.paciente.nome}</td>
            <td>{e.paciente.rg}</td>
            <td>{e.paciente.email}</td>

            <td>
              <button onClick={() => excluir(e.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </table>
    </main>
  );
}
