export interface GameRequest {
  id?: number;              // Auto-generated PK
  requesterId: number;      // FK to User.userId
  mode: 'singleplayer' | 'multiplayer';
  timeControl: 'bullet' | 'blitz' | 'rapid' | 'classical';
  playerColor: 'white' | 'black' | 'random';
  status: 'pending' | 'matched' | 'cancelled' | 'expired'; // Added for lifecycle
  createdAt: string;
  matchedAt?: string;
  opponentId?: number;
}

export interface Game {
  id?: number;
  whitePlayerId: number;
  blackPlayerId: number;
  timeControl: 'bullet' | 'blitz' | 'rapid' | 'classical';
  status: 'pending' | 'in-progress' | 'completed' | 'aborted';
  winnerId?: number | null;
  pgn?: string;             // Optional: store game moves
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
}