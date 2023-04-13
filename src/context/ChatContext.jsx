import { createContext, useState, useContext, useReducer } from 'react'
import { AuthContext } from './AuthContext'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  const initialState = {
    chatID: 'null',
    user: {}
  }

  const chatReducer = (state, action) => {
    if (action.type === 'CHANGE_USER') {
      return {
        user: action.payload,
        chatID:
          currentUser.uid > action.payload.uid
            ? currentUser.uid + action.payload.uid
            : action.payload.uid + currentUser.uid
      }
    }

    return state
  }

  const [state, dispatch] = useReducer(chatReducer, initialState)

  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>
}
