'use client'

import { useState, useCallback } from 'react'
import Image, { ImageProps } from 'next/image'
import dynamic from 'next/dynamic'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './withdialog.module.css'

const UIModal = dynamic(() => import('@/components/ui/modal'), { ssr: false })

const BaseImage: React.FC<ImageProps> = (props): JSX.Element => {

    const [imageDialogIsOpenState, setImageDialogIsOpenState] = useState(false)

    const withOpenButton = false

    const imageButtonClickHandler = () => {
        setImageDialogIsOpenState(true)
    }

    const closeDialogCallback = useCallback(() => {
        setImageDialogIsOpenState(false)
    }, [imageDialogIsOpenState])

    // @ts-expect-error: because the library definition is wrong
    const modalWidth = props.src?.width
    // @ts-expect-error: because the library definition is wrong
    const modalHeight = props.src?.height

    return (
        <>
            <button onClick={imageButtonClickHandler} className={`${styles.openButton}  ${styles.buttonCursor} ${styles.buttonReset}`}>
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 15vw"
                    placeholder="blur"
                    {...(props as ImageProps)}
                />
                {withOpenButton && (
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" color='white' className={`${styles.iconPositioning}  ${styles.icon}`} />
                )}
            </button>
            <UIModal isOpen={imageDialogIsOpenState} onCloseCallback={closeDialogCallback} hasCloseButton={false} width={modalWidth} height={modalHeight}>
                <Image
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: 'auto',
                        maxHeight: '100%',
                    }}
                    placeholder="blur"
                    {...(props as ImageProps)}
                />
            </UIModal>
        </>
    )
}

export default BaseImage