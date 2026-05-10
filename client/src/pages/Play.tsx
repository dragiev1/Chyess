import { auth } from '../utils/auth';
import type { GameRequest } from '../types/game';

document.getElementById('createRequestForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const user = auth.getCurrentUser();
  if (!user) return alert('Please log in first');

  const formData = {
    requesterId: user.id,
    mode: (document.getElementById('mode') as HTMLSelectElement).value as GameRequest['mode'],
    timeControl: (document.getElementById('timeControl') as HTMLSelectElement).value as GameRequest['timeControl'],
    playerColor: (document.getElementById('playerColor') as HTMLSelectElement).value as GameRequest['playerColor']
  };

  try {
    const response = await fetch('http://localhost:3500/game-requests/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    window.location.reload();
    
  } catch (err) {
    alert('Failed to create request: ' + err);
  }
});

const Play = () => {
  return (
    <>Play</>
  );
};

export default Play;