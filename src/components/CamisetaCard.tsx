/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ICamiseta } from '../interfaces/ICamiseta';
import Link from 'next/link';

interface CamisetaCardProps {
    camiseta: ICamiseta;
}

const CamisetaCard: React.FC<CamisetaCardProps> = ({ camiseta }) => {
    return (
        <div className='camiseta-card'>
            <Link href={`/camisetas/${camiseta.id}`}>
                <div className="camiseta-card__img" style={{ backgroundImage: `url(${camiseta.imagem[0]})` }} />
            </Link >
            <br />
            <div className='text-left'>
                <h2><strong>{camiseta.nome}</strong></h2>
                <p><strong>Preço: </strong>R$ {camiseta.preco.toFixed(2)}</p>
                <p><strong>Tamanhos:</strong> {camiseta.tamanhos.join(', ')}</p>
                <p><strong>Cores:</strong> {camiseta.cores.join(', ')}</p>
            </div>
        </div>
    );
};

export default CamisetaCard;
