// Type definitions for correios-brasil
// Project: https://github.com/FinotiLucas/Correios-Brasil/
// Definitions by: Franco Brunetta Pan <https://github.com/francopan>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


    export interface CEPResposta {
        cep: string;
        logradouro: string;
        complemento: string;
        bairro: string;
        localidade: string;
        uf: string;
        ibge: string;
        gia: string;
        ddd: string;
        siafi: string;
    }
    export interface PrecoPrazo {
        sCepOrigem: string;
        sCepDestino: string;
        nVlPeso: string;
        nCdFormato: string;
        nVlComprimento: string;
        nVlAltura: string;
        nVlLargura: string;
        nCdServico: Array<string>;
        nVlDiametro: string;
    }
    export interface PrecoPrazoResposta {
        [name: string]: {
            Codigo: string;
            Valor: string;
            PrazoEntrega: string;
            ValorSemAdicionais: string;
            ValorMaoPropria: string;
            ValorAvisoRecebimento: string;
            ValorDeclarado: string;
            EntregaDomiciliar: string;
            EntregaSabado: string;
            obsFim: string;
            Erro: string;
            MsgErro: string;
        };
    }
    export interface RastreioEncomendaResposta {
        [name: string]: {
            status: string;
            data: string;
            hora: string;
            local: string;
        };
    }
    export interface CorreiosBrasil {
        consultarCep(cep: string): Promise<CEPResposta>;
        calcularPrecoPrazo(
            precoPrazo: PrecoPrazo,
        ): Promise<PrecoPrazoResposta>;
        rastrearEncomendas(
            codRastreio: Array<string>,
        ): Promise<RastreioEncomendaResposta>;
    }

    export const correiosBrasil: CorreiosBrasil;
    

