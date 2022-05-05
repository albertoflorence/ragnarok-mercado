import React from "react"
import "./button.css"

function button({
  variant,
  icon,
  color = "inherit",
  startIcon,
  endIcon,
  children,
  className,
  style,
  ...props
}) {
  const classes = ["UI-button"]
  style = { ...style, color }

  if (icon) classes.push("material-icons")
  if (variant) classes.push(variant)

  classes.push(className)

  const Icon = ({ children }) => (
    <span className="material-icons">{children}</span>
  )

  return (
    <div>
      <button {...props} className={classes.join(" ")} style={style}>
        {startIcon && <Icon>{startIcon}</Icon>}
        {children}
        {endIcon && <Icon>{endIcon}</Icon>}
      </button>
    </div>
  )
}

export default button
