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
  { id: 1, nome: "", cpf: "", cargo: "", contato: "" },
  
];

// Função para gerar um novo ID único (com base no maior ID atual + 1)
function gerarNovoId(pessoas: Pessoa[]): number {
  if (pessoas.length === 0) return 1;
  return Math.max(...pessoas.map(p => p.id)) + 1;
}

export default function TabelaSupabase() {
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