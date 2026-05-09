import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ItemList from "./components/ItemList.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ItemList />
  </StrictMode>,
)
