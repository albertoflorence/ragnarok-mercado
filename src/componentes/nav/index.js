import React from "react"
import "./nav.css"
import Search from "./search"
import { Button, Tooltip } from "../UI"

function Nav({ onRollBack, onSearch, onSaveOldShops, onSoldItems, onHome }) {
  return (
    <div className="nav">
      <div className="nav-left">
        <Tooltip text="Início">
          <Button icon className="nav-home" onClick={onHome}>
            home
          </Button>
        </Tooltip>
        <Button icon className="nav-rollback" onClick={onRollBack}>
          arrow_back
        </Button>
      </div>
      <Search icon className="nav-search" onSubmit={onSearch} />
      <div className="nav-right">
        <Tooltip text="Salvar Lojas">
          <Button icon onClick={onSaveOldShops}>
            save
          </Button>
        </Tooltip>
        <Tooltip text="Itens Vendidos">
          <Button icon onClick={onSoldItems}>
            local_atm
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default Nav
