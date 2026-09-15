import { CelulaSudoku, TabelaSudoku } from "./tipos";


// A Fazer -> MRV
export const calcularPossibilidades = (tabela: TabelaSudoku) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const celula = tabela[i][j];
            if (celula.valor === null) {
                const possibilidades: number[] = [];
                // Verificar numeros de 1 a 9
            }
        }
    }

}

export const maiorGrauDeRestricao = (tabela: TabelaSudoku) => {
    let maiorRestricao = -1;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const celula = tabela[i][j];
            if (celula.valor === null) {
                const restricao = celula.possibilidades ? celula.possibilidades.length : 0;
                if (restricao > maiorRestricao) {
                    maiorRestricao = restricao;
                }
            }
        }
    }
    // Verificar se ha mais de uma celula com o mesmo grau de restrição
    let celulasComMesmoGrau: CelulaSudoku[] = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const celula = tabela[i][j];
            if (celula.valor !== null && maiorRestricao === celula.possibilidades?.length) {
                celulasComMesmoGrau.push(celula);
            }
        }
    }

    //Outra heuristica para desempatar ??
    let celulaPosDesempate = null;

    return celulaPosDesempate;
}