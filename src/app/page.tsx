"use client";
import React, { useState, useMemo } from "react";

type Pessoa = {
  id: number;
  nome: string;
  cpf: string;
  cargo: string;
  contato?: string;
};

const initialPessoas: Pessoa[] = [
  { id: 1, nome: "JEAN CARLOS SILVA", cpf: "953.855.761-15", cargo: "Gerente de Pós-vendas", contato: "" },
  { id: 2, nome: "Nemilton Firmo de Lima Junior", cpf: "018.529.795-18", cargo: "Gerente Pós-Venda", contato: "" },
  { id: 3, nome: "Joao Paulo Ferreira Costa", cpf: "112.656.626-81", cargo: "Supervisor de Pós-Venda", contato: "" },
  { id: 4, nome: "Kelvin De Oliveira Lino", cpf: "122.527.127-40", cargo: "Supervisor Pós-Venda", contato: "" },
  { id: 5, nome: "Raimundo Fernandes De Oliveira Neto", cpf: "912.081.811-49", cargo: "Gerente de Seminovos", contato: "" },
  { id: 6, nome: "Rodrigo Sérgio Pereira De Freitas", cpf: "691.317.596-53", cargo: "Supervisor Comercial", contato: "" },
  { id: 7, nome: "Vinicius Rodrigues Clemente", cpf: "094.386.176-47", cargo: "Supervisor de pós-vendas", contato: "" },
  { id: 8, nome: "Marcella Beatriz Souza Batista", cpf: "089.493.266-71", cargo: "Supervisora de Pós-Venda", contato: "" },
  { id: 9, nome: "Bruno Ferreira dos Santos", cpf: "012.271.866-65", cargo: "Gerente Comercial", contato: "" },
  { id: 10, nome: "Danilo Pinto Mendes Vieira", cpf: "016.497.086-02", cargo: "Supervisor Comercial", contato: "" },
  { id: 11, nome: "Isaias Ameno Costa Jorge", cpf: "031.454.786-05", cargo: "Gerente de Pós-Vendas", contato: "" },
  { id: 12, nome: "Samanta Aguiar Del Puppo", cpf: "058.473.847-18", cargo: "Supervisora Regional F&I", contato: "" },
  { id: 13, nome: "Uarley de Sousa Santos", cpf: "097.805.846-17", cargo: "Gerente de Vendas", contato: "" },
  { id: 14, nome: "Wagner Luis Fernandes", cpf: "054.797.566-25", cargo: "Supervisor Comercial", contato: "" },
  { id: 15, nome: "Reginaldo Fernandes Lopes", cpf: "646.129.021-49", cargo: "Supervisor Vendas", contato: "" },
  { id: 16, nome: "Cleverson Neves de Oliveira", cpf: "120.832.716-02", cargo: "Supervisor de Pós-vendas", contato: "" },
  { id: 17, nome: "Jose Sirlei Dias Torres", cpf: "069.170.306-00", cargo: "Supervisor de Vendas", contato: "" },
  { id: 18, nome: "Luís Filipe Ribeiro Turani", cpf: "017.728.796-90", cargo: "Gerente de Pós-venda", contato: "" },
  { id: 19, nome: "Ruan Rodrigues Gonçalves", cpf: "138.369.737-07", cargo: "Consultor Funilaria", contato: "" },
  { id: 20, nome: "Rafael Ribeiro Duarte", cpf: "056.883.157-84", cargo: "Gerente Vendas", contato: "" },
  { id: 21, nome: "JONATHAN DANIEL ESTEVES DA SILVA", cpf: "100.835.446-58", cargo: "Gerente de Pós-Venda", contato: "" },
  { id: 22, nome: "Diego Victor Teixeira", cpf: "093.264.386-86", cargo: "*", contato: "" },
  { id: 23, nome: "Ozeias Silva de Barros", cpf: "061.594.074-45", cargo: "Consultor Líder", contato: "" },
  { id: 24, nome: "Gustavo Pandolfi Uccelli", cpf: "100.211.667-81", cargo: "Gerente Pós-Venda", contato: "" },
  { id: 25, nome: "Adriano Ferreira Lima", cpf: "026.158.329-80", cargo: "Gerente de Serviços", contato: "" },
  { id: 26, nome: "Frederico Saraiva Rezende De Medeiros", cpf: "019.456.226-36", cargo: "*", contato: "" },
  { id: 27, nome: "Marconi Pereira de Oliveira", cpf: "633.939.136-20", cargo: "Supervisor Comercial", contato: "" },
  { id: 28, nome: "Luiz Eduardo Dozzo", cpf: "283.581.658-54", cargo: "*", contato: "" },
  { id: 29, nome: "ANDERSON ERNESTO MAIORKY", cpf: "811.151.649-53", cargo: "Coordenador de peças", contato: "" },
  { id: 30, nome: "TARCIZIO RENATO ENDLICH", cpf: "915.620.317-91", cargo: "Gerente de Pós-venda", contato: "" },
  { id: 31, nome: "Daniel Luis de Oliveira", cpf: "968.261.771-53", cargo: "Gerente Pos Venda", contato: "" },
  { id: 32, nome: "Bruna Ariani Nogueira da Costa", cpf: "054.128.586-60", cargo: "Gerente de Pós-venda", contato: "" },
  { id: 33, nome: "PAULO SÉRGIO DE OLIVEIRA FELICIANO", cpf: "017.271.217-32", cargo: "Gerente Regional de Pós-Venda", contato: "" },
  { id: 34, nome: "Jeferson Damaschio", cpf: "116.542.597-13", cargo: "Gerente Comercial", contato: "" },
  { id: 35, nome: "Flamarion Alves da Silva", cpf: "071.250.917-84", cargo: "Gestor de Vendas", contato: "" },
  { id: 36, nome: "ELTON GOMES ALVES", cpf: "117.388.247-21", cargo: "Líder de Oficina", contato: "" },
  { id: 37, nome: "Klinsmann da Conceição dos Santos", cpf: "060.779.181-05", cargo: "Líder de Oficina", contato: "" },
  { id: 38, nome: "Adriana Correa Meireles", cpf: "086.626.937-17", cargo: "Gerente Administrativo", contato: "" },
  { id: 39, nome: "Lélis Aparecida da Silva Lage", cpf: "064.235.726-90", cargo: "Gerente Comercial", contato: "" },
  { id: 40, nome: "DÁRIO DOS SANTOS PEREIRA NETO", cpf: "325.634.608-16", cargo: "Supervisor Comercial", contato: "" },
  { id: 41, nome: "Marcio Vagner Rocon", cpf: "015.472.347-92", cargo: "Supervisor Pós-vendas", contato: "" },
  { id: 42, nome: "ROGÉRIO RIBEIRO SILVA", cpf: "052.545.267-26", cargo: "Gerente de Pós-vendas", contato: "" },
  { id: 43, nome: "RAFAEL CARNEIRO", cpf: "*", cargo: "GERENTE DE VENDAS", contato: "" },
  { id: 44, nome: "EDSON SILVA DE ARAUJO", cpf: "131.889.237-67", cargo: "Coordenador de Serviços", contato: "" },
  { id: 45, nome: "JUNIO DE OLIVEIRA PIRES", cpf: "076.609.216-06", cargo: "Supervisor de Pós-Vendas", contato: "" },
  { id: 46, nome: "Leandro Albuquerque", cpf: "013.005.696-03", cargo: "Gerente de Venda", contato: "" },
  { id: 47, nome: "Cleber Ferreira Amorim", cpf: "790.483.901-68", cargo: "Supervisor de Vendas", contato: "" },
  { id: 48, nome: "Algelison de Assis Souza", cpf: "099.715.187-08", cargo: "Gerente Comercial", contato: "" },
  { id: 49, nome: "Rayone Marteli Lima", cpf: "134.241.927-83", cargo: "Gerente Comercial", contato: "" },
  { id: 50, nome: "Welington Minda Clarindo", cpf: "103.162.097-40", cargo: "Gerente Pós-Venda", contato: "" },
  { id: 51, nome: "Marcos Vinicius da Silva Neves Vieira", cpf: "136.721.747-42", cargo: "Gerente de Pós-Venda", contato: "" },
  { id: 52, nome: "EDNALDO PEREIRA DE ARAÚJO", cpf: "048.030.736-94", cargo: "Supervisor de seminovos", contato: "" },
  { id: 53, nome: "PAULO SÉRGIO PESSOA BRANDÃO", cpf: "029.715.456-79", cargo: "Gerente de Vendas", contato: "" },
  { id: 54, nome: "Pollyana Menezes Ribeiro", cpf: "993.627.671-04", cargo: "Gerente de Vendas", contato: "" },
  { id: 55, nome: "Mariana Pelegrini de Oliveira", cpf: "*", cargo: "Gerente de Vendas", contato: "" },
  { id: 56, nome: "SAULO BERTOLINI SILVA", cpf: "129.064.317-29", cargo: "Coordenador de Pós-vendas", contato: "" },
  { id: 57, nome: "RENAM DAMM VARGAS", cpf: "*", cargo: "Encarregado de obras", contato: "" },
  { id: 58, nome: "Jaqueline Sabadini de Souza Pimassoni", cpf: "099.578.617-86", cargo: "gerente de vendas", contato: "" },
  { id: 59, nome: "Carine Stein Castão", cpf: "*", cargo: "Gerente de Vendas", contato: "" },
  { id: 60, nome: "Ailton Ribeiro Do Nascimento", cpf: "044.380.096-00", cargo: "Gerente de vendas", contato: "" },
  { id: 61, nome: "George Manette Cardoso", cpf: "098.190.697-66", cargo: "Gerente de vendas", contato: "" },
  { id: 62, nome: "Rosalvo Pereira Hudson", cpf: "594.479.406-25", cargo: "Gerente Regional", contato: "" },
  { id: 63, nome: "Bruno Cesar Albarello dos Santos", cpf: "331.882.668-55", cargo: "Coordenador", contato: "" },
  { id: 64, nome: "Junior Gabriel Gomes Silva", cpf: "*", cargo: "Gerente de vendas", contato: "" },
  { id: 65, nome: "Francianne Diniz Pinho", cpf: "114.589.046-60", cargo: "Supervisora comercial", contato: "" },
];

// Função para gerar um novo ID único (com base no maior ID atual + 1)
function gerarNovoId(pessoas: Pessoa[]): number {
  if (pessoas.length === 0) return 1;
  return Math.max(...pessoas.map(p => p.id)) + 1;
}

export default function GerenciadorPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>(initialPessoas);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Omit<Pessoa, "id">>({
    nome: "",
    cpf: "",
    cargo: "",
    contato: "",
  });

  const [newPessoa, setNewPessoa] = useState<Omit<Pessoa, "id">>({
    nome: "",
    cpf: "",
    cargo: "",
    contato: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Ordena e transforma em maiúsculas para filtro e exibição
  const pessoasOrdenadas = useMemo(() => {
    return [...pessoas]
      .map((p) => ({
        ...p,
        nome: p.nome.toUpperCase(),
        cpf: p.cpf.toUpperCase(),
        cargo: p.cargo.toUpperCase(),
        contato: p.contato?.toUpperCase() || "",
      }))
      .sort((a, b) => a.nome.localeCompare(b.nome));
  }, [pessoas]);

  // Lista filtrada pela busca
  const pessoasFiltradas = pessoasOrdenadas.filter(({ nome, cpf, cargo, contato }) => {
    const termo = searchTerm.toUpperCase();
    return nome.includes(termo) || cpf.includes(termo) || cargo.includes(termo) || contato.includes(termo);
  });

  function startEditing(pessoa: Pessoa) {
    setEditingId(pessoa.id);
    setEditForm({
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      cargo: pessoa.cargo,
      contato: pessoa.contato || "",
    });
  }

  function cancelEditing() {
    setEditingId(null);
  }

  function saveEditing() {
    if (editingId === null) return;

    setPessoas((old) =>
      old.map((p) =>
        p.id === editingId
          ? {
            ...p,
            nome: editForm.nome.trim() || p.nome,
            cpf: editForm.cpf.trim() || "*",
            cargo: editForm.cargo.trim() || "*",
            contato: (editForm.contato ?? "").trim() || "*",
          }
          : p
      )
    );
    setEditingId(null);
  }

  function handleEditChange(field: keyof Omit<Pessoa, "id">, value: string) {
    setEditForm((old) => ({ ...old, [field]: value }));
  }

  function addPessoa() {
    if (!newPessoa.nome.trim()) return;

    const novoId = gerarNovoId(pessoas);

    setPessoas((old) => [
      ...old,
      {
        id: novoId,
        nome: newPessoa.nome.trim(),
        cpf: newPessoa.cpf.trim() || "*",
        cargo: newPessoa.cargo.trim() || "*",
        contato: (newPessoa.contato ?? "").trim() || "*",
      },
    ]);
    setNewPessoa({ nome: "", cpf: "", cargo: "", contato: "" });
  }

  function deletePessoa(id: number) {
    const pessoa = pessoas.find((p) => p.id === id);
    if (pessoa && confirm(`Tem certeza que deseja excluir ${pessoa.nome}?`)) {
      setPessoas((old) => old.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Pessoas</h1>

      <input
        type="text"
        placeholder="Pesquisar por nome, CPF, cargo ou contato"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-3 py-2 mb-4 w-full rounded"
      />

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">CPF</th>
            <th className="border border-gray-300 px-4 py-2">Cargo</th>
            <th className="border border-gray-300 px-4 py-2">Contato</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoasFiltradas.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4">
                Nenhuma pessoa encontrada.
              </td>
            </tr>
          )}

          {pessoasFiltradas.map(({ id, nome, cpf, cargo, contato }, index) => (
            <tr key={id} className="hover:bg-white transition-colors hover:text-black">
              <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>{/* índice dinâmico */}

              <td className="border border-gray-300 px-4 py-2">
                {editingId === id ? (
                  <input
                    type="text"
                    value={editForm.nome}
                    onChange={(e) => handleEditChange("nome", e.target.value)}
                    className="w-full border px-2 py-1"
                    autoFocus
                  />
                ) : (
                  nome.toUpperCase()
                )}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {editingId === id ? (
                  <input
                    type="text"
                    value={editForm.cpf}
                    onChange={(e) => handleEditChange("cpf", e.target.value)}
                    className="w-full border px-2 py-1"
                  />
                ) : (
                  cpf.toUpperCase()
                )}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {editingId === id ? (
                  <input
                    type="text"
                    value={editForm.cargo}
                    onChange={(e) => handleEditChange("cargo", e.target.value)}
                    className="w-full border px-2 py-1"
                  />
                ) : (
                  cargo.toUpperCase()
                )}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {editingId === id ? (
                  <input
                    type="text"
                    value={editForm.contato}
                    onChange={(e) => handleEditChange("contato", e.target.value)}
                    className="w-full border px-2 py-1"
                  />
                ) : (
                  (contato || "*").toUpperCase()
                )}
              </td>

              <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                {editingId === id ? (
                  <>
                    <button
                      onClick={saveEditing}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing({ id, nome, cpf, cargo, contato })}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletePessoa(id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Excluir
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 space-y-3">
        <h2 className="font-semibold">Adicionar nova pessoa</h2>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Nome (obrigatório)"
            value={newPessoa.nome}
            onChange={(e) => setNewPessoa((old) => ({ ...old, nome: e.target.value }))}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="CPF (use * se não tiver)"
            value={newPessoa.cpf}
            onChange={(e) => setNewPessoa((old) => ({ ...old, cpf: e.target.value }))}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Cargo (use * se não tiver)"
            value={newPessoa.cargo}
            onChange={(e) => setNewPessoa((old) => ({ ...old, cargo: e.target.value }))}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Contato (use * se não tiver)"
            value={newPessoa.contato}
            onChange={(e) => setNewPessoa((old) => ({ ...old, contato: e.target.value }))}
            className="border px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={addPessoa}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
