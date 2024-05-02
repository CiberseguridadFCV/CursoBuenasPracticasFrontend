export interface Solicitud {

  id: number;
  fecha_solicitud?: Date;
  solicitante_area: string;
  solicitante_nombre: string;
  solicitante_cargo: string;
  justificacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  destinatario_nombre: string;
  destinatario_cargo: string;
  destinatario_area: string;
  destinatario_usuario: string;
  aprueba_nombre?: string;
  aprueba_cargo?: string;
  estado?:string;

}
