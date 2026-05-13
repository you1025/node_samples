import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ItemList from "./components/ItemList.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ItemList />
    </StrictMode>,
  );
}
