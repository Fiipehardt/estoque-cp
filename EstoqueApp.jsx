import React, { useState } from "react";

const estoqueMinimo = {
  "1615": 20, "1617": 20, "1613": 20, "1614": 20, "1611": 20, "1612": 20,
  "1600": 20, "1602": 20, "1603": 20, "1604": 20, "1605": 20, "1606": 20,
  "1607": 20, "1608": 20, "1609": 20, "1610": 20, "1619": 20, "1618": 20,
  "1620": 20, "1616": 20, "1662": 20, "1665": 20, "1660": 20, "1661": 20,
  "1663": 20, "1664": 20, "1650": 20, "1651": 20, "1630": 20, "1631": 20,
  "1633": 20, "1634": 20, "1636": 20, "1637": 20, "1635": 20, "1632": 20
};

export default function EstoqueApp() {
  const [referencia, setReferencia] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [itens, setItens] = useState([]);

  const adicionarItem = () => {
    if (!referencia || !quantidade) return;
    const minimo = estoqueMinimo[referencia];
    const precisaPedir = minimo && Number(quantidade) < minimo;

    setItens([
      ...itens,
      {
        referencia,
        quantidade: Number(quantidade),
        minimo: minimo || "-",
        precisaPedir
      }
    ]);

    setReferencia("");
    setQuantidade("");
  };

  const itensParaPedido = itens.filter((item) => item.precisaPedir);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1>Controle de Estoque</h1>
      <input
        placeholder="Referência"
        value={referencia}
        onChange={(e) => setReferencia(e.target.value)}
        style={{ display: 'block', marginBottom: 10, padding: 8, width: '100%' }}
      />
      <input
        placeholder="Quantidade em estoque"
        type="number"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        style={{ display: 'block', marginBottom: 10, padding: 8, width: '100%' }}
      />
      <button onClick={adicionarItem} style={{ padding: 10, width: '100%' }}>Adicionar</button>

      <h2 style={{ marginTop: 30 }}>Itens Conferidos</h2>
      {itens.map((item, idx) => (
        <div key={idx} style={{
          border: '1px solid #ccc',
          padding: 10,
          marginTop: 10,
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>
            <strong>{item.referencia}</strong> — {item.quantidade} unidades (mín: {item.minimo})
          </span>
          {item.precisaPedir && <span style={{ color: 'red', fontWeight: 'bold' }}>Pedir</span>}
        </div>
      ))}

      {itensParaPedido.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h2 style={{ color: 'red' }}>Produtos para Pedido</h2>
          <ul>
            {itensParaPedido.map((item, idx) => (
              <li key={idx}>
                {item.referencia} — {item.minimo - item.quantidade} unid
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}