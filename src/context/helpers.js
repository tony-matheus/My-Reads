export const _moveItem = (state, payload) => {
  const { book, shelf } = payload
  const oldShelf = book.shelf
  return {
    ...state.bookList,
    [oldShelf]: state.bookList[oldShelf].filter((b) => book.id !== b.id),
    [shelf]: [...state.bookList[shelf], book],
  }
}

export const _removeItem = (state, payload) => {
  const { book, shelf } = payload
  const newBookList = state.bookList[shelf].filter((b) => book.id !== b.id)

  return { ...state.bookList, [shelf]: newBookList }
}

export const _addItem = (state, payload) => {
  const { book, shelf } = payload
  return { ...state.bookList, [shelf]: [...state.bookList[shelf], book] }
}
