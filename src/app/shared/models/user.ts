export interface User extends FileInt {
  // Persona
  readonly _id: number;
  nome: string;
  numTel: number;
  email: string;
  codFiscale: string;
  indirizzo: string;
  classe: number;
  classePre: number;
  //polizza
  compagnia: string;
  numPolizza: number;
  numSostituta: number;
  frazionamento: string;
  dataEmissione: Date;
  pervenuta: string;
  dataScadenza: Date;
  dataScadenza2: Date;
  importo: number;
  tipoPagamento: string;
  dataPagamento: Date;
  // veicolo
  targa: string;
  modello: string;
  numCilindrata: number;
  numQuintali: number;
  numKw: number;
  // altro
  note: string;
};

export interface FileInt {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: string;
  contentEncoding: string;
  storageClass: string;
  serverSideEncryption: string;
  metadata: string;
  location: string;
  etag: string;
  versionId: string;
};
