/* eslint-disable @next/next/no-img-element */
import { ICamiseta } from '@/src/interfaces/ICamiseta';
import { fetchCamisetaPeloId, fetchAllCamisetaIds } from '@/src/services/camisetaService';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface CamisetaDetailsProps {
    camiseta: ICamiseta | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Busca todos os IDs das camisetas
    const camisetasIds = await fetchAllCamisetaIds();

    if (!camisetasIds) {
        return {
            paths: [],
            fallback: true,
        };
    }

    // Cria um array de paths com base nos IDs
    const paths = camisetasIds.map((id) => ({
        params: { id: id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;
    const id = params?.id as string;

    const camiseta = await fetchCamisetaPeloId(parseInt(id, 10));

    return {
        props: {
            camiseta: camiseta[0] || null,
        },
    };
};

const CamisetaDetails: NextPage<CamisetaDetailsProps> = ({ camiseta }) => {
    const router = useRouter();
    const [selectedCor, setSelectedCor] = useState(camiseta?.cores[0] || '');
    const [selectedTamanho, setSelectedTamanho] = useState(camiseta?.tamanhos[0] || '');

    const handleCorChange = (cor: string) => {
        setSelectedCor(cor);
    };

    const handleTamanhoChange = (tamanho: string) => {
        setSelectedTamanho(tamanho);
    };

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!camiseta) {
        return <div>Camiseta não encontrada.</div>;
    }

    return (
        <div className='container-center'>
            <h1><strong>{camiseta.nome} {selectedTamanho || ''} {selectedCor || ''}</strong></h1>
            <br />
            <div className="camiseta-card__img" style={{ backgroundImage: `url(${camiseta.imagem[camiseta.cores.indexOf(selectedCor)]})` }} />
            <br />
            <div className='width-400'>
                <p><strong>Preço: </strong> R$ {camiseta.preco.toFixed(2)}</p>
                <p>
                    <strong>Tamanhos disponíveis: </strong>
                    {camiseta.tamanhos.map(tamanho => (
                        <button
                            key={tamanho}
                            disabled={!camiseta.disponiveis.find(item => item.cor === selectedCor)?.tamanhos.includes(tamanho)}
                            onClick={() => handleTamanhoChange(tamanho)}
                            style={{
                                marginRight: '10px',
                                border: '1px solid #ccc',
                                padding: '0 5px',
                                background: tamanho === selectedTamanho && camiseta.disponiveis.find(item => item.cor === selectedCor)?.tamanhos.includes(tamanho) ? '#ccc' : '',
                                color: !camiseta.disponiveis.find(item => item.cor === selectedCor)?.tamanhos.includes(tamanho) ? '#ccc' : 'black'
                            }}
                        >
                            {tamanho}
                        </button>
                    ))}
                </p>
                <p>
                    <strong>Cores disponíveis: </strong>
                    {camiseta.cores.map(cor => (
                        <button
                            key={cor}
                            disabled={!camiseta.disponiveis.find(item => item.cor === cor)?.tamanhos.includes(selectedTamanho)}
                            onClick={() => handleCorChange(cor)}
                            style={{
                                marginRight: '10px',
                                border: '1px solid #ccc',
                                padding: '0 5px',
                                background: cor === selectedCor && camiseta.disponiveis.find(item => item.cor === cor)?.tamanhos.includes(selectedTamanho) ? '#ccc' : '',
                                color: !camiseta.disponiveis.find(item => item.cor === cor)?.tamanhos.includes(selectedTamanho) ? '#ccc' : 'black'
                            }}
                        >
                            {cor}
                        </button>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default CamisetaDetails;
