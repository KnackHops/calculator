import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { addition, addOutput, clearOutput, division, exponentiate, multiplication, subtraction } from './features/numberSlice';

const btns = [
  "", "CLEAR", "DEL", "/",
  "7", "8", "9", "x",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "x^2", "0", ".", "="
]

function App() {
  const dispatch = useDispatch();

  const [ curInput, setInput ] = useState( "" )
  const { curOutput } = useSelector( state => state.number )

  const btnHandler = funcText => {
    if ( funcText === "=" ) enterHandler()
    else if ( funcText === "clear" ) dispatch( clearOutput() )
    else if ( !isNaN( funcText ) || funcText === "." ) setInput( curInput + funcText )
    else if ( funcText === "del" ) {
      if ( curInput.length === 1 ) setInput( "" )
      else setInput( curInput.slice( 0, curInput.length - 1 ) )
    } else enterHandler( funcText ) 
  }

  const inputHandler = val => {
    if ( !curInput && val === "0" ) return

    if( isNaN( val ) ) return
    
    setInput( val )
  }

  const enterHandler = ( val = null ) => {
    if ( !curInput && !val ) return

    if ( val ) {
      // checks if we have an input
      // we will operate on the input instead of the last output if that's the case
      if ( !curInput ) {
        // no input
        // so we check the output
        if ( curOutput.length ) {
          // check if the last value passed on the output is a number
          // if not we just return
          if ( isNaN( curOutput[ curOutput.length - 1 ] ) ) return 
        } else return
      } else {
        if ( isNaN( curInput ) ) return

        const lastItem = curOutput[ curOutput.length - 1 ]

        if ( lastItem === "+" ) dispatch( addition( curInput ) )
        else if ( lastItem === "-" ) dispatch( subtraction( curInput ) )
        else if ( lastItem === "x" ) dispatch( multiplication( curInput ) )
        else if ( lastItem === "/" ) dispatch( division( curInput ) )
        else dispatch( addOutput( curInput ) )
        
      }

      dispatch( addOutput( val ) )

    } else dispatch( addOutput( curInput ) )
    setInput("")
  }

  const outputHandler = () => {
    const lastItem = curOutput[ curOutput.length - 1 ]
    if ( lastItem === "x^2" ) dispatch( exponentiate() )

    const secondToTheLastOutput = curOutput[ curOutput.length - 2 ];

    if ( secondToTheLastOutput === "+" ) dispatch( addition() )
    if ( secondToTheLastOutput === "-" ) dispatch( subtraction() )
    if ( secondToTheLastOutput === "x" ) dispatch( multiplication() )
    if ( secondToTheLastOutput === "/" ) dispatch( division() )
  }

  useEffect( () => {
    outputHandler();
  }, [ curOutput ] )

  return (
    <div className="App">
      <div className='cal-con fd'>
        <div className='cal-inside fd'>
          <div className='inp-out-con fd'>
            <p className='output'>
              {
                curOutput?.length > 0 ? 
                curOutput.map( ( val, i ) => <span key={ i }> { val } </span> )
                : 0
              }
            </p>
            <input type={"text"} placeholder="0" aria-label='calculator input' value={ curInput } onChange={ e => inputHandler( e.target.value ) } />
          </div>
          <ul className='btns-con fd gd'>
            {
              btns.map( ( btnText, i ) => {
                return <li key={ i }>
                  <button onClick={ () => btnHandler( btnText ) }>
                    {
                      btnText
                    }
                  </button>
                </li>
              } )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
