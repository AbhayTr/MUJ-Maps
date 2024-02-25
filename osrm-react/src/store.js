import { create } from "zustand"

const useStateStore = create((set) => ({
	count: 1,
	inc: () => set((state) => ({ count: state.count + 1 })),
	location: {
		loaded: false,
		coordinates: { lat: "", lng: "" },
	},
	setLocation: (location) => set({ location }),
	searchResults: [],
	setSearchResults: (searchResults) => set({ searchResults }),
}))

export default useStateStore
