export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id:number;
  name: string;
  user: any;
  token: string;
  avatarUrl?: string; // URL de la imagen del avatar
}
