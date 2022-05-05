import React, { useState } from "react"
import "./search.css"

function Search({ onSubmit, className }) {
  const [text, setText] = useState("")
  return (
    <form
      className={className + " search"}
      onSubmit={e => e.preventDefault() || onSubmit(text)}
    >
      <input
        placeholder="Pesquisar"
        className="search-input"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="material-icons search-button">
        search
      </button>
    </form>
  )
}

export default Search
