import React from 'react'
import styled from 'styled-components'

export default function Scorecard(props) {

    const { numCorrectAnswers } = props

    return (
        <Card>️️🗑️{ numCorrectAnswers }</Card>
    )
}

const Card = styled.div`
    font-size: 2em;
    color: #ff1919;
    position: fixed;
    bottom: 1%;
    right 1%;
`
