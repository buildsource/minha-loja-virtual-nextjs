import React, { useState, useMemo } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import CamisetaCard from '../components/CamisetaCard';
import { ICamiseta } from '../interfaces/ICamiseta';
import { fetchCamisetas } from '../services/camisetaService';
import { removeAcentos } from '../utils/removeAcentos';

interface HomeProps {
  camisetas: ICamiseta[];
}

export const getStaticProps: GetStaticProps = async () => {
  const camisetas = await fetchCamisetas();
  return {
    props: {
      camisetas,
    },
  };
};

const Home: NextPage<HomeProps> = ({ camisetas }) => {
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroPreco, setFiltroPreco] = useState('');
  const [filtroTamanho, setFiltroTamanho] = useState('');
  const [filtroCor, setFiltroCor] = useState('');

  const camisetasFiltradas = useMemo(() => {
    return camisetas.filter((camiseta) => {
      return (
        removeAcentos(camiseta.nome).toLowerCase().includes(removeAcentos(filtroNome.toLowerCase())) &&
        (filtroPreco === '' || camiseta.preco <= Number(filtroPreco)) &&
        (filtroTamanho === '' || camiseta.tamanhos.some(tamanho => removeAcentos(tamanho.toLowerCase()).includes(removeAcentos(filtroTamanho.toLowerCase())))) &&
        (filtroCor === '' || camiseta.cores.some(cor => removeAcentos(cor.toLowerCase()).includes(removeAcentos(filtroCor.toLowerCase()))))
      );
    });
  }, [camisetas, filtroNome, filtroPreco, filtroTamanho, filtroCor]);

  return (
    <>
      <div className="container">
        <h1><strong>Nossas Camisetas</strong></h1>
        <>
          <input
            type="text"
            placeholder="Filtrar por nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Filtrar por preço máximo"
            value={filtroPreco}
            onChange={(e) => setFiltroPreco(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filtrar por tamanho"
            value={filtroTamanho}
            onChange={(e) => setFiltroTamanho(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filtrar por cor"
            value={filtroCor}
            onChange={(e) => setFiltroCor(e.target.value)}
            className="p-2 border rounded"
          />
        </>
      </div>

      <br />
      <div className="container">
        {camisetasFiltradas.map((camiseta) => (
          <div key={camiseta.id} className="item">
            <CamisetaCard camiseta={camiseta} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
