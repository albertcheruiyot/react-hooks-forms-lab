import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [shoppingItems, setShoppingItems] = useState(items);

  function handleSearchChange(text) {
    setSearchText(text);
  }

  function handleItemFormSubmit(newItem) {
    setShoppingItems([...shoppingItems, newItem]);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  /*const itemsToDisplay = shoppingItems.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });*/
  const itemsToDisplay = shoppingItems.filter((item) => {
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    }
    if (searchText.trim() !== "") {
      // Case-insensitive full match
      if (item.name.toLowerCase() === searchText.toLowerCase()) {
        return true;
      }
      // Case-insensitive partial match
      if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    }
    return true;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} search={searchText}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

