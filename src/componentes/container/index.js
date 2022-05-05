import React, { Component } from "react"
import "./container.css"
import Loja from "../loja"
import { getData, saveOldShops, getOldShops } from "../../api"
import {
  getItem,
  filterBySoldItems,
  filterByShop,
  filterByOption,
} from "../../store"
import Layout from "../layout"
import Nav from "../nav"
import Filtro from "../filtro"
import { Loading } from "../UI"

const createFilter = (state, type) =>
  [
    { key: ">", action: (data, filter) => filterByShop(data, filter.slice(1)) },
    { key: "default", action: (data, filter) => getItem(data, filter) },
  ]
    .find(({ key }) => type[0] === key || key === "default")
    .action(state, type)

const getFilteredList = (data, filter) => createFilter(data, filter)

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      data: { rows: [] },
      filteredData: [],
      filterText: "",
      sold: false,
      error: false,
    }

    const temp = this.setState.bind(this)
    this.oldStates = []

    this.undo = index => {
      const oldStates = this.oldStates.slice(0, -1)
      const newState =
        index > -1 ? this.oldStates[index] : this.oldStates.slice(-1)[0]
      if (oldStates[0]) temp({ ...newState })
      else return

      this.oldStates = oldStates
    }

    this.setState = (state, cb) => {
      this.oldStates = this.oldStates.concat([this.state])
      return temp(
        {
          ...state,
        },
        cb
      )
    }
  }

  componentDidMount() {
    getData()
      .then(data =>
        !data.message
          ? { isLoading: false, filteredData: data.rows, data: data }
          : { isLoading: false, error: data.message }
      )
      .then(state =>
        this.setState({
          ...this.state,
          ...state,
        })
      )
  }

  handleSearch = text =>
    this.setState({
      ...this.state,
      sold: false,
      filterText: text,
      filteredData: text
        ? getFilteredList(this.state.data.rows, text)
        : this.state.data.rows,
    })

  handleFilter = filter =>
    this.setState({
      ...this.state,
      filteredData: filterByOption(
        this.state.data.rows,
        filter,
        this.state.filterText
      ),
    })

  handleSaveOldShops = () => saveOldShops(this.state.filteredData)

  handRollBack = () => this.undo()

  handleSoldItems = () =>
    this.setState({
      ...this.state,
      filteredData: filterBySoldItems(this.state.data.rows, getOldShops()),
      sold: true,
    })

  Nav = () => (
    <Nav
      onHome={() => this.undo(1)}
      onRollBack={this.handRollBack}
      onSearch={this.handleSearch}
      onSaveOldShops={this.handleSaveOldShops}
      onSoldItems={this.handleSoldItems}
    />
  )

  Lojas = lojas => (
    <div className="loja-container">
      {lojas.map(loja => (
        <Loja
          key={loja.id}
          loja={loja}
          sold={this.state.sold}
          onClick={this.handleSearch}
        />
      ))}
    </div>
  )

  Main = () => (
    <div>
      <Loading error={this.state.error} isLoading={this.state.isLoading}>
        {!this.state.sold && <Filtro onSubmit={this.handleFilter}></Filtro>}
        {this.Lojas(this.state.filteredData.slice(0, 20))}
      </Loading>
    </div>
  )

  render() {
    window.scrollTo(0, 0)
    return (
      <Layout Nav={this.Nav} Main={this.Main} Footer={() => <div> </div>} />
    )
  }
}
