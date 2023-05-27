import Typing from '../components/Extra/Typing'
import styles from './page.module.css'

export default function Homepage() {

    return (
        <>
            <h1 className="h1">Hello, World! <span className="emoji">👋</span></h1>
            <p>Welcome to my blog, my name is Chris Weber (aka chrisweb)</p>
            <p>I like <Typing>Web development, Lego bricks, Music, Games, Cooking, Movies & TV shows, Memes</Typing></p>
            <section className={styles.portalsGrid}>
                <div className={styles.cyberPortalOuterGlow} id="web_development">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>
                                <p><a href="/about_me" className="a"><b>Web Development:</b></a> In this portal you will find my articles about all things web development, so mostly about Javascript (Typescript), React, Next.js, APIs, CI/CD deployment, capacitor (web apps), WebGL, but probably also some posts about Cloud (serverless, edge, CDNs, ...), AI, IoT and maybe some more</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="lego">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>
                                <p><a href="/about_me" className="a"><b>About me:</b></a> I don&apos;t think most of the content of this blog will be about me, as I intend to mostly write about my hobbies, but I also wanted to have a more personal section where I share a brief (and obviously biased) description of myself. Over time I will eventually post some more personal articles not linked to any hobby.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="games">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="cooking">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="music">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="memes">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="movies_and_tv_shows">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
