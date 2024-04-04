import { ICamiseta } from "../interfaces/ICamiseta";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchCamisetas(): Promise<ICamiseta[]> {
  try {
    const res = await fetch(`${baseUrl}/camisetas`);
    
    if (!res.ok) {
      throw new Error('Falha ao buscar camisetas');
    }
    const camisetas: ICamiseta[] = await res.json();
    return camisetas;
  } catch (error) {
    console.error("Erro ao buscar camisetas:", error);
    return [];
  }
}

export async function fetchCamisetaPeloId(id: number): Promise<ICamiseta | null> {
    try {
      const res = await fetch(`${baseUrl}/camisetas?id=${id}`);
      
      if (!res.ok) {
        throw new Error('Falha ao buscar camisetas');
      }
      const camisetas: ICamiseta = await res.json();
      return camisetas;
    } catch (error) {
      console.error("Erro ao buscar camisetas:", error);
      return null;
    }
  }

  export async function fetchAllCamisetaIds(): Promise<number[] | null> {
    try {
        const res = await fetch(`${baseUrl}/camisetas`);

        if (!res.ok) {
            throw new Error('Falha ao buscar camisetas');
        }

        const camisetas: ICamiseta[] = await res.json();

        const ids: number[] = camisetas.map(camiseta => camiseta.id);

        return ids;
    } catch (error) {
        console.error("Erro ao buscar camisetas:", error);
        return null;
    }
}