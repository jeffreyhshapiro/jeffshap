export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
}

export type Mode = 'chat' | 'resume' | '3d';
