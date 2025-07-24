"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Pessoa = {
  id: number;
  nome: string;
  cpf: string;
  cargo: string;
  contato?: string;
};

export default function GerenciadorPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [newPessoa, setNewPessoa] = useState({
    nome: "",
    cpf: "",
    cargo: "",
    contato: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    nome: "",
    cpf: "",
    cargo: "",
    contato: "",
  });

  // Carregar dados ao iniciar
  useEffect(() => {
    async function carregarPessoas() {
      const { data, error } = await supabase.from("pessoas").select("*").order("nome");
      if (error) {
        console.error("Erro ao carregar:", error.message);
      } else {
        setPessoas(data);
      }
    }

    carregarPessoas();
  }, []);

  // Adicionar nova pessoa
  async function addPessoa() {
    if (!newPessoa.nome.trim()) return;

    const nova = {
      nome: newPessoa.nome.trim(),
      cpf: newPessoa.cpf.trim() || "*",
      cargo: newPessoa.cargo.trim() || "*",
      contato: newPessoa.contato.trim() || "*",
    };

    const { data, error } = await supabase.from("pessoas").insert([nova]).select();

    if (error) {
      console.error("Erro ao adicionar:", error.message);
    } else {
      setPessoas([...pessoas, data[0]]);
      setNewPessoa({ nome: "", cpf: "", cargo: "", contato: "" });
    }
  }

  // Iniciar edição
  function startEditing(p: Pessoa) {
    setEditingId(p.id);
    setEditForm({
      nome: p.nome,
      cpf: p.cpf,
      cargo: p.cargo,
      contato: p.contato || "",
    });
  }

  // Salvar edição
  async function saveEditing() {
    if (editingId === null) return;

    const atualizada = {
      nome: editForm.nome.trim(),
      cpf: editForm.cpf.trim() || "*",
      cargo: editForm.cargo.trim() || "*",
      contato: editForm.contato.trim() || "*",
    };

    const { error } = await supabase
      .from("pessoas")
      .update(atualizada)
      .eq("id", editingId);

    if (error) {
      console.error("Erro ao editar:", error.message);
    } else {
      setPessoas((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...atualizada } : p))
      );
      setEditingId(null);
    }
  }

  // Excluir
  async function deletePessoa(id: number) {
    const pessoa = pessoas.find((p) => p.id === id);
    if (!pessoa || !confirm(`Excluir ${pessoa.nome}?`)) return;

    const { error } = await supabase.from("pessoas").delete().eq("id", id);

    if (error) {
      console.error("Erro ao excluir:", error.message);
    } else {
      setPessoas(pessoas.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Gerenciador de Pessoas</h2>

      <div className="grid grid-cols-4 gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Nome"
          value={newPessoa.nome}
          onChange={(e) => setNewPessoa({ ...newPessoa, nome: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="CPF"
          value={newPessoa.cpf}
          onChange={(e) => setNewPessoa({ ...newPessoa, cpf: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Cargo"
          value={newPessoa.cargo}
          onChange={(e) => setNewPessoa({ ...newPessoa, cargo: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Contato"
          value={newPessoa.contato}
          onChange={(e) => setNewPessoa({ ...newPessoa, contato: e.target.value })}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        onClick={addPessoa}
      >
        Adicionar
      </button>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">CPF</th>
            <th className="border p-2">Cargo</th>
            <th className="border p-2">Contato</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">
                {editingId === p.id ? (
                  <input
                    value={editForm.nome}
                    onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                    className="w-full border p-1"
                  />
                ) : (
                  p.nome
                )}
              </td>
              <td className="border p-2">
                {editingId === p.id ? (
                  <input
                    value={editForm.cpf}
                    onChange={(e) => setEditForm({ ...editForm, cpf: e.target.value })}
                    className="w-full border p-1"
                  />
                ) : (
                  p.cpf
                )}
              </td>
              <td className="border p-2">
                {editingId === p.id ? (
                  <input
                    value={editForm.cargo}
                    onChange={(e) => setEditForm({ ...editForm, cargo: e.target.value })}
                    className="w-full border p-1"
                  />
                ) : (
                  p.cargo
                )}
              </td>
              <td className="border p-2">
                {editingId === p.id ? (
                  <input
                    value={editForm.contato}
                    onChange={(e) => setEditForm({ ...editForm, contato: e.target.value })}
                    className="w-full border p-1"
                  />
                ) : (
                  p.contato
                )}
              </td>
              <td className="border p-2 text-center space-x-2">
                {editingId === p.id ? (
                  <button
                    onClick={saveEditing}
                    className="text-green-600 hover:underline"
                  >
                    Salvar
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => deletePessoa(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
