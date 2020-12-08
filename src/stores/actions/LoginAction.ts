export function SetUsuarioLogado(usuarioLogado : any) {
    return {
      type: "SET_USUARIO_LOGADO",
      usuarioLogado,
    };
  }