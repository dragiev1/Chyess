export interface User {
  id: number;
  email: string;
  firstName: string,
  lastName: string,
  password: string;  // Just for this project, never store real passwords lol.
  registeredAt: string;
}

export interface LoginAttempt {
  email: string;
  password: string;
  timestamp: string;
}

export interface GameRequest {
  requestedId: number;
  mode: 'singleplayer' | 'multiplayer';
  timeControl: 'bullet' | 'blitz' | 'rapid' | 'classical';
  playerColor: 'white' | 'black' | 'random';
  createdAt: string;
}