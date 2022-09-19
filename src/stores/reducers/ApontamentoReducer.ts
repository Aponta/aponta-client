const ESTADO_INICIAL = {
    apontamentoAtual: {},
    quantidadePagina: 5,
    paginaAtual: 0,
    apontamentoPaginado: [],
    carregando: false
  };
  
  export default function ApontamentoReducer(state = ESTADO_INICIAL, action: any) : any {
    switch (action.type) {
        case "SET_APONTAMENTO_ATUAL":
          return {
            ...state,
            apontamentoAtual: action.apontamentoAtual,
          };
          case "SET_PAGINA_ATUAL":
          return {
            ...state,
            paginaAtual: action.paginaAtual,
          };
          case "GET_APONTAMENTO_PAGINADO":
          return {
            ...state,
            apontamentoPaginado: action.apontamentoPaginado,
          };
        case "CARREGANDO_DADOS":
        return {
          ...state,
          carregando: action.carregando,
        }
        
          default:
          return {
              ...state
        }
    }
}