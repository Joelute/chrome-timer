import { useState } from 'react';
import styled from 'styled-components';


function App() {
  const [timeData, setTimeData] = useState({
    hour: 0,
    minute: 0,
    second: 0
  })

  const onUpdate = (event) => {
    const {name, value} = event.target
    const isValid = (name == 'hour' ? checkValidInput(24, value) : checkValidInput(60, value))
    if (!isValid) {
      return
    } else {
      setTimeData(prevState => {
        return {
          ...prevState,
          [name]: value
        }
      })
    }
  }

  const checkValidInput = (maxTime ,value) => {
    return(0 <= value & value <= maxTime? true: false)
  }



  return (
    <Container>
      <Stopwatch>
        <TimeContainer>
          <TimeSelect
            name = 'hour'
            placeholder='0'
            value = {timeData.hour}
            onChange = {(event) => onUpdate(event)}/>
          <TimeName>hours</TimeName>
        </TimeContainer>
        <TimeContainer>
          <TimeSelect 
            name = 'minute'
            placeholder='0'
            value = {timeData.minute}
            onChange = {(event) => onUpdate(event)}/>
          <TimeName>min</TimeName>
        </TimeContainer>
        <TimeContainer>
          <TimeSelect 
            name = 'second'
            placeholder='0'
            value = {timeData.second}
            onChange = {(event) => onUpdate(event)}/> 
          <TimeName>sec</TimeName>
        </TimeContainer>
      </Stopwatch>
      <ButtonContainer>
        <FunctionButton color='252525'><ButtonRing></ButtonRing>Cancel</FunctionButton>
        <FunctionButton color='115700'><ButtonRing></ButtonRing>Start</FunctionButton>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  min-width: 360px;
  min-height: 600px;
  height: 600px;
  text-align: center;
`

const Stopwatch = styled.div`

  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #252525;
  width: 17rem;
  height: 2.5rem;
  margin: 10rem auto;
  
  border-radius: 0.75rem;
`

const TimeContainer = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  height: 2.5rem;
  `

const TimeSelect = styled.input.attrs({ type: 'text', maxlength: '2' })`
  width: 2ch;
  border: none;
  text-align: center;
  margin-right: 0.5rem;
  font-size: 1rem;
  color: #D2D2D2;
`

const TimeName = styled.h3`
  text-align: center;
  font-weight: 400;
  font-size: 1rem;
  color: #FFFFFF;
`

const ButtonContainer = styled.div`
  display:flex;
  height: 18rem;
  justify-content: space-between;
  margin: 0 1.8rem;
`

const FunctionButton = styled.div`
  border-radius: 50%;
  background-color: #${props => props.color};
  width: 5.5rem;
  height: 5.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
`

const ButtonRing = styled.div`
  border: 2px solid #0D0D0D;
  width: 4.9rem;
  height: 4.9rem;
  border-radius: 50%;
  position: fixed;
`

export default App

