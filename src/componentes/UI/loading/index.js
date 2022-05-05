import React from "react"
import "./loading.css"

function Loading({ isLoading, error, children }) {
  return isLoading ? <div className="UI-loading"></div> : error || children
}

export default Loading
