import { defineStore } from 'pinia';
import { User } from '../interfaces/IUser';
import usersData from '../constants/data/users.json';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
    }),
    getters: {
        getUser(): User | null {
            return this.user;
        },
    },
    actions: {
        async login(email: string, password: string) {
            // Simulated login
            const users: User[] = usersData;

            const foundUser = users.find(user => user.email === email && user.password === password);
            if (foundUser) {
                this.user = foundUser;
                return true;
            }

            return false;
        },
        logout() {
            this.user = null;
        },
        setLastUser(id: string): boolean {
            const users: User[] = usersData;

            const foundUser = users.find(user => user.id === id);
            if (foundUser) {
                this.user = foundUser;
                return true;
            }

            return false;
        }
    },
});
