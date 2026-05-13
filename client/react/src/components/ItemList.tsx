import { useEffect, useState } from "react";
import type { Item } from "../../../../api/typescript/src/types/item.ts";

function ItemList() {
  const [items, setItems] = useState<Item[]>([]);

  const API_URL = "http://localhost:3000/api/items/";
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((items) => setItems(items));
  }, []);

  return (
    <div>
      <ul>
        {items.map((item: Item) => (
          <li key={item.id}>
            {item.name}: ¥{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
