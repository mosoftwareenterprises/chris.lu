'use client'

import { useState } from 'react'
import styles from './box.module.css'

interface IProps {
    clickPlayCallback: (playMusic: boolean) => void
}

const PlayBox: React.FC<IProps> = (props) => {

    const [withSoundState, setWidthSoundState] = useState(true)

    const withMusicClickHandler = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {
        //console.log(event)
        setWidthSoundState(true)
    }

    const withMusicKeyPressHandler = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        //console.log(event)
        if (event.code === '13') {
            setWidthSoundState(true)
        }
    }

    const withoutMusicClickHandler = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {
        //console.log(event)
        setWidthSoundState(false)
    }

    const withoutMusicKeyPressHandler = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        //console.log(event)
        if (event.code === '13') {
            setWidthSoundState(false)
        }
    }

    const pressStartClickHandler = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {
        //console.log(event)
        const { clickPlayCallback } = props
        clickPlayCallback(withSoundState)
    }

    const pressStartKeyPressHandler = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        //console.log(event)
        if (event.code === '13') {
            const { clickPlayCallback } = props
            clickPlayCallback(withSoundState)
        }
    }

    return (
        <>
            <div className={styles.playContainer}>
                <div className={styles.playBox}>
                <button
                        onClick={withMusicClickHandler}
                        onKeyDown={withMusicKeyPressHandler}
                        className={styles.withMusicButton}
                    >
                        <span className={`${styles.withMusic} ${withSoundState ? styles.selected : styles.notSelected}`}>Music ON</span>
                    </button>
                    <button
                        onClick={withoutMusicClickHandler}
                        onKeyDown={withoutMusicKeyPressHandler}
                        className={styles.withoutMusicButton}
                    >
                        <span className={`${styles.withoutMusic} ${!withSoundState ? styles.selected : styles.notSelected}`}>Music OFF</span>
                    </button>
                    <button
                        onClick={pressStartClickHandler}
                        onKeyDown={pressStartKeyPressHandler}
                        className={styles.playButton}
                    >
                        <span className={`${styles.pressStart} ${styles.blink}`}>press start</span>
                    </button>
                </div>
            </div >
        </>
    )
}

export default PlayBox