import NeonRoadContainer from '../components/neonRoad/Container'
import './global.css'
import styles from './layout.module.css'
import { Permanent_Marker, VT323, Architects_Daughter } from 'next/font/google'
import HeaderNavigation from '../components/header/Navigation'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
// disable the fontawesome feature which adds a style tag with the css inside to a page
// this is not needed as we also import the css into our project and next.js will bundle it
config.autoAddCss = false

const permanentMarkerFont = Permanent_Marker({
    subsets: ['latin'],
    variable: '--font-permanentMarker',
    weight: ['400'],
    display: 'swap',
})

const vt323 = VT323({
    subsets: ['latin'],
    variable: '--font-vt323',
    weight: ['400'],
    display: 'swap',
})

const architectsDaughter = Architects_Daughter({
    subsets: ['latin'],
    variable: '--font-architectsDaughter',
    weight: ['400'],
    display: 'swap',
})

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en" className={`${permanentMarkerFont.variable} ${vt323.variable} ${architectsDaughter.variable}`}>
            <head />
            <body>
                <header className={styles.layoutHeader}>
                    <HeaderNavigation />
                    <NeonRoadContainer />
                </header>
                <main>{children}</main>
                <footer></footer>
            </body>
        </html>
    )
}
