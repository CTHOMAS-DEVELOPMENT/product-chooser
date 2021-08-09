import React from 'react'

 const Button=({ handler, arrow }) =>{
  return <button onClick={(e) => handler(e)}>{arrow}</button>;
}

export default Button;
