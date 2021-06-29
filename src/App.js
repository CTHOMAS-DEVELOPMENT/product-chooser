import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./data/connect";

function App() {
  const APIurl = "https://api.punkapi.com/v2/beers";
  const [products, setProducts] = useState([]);
  const [startNumber, setStartNumber] = useState(0);
  const [endNumber, setEndNumber] = useState(1);
  const [productsChosen, setProductsChosen] = useState([]);
  const [productName, setProductName] = useState(
    "Click any beer product to find out about it"
  );
  const [productDescription, setProductDescription] = useState([""]);
  const [productAbv, setProductAbv] = useState([""]);
  const PAGE_SIZE = 10; //User interface to include items per page (PAGE_SIZE)

  useEffect(() => {
    let selectedBeers, beerList;
    fetch(APIurl)
      .then((res) => res.json())
      .then((data) => {
        beerList = data;
      })
      .then(() => {
        db.collection("selected-products").onSnapshot((snapshot) => {
          selectedBeers = snapshot.docs.map((doc) => {
            let document = doc.data();
            document.SysId = doc.id;
            return document;
          });
          //Go through beer list is there a matching id in selectedbeers?
          setEndNumber(beerList.length);
          let result = beerList.filter(
            (o1) => !selectedBeers.some((o2) => o1.id === o2.id)
          );
          setProducts(result);
          setProductsChosen(selectedBeers);
        });
      });
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    startNumber >= PAGE_SIZE && setStartNumber(startNumber - PAGE_SIZE);
  };
  const handleForward = (e) => {
    e.preventDefault();
    startNumber <= endNumber - PAGE_SIZE &&
      setStartNumber(startNumber + PAGE_SIZE);
  };

  const handleClick = (selection, e) => {
    e.preventDefault();
    if (selection.product) {
      //Removes the item from the list in the database
      db.collection("selected-products").doc(selection.SysId).delete();
      //productName
      setProductName(`Name: ${selection.product}`);
    } else {
      //Adds the item to the database
      db.collection("selected-products").add({
        id: selection.id,
        product: selection.name,
        description: selection.description,
        abv: selection.abv,
      });
      //productName
      setProductName(`Name: ${selection.name}`);
    }

    //productDescription
    setProductDescription(`Description: ${selection.description}`);
    //productAbv
    setProductAbv(`Abv: ${selection.abv}`);
  };
  return (
    <div className="app">
      <div className="group-buttons">
        <form>
          <button type="submit" onClick={(e) => handleBack(e)}>
            {"<"}
          </button>
          <span>{startNumber}</span>
          <button type="submit" onClick={(e) => handleForward(e)}>
            {">"}
          </button>
        </form>
      </div>
      <div className="app-header">
        <div className="products-list">
          <p>Products</p>
          <form>
            {
              /*Let's remove those products that have been selected and are in the database*/
              products
                .filter((product, index) => {
                  return (
                    index <= startNumber + PAGE_SIZE && index >= startNumber
                  );
                })
                .map((product, index) => (
                  <div
                    key={product.id}
                    className="unselected-item"
                    onClick={(e) => handleClick(product, e)}
                  >
                    {product.name + " " + index}
                  </div>
                ))
            }
          </form>
        </div>

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
      </div>
      <div className="product-information">
        <div>{productName}</div>
        <div>{productDescription}</div>
        <div>{productAbv}</div>
      </div>
    </div>
  );
}

export default App;
