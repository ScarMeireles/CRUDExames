const URL =
  "https://api-exame-dot-api-samples-423102.uc.r.appspot.com/api/exames";

export async function findAll() {
  console.log("Executando findAll()");

  const requestInfo = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 26042004",
    },
  };

  const responseHttp = await fetch(URL, requestInfo);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    console.log("Falha ao tentar buscar os Exames.");
    throw new Error("Falha ao tentar buscar os Exames.");
  }
}

export async function deleteById(id) {
  console.log(`Executando deleteById(${id})`);

  const requestInfo = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 26042004",
    },
  };

  const responseHttp = await fetch(`${URL}/${id}`, requestInfo);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    console.log("Falha ao tentar buscar os Exames.");
    throw new Error("Falha ao tentar buscar os Exames.");
  }
}

export async function insert(descricao, data, preco, nome, rg, email) {
  
  console.log(JSON.stringify({ 
        descricao, 
        data, 
        preco: Number(preco),
        paciente:{nome, rg: Number(rg), email}}),),
    
    console.log(
      `Executando insert(${descricao}, ${data}, ${preco}, ${nome}, ${rg}, ${email})`,
    );

  const requestInfo = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 26042004",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      descricao, 
      data, 
      preco: Number(preco),
      paciente:{nome, rg: Number(rg), email}}),
  };

  const responseHttp = await fetch(URL, requestInfo);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    console.log("Falha ao tentar buscar os Exames.");
    throw new Error("Falha ao tentar buscar os Exames.");
  }
}
