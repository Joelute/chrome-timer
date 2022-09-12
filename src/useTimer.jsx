import { useEffect, useState, useRef } from "react";

export default function useTimer() {

    const AudioRef = useRef(null);

    const [timeData, setTimeData] = useState({
        hour: 0,
        minute: 0,
        second: 0
    })

    const [startTime, setStartTime] = useState({})
    const [isStart, setIsStart] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    

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

    const startPauseTimer = () => {
        if (isStart) {
            setIsRunning(prevState => !prevState)
        } else {
            setStartTime(prevState => timeData)
            setIsRunning(prevState => true)
            setIsStart(prevState => true)
        }
    }

    const cancelTimer = () => {
        AudioRef.current.pause()
        AudioRef.current.currentTime = 0;
        setIsRunning(prevState => false)
        setIsStart(prevState => false)
        setTimeData(prevState => startTime)
    }

    useEffect(() => {
        let counter
        if (isRunning && timeData.second > 0) {
            counter = setTimeout(() => {
            setTimeData(prevState => {
                return ({
                ...prevState,
                second: prevState.second - 1
            })
            })
        }, 1000)
        } else if (isRunning && timeData.minute > 0) {
            counter = setTimeout(() => {
                setTimeData(prevState => {
                return ({
                    ...prevState,
                    second: 59,
                    minute: prevState.minute - 1
                })
            })
            }, 1000)
        } else if (isRunning && timeData.hour > 0) {
            counter = setTimeout(() => {
                setTimeData(prevState => {
                return ({
                    ...prevState,
                    second: 59,
                    minute: 59,
                    hour: prevState.hour - 1
                })
            })
            }, 1000)
        } else if (isRunning) {
            AudioRef.current.volume = .25;
            AudioRef.current.play();
            setIsRunning(prevState => false)
            setIsStart(prevState => false)
            setTimeData(prevState => startTime)
        }
    }, [timeData, isRunning])

    return {AudioRef, timeData, cancelTimer, startPauseTimer, onUpdate}
}
