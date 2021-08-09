import React from 'react'

export default function ProductSelected({productsChosen, handleClick}) {
    return (
        <div className="products-selected">
          <p>Selected products</p>
          <form>
            {productsChosen &&
              productsChosen.map((data) => (
                <div
                  key={data.id}
                  className="selected-item"
                  onClick={(e) => handleClick(data, e)}
                >
                  {data.product}
                </div>
              ))}
          </form>
        </div>
    )
}
