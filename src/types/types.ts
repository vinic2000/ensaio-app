// types.ts
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddEnsaio: undefined;
  GerenciarEnsaio: { id: string };
  GerenciarMusicos: { id: string };
  GerenciarOrganista: { id: string };
  GerenciarMinisterio: { id: string };
  GerenciarEncarregado: { id: string };
  GerenciarVisita: { id: string };
  EditarEnsaio: { id: string };
  Hinos: { id: string };
  Config: undefined;
};