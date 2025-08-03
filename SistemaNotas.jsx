import { useState } from "react";

export default function SistemaNotas() {
  const [alunos, setAlunos] = useState([]);
  const [input, setInput] = useState("");

  const adicionarAluno = () => {
    const partes = input.trim().split(/\s+/);
    if (partes.length !== 7) return;

    const nome = partes[0];
    const notas = partes.slice(1, 6).map(Number);
    const frequencia = parseFloat(partes[6].replace("%", ""));

    setAlunos([...alunos, { nome, notas, frequencia }]);
    setInput("");
  };

  const mediaAluno = (notas) =>
    (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1);

  const mediasTurma = () => {
    const totais = [0, 0, 0, 0, 0];
    alunos.forEach((a) =>
      a.notas.forEach((nota, i) => (totais[i] += nota))
    );
    return totais.map((t) =>
      alunos.length ? (t / alunos.length).toFixed(1) : "0.0"
    );
  };

  const mediaTurmaGeral = () => {
    return (
      alunos.reduce(
        (soma, a) => soma + parseFloat(mediaAluno(a.notas)),
        0
      ) / alunos.length || 0
    ).toFixed(1);
  };

  const alunosAcimaMedia = () => {
    const mediaGeral = parseFloat(mediaTurmaGeral());
    return alunos.filter(
      (a) => parseFloat(mediaAluno(a.notas)) > mediaGeral
    );
  };

  const alunosFrequenciaBaixa = () =>
    alunos.filter((a) => a.frequencia < 75);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Sistema de Notas e Frequência
      </h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Ex: João 7 8 6 9 10 80%"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4"
        onClick={adicionarAluno}
      >
        Adicionar Aluno
      </button>

      <h2 className="text-xl font-semibold mb-2">Alunos</h2>
      {alunos.map((a, i) => (
        <div key={i} className="mb-1">
          {a.nome}: Média {mediaAluno(a.notas)} - Frequência {a.frequencia}%
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-4">
        Média da Turma por Disciplina
      </h2>
      <div>{mediasTurma().join("  ")}</div>

      <h2 className="text-xl font-semibold mt-4">
        Alunos com média acima da média da turma
      </h2>
      {alunosAcimaMedia().map((a, i) => (
        <div key={i}>{a.nome}</div>
      ))}
      {alunosAcimaMedia().length === 0 && <div>(nenhum)</div>}

      <h2 className="text-xl font-semibold mt-4">
        Alunos com frequência abaixo de 75%
      </h2>
      {alunosFrequenciaBaixa().map((a, i) => (
        <div key={i}>{a.nome}</div>
      ))}
      {alunosFrequenciaBaixa().length === 0 && <div>(nenhum)</div>}
    </div>
  );
}
