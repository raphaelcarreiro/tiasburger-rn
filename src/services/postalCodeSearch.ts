import axios, { AxiosResponse } from 'axios';

const baseUrl = 'https://viacep.com.br/ws/';

function getUrl(cep: string) {
  return `${baseUrl}${cep}/json/`;
}

export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: number;
  gia: number;
  erro?: string;
};

function postalCodeSearch(cep: string): Promise<AxiosResponse<ViaCepResponse>> {
  return axios.get(getUrl(cep));
}

export { postalCodeSearch };
