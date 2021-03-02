import React from 'react'
import cn from 'classnames'
import { card } from './Card.module.css'

const Card = ({ className, ...rest }) => {
  return <article className={cn(card, className)} {...rest} />
}

export default Card
