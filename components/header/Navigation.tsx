'use client'

import { useState, useCallback } from 'react'
import styles from './navigation.module.css'
import Link from 'next/link'
import useClickOutside, { TypeCallback } from '../../hooks/useClickOutside'
import { useRouter, usePathname } from 'next/navigation'
import { useSwipeable } from 'react-swipeable'

interface IMainMenuItem {
    href: string
    text: string
}

const HeaderNavigation: React.FC = () => {

    const [navigationIsOpenState, setNavigationIsOpenState] = useState<null | boolean>(null)

    const router = useRouter()
    const currentPagePathname = usePathname()

    // on click on the hamburger toggle navigation open/close
    const onClickHamburgerHandler = () => {
        setNavigationIsOpenState((previousState) => {
            return previousState === (null || true) ? false : true
        })
    }

    // on click outside of the navigation (mobile) close it
    const onClickOutsideHandler = useCallback<TypeCallback>(() => {
        if (navigationIsOpenState === true) {
            setNavigationIsOpenState(false)
        }
    }, [navigationIsOpenState])

    const layoutNavbarContainerRef = useClickOutside(onClickOutsideHandler)

    // on click on a link close navigation too
    const onClickLinkHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setNavigationIsOpenState(false)
        router.push(event.currentTarget.href)
    }

    // on swipe up (when over the navigation) close the navigation
    const swipeableConfiguration = {
        // prevents scroll during swipe
        preventScrollOnSwipe: true,
    }

    const swipeHandlers = useSwipeable({
        onSwipedUp: () => {
            setNavigationIsOpenState(false)
        },
        ...swipeableConfiguration,
    })

    // https://github.com/FormidableLabs/react-swipeable/issues/189#issuecomment-656302682
    const swipeableRefPassthrough = (element: HTMLDivElement) => {
        // call useSwipeables ref prop with el    
        swipeHandlers.ref(element)
        // set the el to a ref you can access yourself
        layoutNavbarContainerRef.current = element
    }

    const mainMenuItems: IMainMenuItem[] = [
        { href: '/', text: 'Home' },
        { href: '/web_development', text: 'Web development' },
        { href: '/lego', text: 'Lego' },
        /*{ href: '/music', text: 'Music' },
        { href: '/games', text: 'Games' },
        { href: '/cooking', text: 'Cooking' },
        { href: '/movies_and_tv_shows', text: 'Movies & TV shows' },
        { href: '/memes', text: 'Memes' },*/
        { href: '/about_me', text: 'About Me' },
    ]

    return (
        <>
            <button type="button" aria-label="open global navigation menu" className={`${styles.hamburger} ${styles.emphatic} ${navigationIsOpenState ? styles.active : ''}`} onClick={onClickHamburgerHandler}>
                <span className={styles.hamburgerBox}>
                    <span className={styles.hamburgerInner}></span>
                </span>
            </button>
            <div className={`${styles.layoutNavbarContainer} ${navigationIsOpenState === null ? '' : (navigationIsOpenState ? styles.openNavbar : styles.closeNavbar)}`} {...swipeHandlers} ref={swipeableRefPassthrough}>
                <nav id="navigation" className={`${styles.layoutNavbar}`} >
                    {mainMenuItems.map((mainMenuItem) => {
                        let isActiveClass = ''
                        if (typeof window !== 'undefined') {
                            const linkPathname = new URL(mainMenuItem.href, window.location.href).pathname
                            if (linkPathname === currentPagePathname) {
                                isActiveClass = styles.active
                            }
                        }
                        return (
                            <Link
                                href={mainMenuItem.href}
                                key={mainMenuItem.href}
                                onClick={onClickLinkHandler}
                                className={isActiveClass}
                            >
                                {mainMenuItem.text}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}

export default HeaderNavigation