import React from "react"
import "./expansionPanel.css"

function ExpansionPanel({ children, expanded }) {
  const classes = ["UI-expansionPanel"]
  expanded && classes.push("open")

  return <div className={classes.join(" ")}>{children}</div>
}

export default ExpansionPanel
