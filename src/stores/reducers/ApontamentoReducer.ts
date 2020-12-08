const ESTADO_INICIAL = {
    apontamentoAtual: {}
  };
  
  export default function ApontamentoReducer(state = ESTADO_INICIAL, action: any) : any {
    switch (action.type) {
        case "SET_APONTAMENTO_ATUAL":
          return {
            ...state,
            apontamentoAtual: action.apontamentoAtual,
          };
          default:
          return {
              ...state
        }
    }
}