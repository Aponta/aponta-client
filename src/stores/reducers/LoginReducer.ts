const ESTADO_INICIAL = {
    usuarioLogado: {}
  };
  
  export default function backEnd(state = ESTADO_INICIAL, action: any) : any {
    switch (action.type) {
        case "SET_USUARIO_LOGADO":
          return {
            ...state,
            usuarioLogado: action.usuarioLogado,
          };
          default:
          return {
              ...state
          }
    }
  }
  