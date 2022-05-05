import React from "react"
import "./loja.css"
import Item from "../item"

function Loja({ loja, sold, onClick }) {
  const { char_name, items, shop_name, mapname } = loja

  return (
    <div className="loja">
      <div>
        <div className="loja-vendedor">{char_name}</div>
        {shop_name}
        <div className="loja-local">{mapname}</div>
      </div>
      <div className="loja-items">
        {items.map((item, i) => (
          <Item key={char_name + i} item={item} sold={sold} onClick={onClick} />
        ))}
      </div>
    </div>
  )
}
export default Loja
