// https://codeburst.io/global-state-with-react-hooks-and-context-api-87019cc4f2cf
// https://www.youtube.com/watch?v=CDGBTjMBJzg
// https://www.youtube.com/watch?v=PjsGz6sNG3g

import React, { useReducer, useContext } from 'react'
import produce from 'immer'

const MyContext = React.createContext()

const Reducer = (draft, action) => {
    switch (action.type) {
        case 'INCREMENT':
            draft.globalCounter.counter = draft.globalCounter.counter + 1
            return
        case 'DECREMENT':
            draft.globalCounter.counter = draft.globalCounter.counter - 1
            return
        default:
            return draft
    }
}

const curriedReducer = produce(Reducer)

const MyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(curriedReducer, { globalCounter: { counter: 0 } })

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
            <span>{state.globalCounter.counter}</span>
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
