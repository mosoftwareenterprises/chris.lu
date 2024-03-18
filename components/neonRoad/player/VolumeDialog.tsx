'use client'

import { useState, useRef, useEffect } from 'react'
import type { AnimationEvent, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import styles from './volumeDialog.module.css'

interface IProps extends PropsWithChildren {
    isOpen: boolean
    onOpenCallback?: () => void
    onCloseCallback?: () => void
}

const VolumeDialog: React.FC<IProps> = (props) => {

    const { isOpen, onOpenCallback, onCloseCallback, children } = props

    const [isDialogOpenState, setIsDialogOpenState] = useState(isOpen)
    const [closeAnimationState, setCloseAnimationState] = useState(false)

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const openModal = () => {
        setIsDialogOpenState(true)
        if (typeof onOpenCallback === 'function') {
            onOpenCallback()
        }
    }

    const closeModal = () => {
        if (typeof onCloseCallback === 'function') {
            onCloseCallback()
        }
        setIsDialogOpenState(false)
    }

    const closeHandler = () => {
        closeModal()
    }

    const animationEndHandler = (event: AnimationEvent<HTMLDialogElement>) => {
        if (event.animationName.startsWith('volumeDialog_close')) {
            dialogRef.current?.close()
            setCloseAnimationState(false)
        }
    }

    useEffect(() => {
        if (isOpen === true) {
            openModal()
        } else {
            closeModal()
        }
    }, [isOpen])

    useEffect(() => {
        const dialogElement = dialogRef.current

        if (dialogElement) {
            if (isDialogOpenState) {
                dialogElement.show()
            } else {
                if (dialogElement.hasAttribute('open')) {
                    setCloseAnimationState(true)
                }
            }
        }
    }, [isDialogOpenState])

    return createPortal(
        <dialog
            ref={dialogRef}
            onCancel={closeHandler}
            onAnimationEnd={animationEndHandler}
            className={`${styles.reset} ${styles.dialog} ${closeAnimationState === true ? styles.close : ''}`}
        >
            {children}
        </dialog>,
        document.body
    )
}

export default VolumeDialog