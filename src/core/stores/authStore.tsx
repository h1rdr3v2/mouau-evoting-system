import {create} from 'zustand'

interface AuthStore {
    loggedIn: Boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
    loggedIn: false,
}))
