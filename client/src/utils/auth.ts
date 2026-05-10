import type { User } from "../types/user";

export const auth = {
  login: (user: User) => {
    const {password, ...safeUser} = user;
    localStorage.setItem('currentUser', JSON.stringify(safeUser))
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login.html';
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    return !!auth.getCurrentUser();
  }
}