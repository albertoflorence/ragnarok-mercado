import React from 'react'
import './filter.css'
import { Button, ExpansionPanel, Select } from '../UI'

function Filter({ onSubmit }) {
  const [state, setState] = React.useState({
    type: selectTypes[0],
    expand: false
  })
  const { type, expand, ...options } = state
  return (
    <div style={{ textAlign: 'left' }}>
      <Button
        startIcon="tune"
        onClick={() => setState({ ...state, expand: !expand })}
      >
        FILTRO
      </Button>

      <ExpansionPanel expanded={expand}>
        <form
          className="filter-form"
          onSubmit={e => e.preventDefault() || onSubmit(options)}
        >
          <div className="filter-container">
            <Select
              className="filter-select"
              onChange={e => setState({ expand, type: e.target.value })}
            >
              {selectList.map(({ name }) => (
                <option key={name}>{name}</option>
              ))}
            </Select>
            {type &&
              data[type].map((option, i) => (
                <div style={{ width: '8rem' }} key={type + i}>
                  <Select
                    onChange={e =>
                      setState({ ...state, [i]: { key: e.target.value } })
                    }
                  >
                    <option value="">Bônus {i + 1}</option>
                    {option.map(({ name, value }) => (
                      <option key={name} value={value || name}>
                        {name}
                      </option>
                    ))}
                  </Select>
                  <div>
                    {options[i]?.key &&
                      ['min', 'max'].map(e =>
                        option
                          .filter(
                            ({ name, value }) =>
                              (value || name) === options[i].key
                          )
                          .map(
                            ({ max, min }) =>
                              min && (
                                <Select
                                  key={options[i].key + e}
                                  onChange={event =>
                                    setState({
                                      ...state,
                                      [i]: {
                                        ...options[i],
                                        [e]: event.target.value
                                      }
                                    })
                                  }
                                  value={options[i][e]}
                                >
                                  <option value="">{e}</option>
                                  {new Array(max - min + 1)
                                    .fill(0)
                                    .map((z, n) => (
                                      <option key={n + e}>{min + n}</option>
                                    ))}
                                </Select>
                              )
                          )
                      )}
                  </div>
                </div>
              ))}
          </div>
          <Button
            type="submit"
            variant="outlined"
            color="#9a9aff"
            disabled={!Object.keys(options).some(i => options[i]?.key)}
          >
            Pesquisar
          </Button>
        </form>
      </ExpansionPanel>
    </div>
  )
}

export default Filter

const createOptions =
  array =>
  (text, min, max, value = '') =>
    array.map(el => ({
      name: text + el,
      value: value + el,
      min,
      max
    }))

const createRaces = createOptions([
  'Amorfo',
  'Anjo',
  'Bruto',
  'Demônio',
  'Dragão',
  'Human',
  'Inseto',
  'Morto-Vivo',
  'Peixe',
  'Planta'
])

const createElements = createOptions([
  'Água',
  'Vento',
  'Veneno',
  'Terra',
  'Sombrio',
  'Sagrado',
  'Neutro',
  'Morto-Vivo',
  'Fogo',
  'Fantasma'
])

const data = {
  Armaduras: [
    [
      { name: 'AGI', min: 1, max: 3 },
      { name: 'DES', min: 1, max: 3 },
      { name: 'FOR', min: 1, max: 3 },
      { name: 'INT', min: 1, max: 3 },
      { name: 'SOR', min: 1, max: 3 },
      { name: 'VIT', min: 1, max: 3 }
    ],
    [
      { name: 'Recuperação de HP', min: 5, max: 15 },
      { name: 'Recuperação de SP', min: 5, max: 15 }
    ]
  ],
  Escudos: [
    createRaces('Reduz dano de ', 1, 5),
    [{ name: 'DEF', value: 'DEF +', min: 1, max: 5 }]
  ],
  Sapatos: [
    [
      { name: 'Máx. HP', min: 120, max: 360 },
      { name: 'Máx. SP', min: 20, max: 80 }
    ]
  ],
  Capas: [
    createElements('Reduz dano de ', 1, 5, 'Resistência a propriedade '),
    [{ name: 'MDEF', value: 'DEFM', min: 1, max: 5 }]
  ],
  Armas: [
    [
      { name: ' ATQ', min: 10, max: 40 },
      { name: 'Precisão', min: 10, max: 20 }
    ],
    createRaces('Dano em ', 10, 20, 'contra a raça '),
    createRaces('Ignora DEF ', 10, 35, 'DEF de monstros da raça '),
    [
      { name: 'ASPD', min: 1, max: 5, value: 'Velocidade de Ataque' },
      { name: 'Indestrutível' }
    ]
  ],
  Cajados: [
    [{ name: 'MATQ', min: 20, max: 120 }],
    createRaces('Ignora MDEF ', 10, 24, 'MDEF de monstros da raça '),
    [{ name: 'Reduz Cast', value: 'tempo de lançamento', min: 1, max: 12 }],
    [{ name: 'Reg. SP', value: 'Recuperação de SP', min: 6, max: 20 }]
  ],
  'Armas Forjadas': [
    [
      { name: ' ATQ', min: 10, max: 40 },
      { name: 'Precisão', min: 10, max: 20 }
    ],
    createRaces('Dano em ', 10, 20, 'contra a raça '),
    createElements('Dano em ', 10, 20, 'contra a propriedade '),
    [
      { name: 'ASPD', min: 1, max: 5, value: 'Velocidade de Ataque' },
      { name: 'Indestrutível' }
    ]
  ]
}

const selectTypes = Object.keys(data)
const selectList = selectTypes.map(name => ({ name, options: data[name] }))
