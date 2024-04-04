export interface ICamiseta {
    id: number;
    nome: string;
    preco: number;
    tamanhos: string[];
    cores: string[];
    imagem: string[];
    disponiveis: IDisponivel[]
  }

  export interface IDisponivel {
    tamanhos : string[];
    cor: string;
  }