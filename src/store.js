export const initialStore = () => ({
  message: null,
  favorites: [],
  entities: {},
  todos: [
    { id: 1, title: "Make the bed", background: null },
    { id: 2, title: "Do my homework", background: null }
  ],
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "ADD_FAVORITE":
      const exists = store.favorites.some(
        fav => fav.uid === action.payload.uid && fav.type === action.payload.type
      );
      if (exists) return store;
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case "REMOVE_FAVORITE":
      return {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
        )
      };

    case "SET_ENTITIES":
      return {
        ...store,
        entities: {
          ...store.entities,
          ...action.payload
        }
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map(todo => (todo.id === id ? { ...todo, background: color } : todo)),
      };

    default:
      throw Error("Unknown action.");
  }
}




