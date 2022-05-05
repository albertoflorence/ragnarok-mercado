import React from "react"
import "./tooltip.css"

function Tooltip({ children, text }) {
  return (
    <div className="UI-tooltip-container">
      {children}
      <span className="UI-tooltip">{text}</span>
    </div>
  )
}

export default Tooltip
