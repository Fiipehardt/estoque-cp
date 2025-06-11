import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const estoqueMinimo = {
  "1615": 20,
  "1617": 20,
  "1613": 20,
  "1614": 20,
  "1611": 20,
  "1612": 20,
  "1600": 20,
  "1602": 20,
  "1603": 20,
  "1604": 20,
  "1605": 20,
  "1606": 20,
  "1607": 20,
  "1608": 20,
  "1609": 20,
  "1610": 20,
  "1619": 20,
  "1618": 20,
  "1620": 20,
  "1616": 20,
  "1662": 20,
  "1665": 20,
  "1660": 20,
  "1661": 20,
  "1663": 20,
  "1664": 20,
  "1650": 20,
  "1651": 20,
  "1630": 20,
  "1631": 20,
  "1633": 20,
  "1634": 20,
  "1636": 20,
  "1637": 20,
  "1635": 20,
  "1632": 20
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
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Controle de Estoque</h1>
      <Card>
        <CardContent className="space-y-2 p-4">
          <Input
            placeholder="Referência"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
          />
          <Input
            placeholder="Quantidade em estoque"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <Button onClick={adicionarItem}>Adicionar</Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Itens Conferidos</h2>
        {itens.map((item, idx) => (
          <div
            key={idx}
            className="p-2 border rounded flex justify-between items-center"
          >
            <span>
              <strong>{item.referencia}</strong> — {item.quantidade} unidades (mín: {item.minimo})
            </span>
            {item.precisaPedir && <span className="text-red-600 font-bold">Pedir</span>}
          </div>
        ))}
      </div>

      {itensParaPedido.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-red-600">Produtos para Pedido</h2>
          <ul className="list-disc ml-5">
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
