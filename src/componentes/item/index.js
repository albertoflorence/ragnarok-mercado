import React from 'react'
import './item.css'

function Item({ item, sold, onClick }) {
  const { price, name, nameid, amount, options, amountSold } = item

  const replaceBulk = (string, replaces) =>
    replaces.reduce((str, { find, replace }) => str.replace(find, replace), string)
  const replaces = [
    { find: 'de monstros da raça', replace: 'contra' },
    { find: 'Físico contra a raça', replace: 'em' },
    { find: 'físico contra a propriedade', replace: 'em' },
    { find: 'Velocidade de Ataque', replace: 'ASPD' },
    { find: 'tempo de lançamento', replace: 'cast time' },
    { find: 'Recuperação', replace: 'Rec.' },
    { find: 'Resistência a propriedade', replace: 'Reduz' },
    { find: 'Indestrutível em batalha', replace: 'Indestrutível' },
    { find: 'causado por monstros da raça', replace: 'em' },
    { find: 'Cura de Habilidades em', replace: 'Cura' },
    { find: 'Taxa de Ataques Críticos', replace: 'Crítico' }
  ]

  const priceColor = price =>
    'rgb(' +
    ['255, 0, 255', '180, 180, 255', '0, 255, 0', '255, 0, 0', '153, 44, 45'].find(
      (e, i) => price.toString().length - 6 < i
    ) +
    ')'

  const getImageLink = id => `https://static.ragnaplace.com/bro/item/${id}.png`

  return (
    <div className={amountSold > 0 ? 'item-sold item' : 'item'}>
      <img className="item-img" alt={name} src={getImageLink(nameid)} />

      <div onClick={() => onClick(nameid)} className="item-name">
        {name}
      </div>
      <div className="item-options">{replaceBulk(options.join(' - '), replaces)}</div>
      <div className="item-price">
        {amountSold > 1 && (
          <span style={{ color: priceColor(price * amountSold) }}>
            ({Intl.NumberFormat('de-DE').format(price * amountSold)}z){' '}
          </span>
        )}
        <span style={{ color: priceColor(price) }}>
          {Intl.NumberFormat('de-DE').format(price)}z
        </span>
      </div>
      <div className="item-amount">
        {sold ? `[${amountSold}/${amount - amountSold}]` : amount + 'x'}
      </div>
    </div>
  )
}

export default Item
