import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {

  function handleDeleteClick() {
    fetch(`http://127.0.0.1:4000/items/${item.id}`, {
      method: "DELETE",
    })
    .then(response => response.json())
    .then(() => onDeleteItem(item))
  }

  // Add function to handle button click
  function handleAddToCartClick() {
    fetch(`http://127.0.0.1:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        isInCart: !item.isInCart
      })
    })
    .then(response => response.json())
    .then(updatedItem => onUpdateItem(updatedItem))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}
      onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
