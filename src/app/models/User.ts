export default interface User {
  id?: number; // Opcional durante el registro
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;        // URL de la imagen (al recibir del backend)
  avatarFile?: File;         // Archivo de imagen (al enviar al backend)
}
