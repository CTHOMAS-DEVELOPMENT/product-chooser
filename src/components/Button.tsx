import React from 'react'

 const Button=({ handler, arrow }) : JSX.Element => {
  return <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handler(e)}>{arrow}</button>;
}

export default Button;
