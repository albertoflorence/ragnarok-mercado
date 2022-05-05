import React from "react"
import "./select.css"

function Select({ children, className, style, ...props }) {
  const classes = ["UI-select"]
  style = { ...style }

  classes.push(className)

  return (
    <div>
      <select {...props} className={classes.join(" ")} style={style}>
        {children}
      </select>
    </div>
  )
}

export default Select
