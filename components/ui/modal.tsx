'use client'

import { useRef, useEffect, useState } from 'react'
import type { AnimationEvent } from 'react'
import { createPortal } from 'react-dom'
import type { PropsWithChildren } from 'react'
import ButtonWithIcon from '../base/button/WithIcon'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import styles from './modal.module.css'
import type { ImageProps } from 'next/image'

export interface IUIModalProps extends PropsWithChildren {
    isOpen: boolean;
    hasCloseButton?: boolean
    onCloseCallback?: () => void
    imageProps: ImageProps
}

const UIModal: React.FC<IUIModalProps> = (props): JSX.Element => {

    const { isOpen, hasCloseButton, onCloseCallback, children } = props

    const [isModalOpenState, setIsModalOpenState] = useState(isOpen)
    const [closeAnimationState, setCloseAnimationState] = useState(false)

    const modalRef = useRef<HTMLDialogElement | null>(null)

    let withCloseButton = true

    if (hasCloseButton === false) {
        withCloseButton = false
    }

    const closeModal = () => {
        if (typeof onCloseCallback === 'function') {
            onCloseCallback()
        }
        setIsModalOpenState(false)
    }

    const closeHandler = () => {
        closeModal()
    }

    const animationEndHandler = (event: AnimationEvent<HTMLDialogElement>) => {
        if (event.animationName.startsWith('modal_closeAnimation')) {
            modalRef.current?.close()
            setCloseAnimationState(false)
        }
    }

    useEffect(() => {
        setIsModalOpenState(isOpen)
    }, [isOpen])

    useEffect(() => {
        const modalElement = modalRef.current

        if (modalElement) {
            if (isModalOpenState) {
                modalElement.showModal()
            } else {
                if (modalElement.hasAttribute('open')) {
                    setCloseAnimationState(true)
                }
            }
        }
    }, [isModalOpenState])

    return createPortal(
        <dialog
            ref={modalRef}
            onCancel={closeHandler}
            onAnimationEnd={animationEndHandler}
            className={`${styles.modal} ${closeAnimationState === true ? styles.hide : ''}`}
            style={{
                // @ts-expect-error: because the library definition is wrong
                width: props.imageProps.src?.width,
                // @ts-expect-error: because the library definition is wrong
                height: props.imageProps.src?.height,
            }}
        >
            <div className={styles.modalCore} onClick={closeHandler}>
                {withCloseButton && (
                    <ButtonWithIcon clickCallback={closeHandler} whichIcon={faClose} />
                )}
                {children}
            </div>
        </dialog>,
        document.body
    )
}

export default UIModal