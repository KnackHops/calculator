import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    curOutput: []
}

const numbersGetter = curOutput => {
    const _prevNumber = curOutput[ curOutput.length - 3 ]
    const _nextNumber = curOutput[ curOutput.length - 1 ]
    return [ Number( _prevNumber ), Number( _nextNumber )  ]
}

export const numberSlice = createSlice( {
    name: "number",
    initialState,
    reducers: {
        addition: ( state, action ) => {
            let firstNum = "";
            let secondNum = "";

            if ( action.payload ) state.curOutput.push( action.payload );

            [ firstNum, secondNum ] = numbersGetter( state.curOutput )

            state.curOutput.push( firstNum + secondNum )
        },
        subtraction: ( state, action ) => {
            let firstNum = "";
            let secondNum = "";

            if ( action.payload ) state.curOutput.push( action.payload );
            
            [ firstNum, secondNum ] = numbersGetter( state.curOutput )

            state.curOutput.push( firstNum - secondNum )
        },
        multiplication: ( state, action ) => {
            let firstNum = "";
            let secondNum = "";

            if ( action.payload ) state.curOutput.push( action.payload );
            
            [ firstNum, secondNum ] = numbersGetter( state.curOutput )

            state.curOutput.push( firstNum * secondNum )
        },
        division: ( state, action ) => {
            let firstNum = "";
            let secondNum = "";

            if ( action.payload ) state.curOutput.push( action.payload );
            
            [ firstNum, secondNum ] = numbersGetter( state.curOutput )

            state.curOutput.push( firstNum / secondNum )
        },
        exponentiate: ( state ) => {
            const lastNum = state.curOutput[ state.curOutput.length - 2 ];
            state.curOutput.push( lastNum * lastNum )
        },
        addOutput: ( state, action ) => {
            state.curOutput.push( action.payload )
        },
        clearOutput: ( state ) => {
            state.curOutput = []
        }
    }
} )

export const { addition, subtraction, multiplication, division, exponentiate, addOutput, clearOutput } = numberSlice.actions

export default numberSlice.reducer