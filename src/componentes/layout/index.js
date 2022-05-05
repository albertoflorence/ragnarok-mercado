import React from "react"
import "./layout.css"

function Layout({ Nav, Main, Footer }) {
  return (
    <div className="wrapper">
      <nav>
        <Nav />
      </nav>
      <main>
        <Main />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
