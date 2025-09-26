export interface Mensaje {
  texto: string;
  duracion: number;
  tipo: 'success' | 'danger' | 'warning' | 'info';
  visible: boolean;
}