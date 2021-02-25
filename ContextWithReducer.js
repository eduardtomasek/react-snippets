import React, { useReducer, useContext } from 'react'

const MyContext = React.createContext()

const Reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            }
        default:
            return state
    }
}

const MyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, { counter: 0 })

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    )
}

const GlobalCounter = () => {
    const { state, dispatch } = useContext(MyContext)

    function increment () {
        dispatch({ type: 'INCREMENT' })
    }

    function decrement () {
        dispatch({ type: 'DECREMENT' })
    }

    return (
        <div>
            <span>{state.counter}</span>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}

function App () {
    return (
        <MyProvider>
            <GlobalCounter />
        </MyProvider>
    )
}

export default App
