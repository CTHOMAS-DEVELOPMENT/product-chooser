import React from 'react'

export default function ProductList({ products, pageSize, startNumber, handleClick }) {
    return (
        <div className="products-list">
          <p>Products</p>
          <form>
            {
              /*Let's remove those products that have been selected and are in the database*/
              products
                .filter((product, index) => {
                  return (
                    index <= startNumber + pageSize && index >= startNumber
                  );
                })
                .map((product, index) => (
                  <div
                    key={product.id}
                    className="unselected-item"
                    onClick={(e) => handleClick(product, e)}
                  >
                    {product.name}
                  </div>
                ))
            }
          </form>
        </div>

    )
}

