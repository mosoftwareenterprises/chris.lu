'use client'

import { useRef, useEffect, useState, forwardRef, useCallback } from 'react'
import { PlayerCore, ISoundAttributes, ICoreOptions } from 'web-audio-api-player'
import styles from './ui.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForwardStep, faEject, faArrowUpRightFromSquare, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'
import { Waveform, IWaveLayoutOptions, IWaveCoreOptions, IWaveClickCallback } from 'waveform-visualizer'
import RippleButton from './ripple/Button'

interface ICredits {
    name: string
    artistName: string
    artistWebsite: string
    license: string
}

const PlayerUI = forwardRef((_: unknown, playerRef: React.MutableRefObject<PlayerCore>) => {

    const volumeSliderRef = useRef<HTMLInputElement>()
    const waveCanvasRef = useRef<HTMLCanvasElement>()
    const waveformRef = useRef<Waveform | null>(null)

    const [isPlayingState, setIsPlayingState] = useState(false)
    const [isEjectedState, setIsEjectedState] = useState(false)
    const [isVolumeModalOpenState, setIsVolumeModalOpenState] = useState(false)
    const [creditsState, setCreditsState] = useState<ICredits>({
        name: '',
        artistName: '',
        artistWebsite: '',
        license: '',
    })

    const initializePlayer = useCallback(() => {

        const options: ICoreOptions = {
            soundsBaseUrl: '/assets/music/',
            loopQueue: true,
        }

        playerRef.current = new PlayerCore(options)

        if (typeof volumeSliderRef.current !== 'undefined') {
            volumeSliderRef.current.value = playerRef.current.getVolume().toString()
        }

        const mixTape = getMixTape()

        mixTape.forEach((song) => {

            const soundAttributes: ISoundAttributes = {
                source: song.source,
                onLoading: (loadingProgress, maximumValue, currentValue) => {
                    console.log('loading: ', loadingProgress, maximumValue, currentValue)
                },
                onPlaying: (playingProgress/*, maximumValue, currentValue*/) => {
                    if (waveformRef.current !== null) {
                        waveformRef.current.draw(playingProgress)
                    }
                },
                onSeeking: (seekingPercentage, duration, playTime) => {
                    console.log('onSeeking', seekingPercentage, duration, playTime)
                    if (waveformRef.current !== null) {
                        waveformRef.current.draw(seekingPercentage)
                    }
                },
                onStarted: (playTimeOffset) => {
                    console.log('started', playTimeOffset)
                    waveformRef.current.setWaveData(song.wave)
                    setIsPlayingState(true)
                    setCreditsState({
                        name: song.name,
                        artistName: song.artistName,
                        artistWebsite: song.artistWebsite,
                        license: song.license,
                    })
                },
                onPaused: (playTime) => {
                    console.log('paused', playTime)
                    setIsPlayingState(false)
                },
                onStopped: (playTime) => {
                    console.log('stopped', playTime)
                    setIsPlayingState(false)
                },
                onResumed: (playTime) => {
                    console.log('resumed', playTime)
                    setIsPlayingState(true)
                },
                onEnded: (willPlayNext) => {
                    console.log('ended', willPlayNext)
                }
            }

            playerRef.current.addSoundToQueue({ soundAttributes: soundAttributes })

        })

    }, [playerRef, waveformRef])

    const getMixTape = () => {

        const mixTape = [
            {
                source: [
                    {
                        url: 'Hackers_-_Karl_Casey.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Hackers_-_Karl_Casey.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [11, 16, 55, 92, 97, 93, 96, 93, 100, 96, 93, 95, 77, 56, 95, 96, 94, 97, 94, 94, 97, 94, 96, 92, 31, 28, 26, 27, 27, 30, 88, 89, 87, 95, 79, 56, 96, 95, 96, 97, 95, 98, 91, 93, 96, 81, 62, 58, 30, 0],
                name: 'Hackers',
                artistName: 'Karl Casey aka "White Bat Audio"',
                artistWebsite: 'https://whitebataudio.com',
                license: 'https://creativecommons.org/licenses/by/3.0/',
            },
            {
                source: [
                    {
                        url: 'Sunset_-_LukHash.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Sunset_-_LukHash.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [41, 87, 88, 87, 88, 89, 88, 89, 49, 64, 80, 82, 79, 84, 79, 81, 69, 95, 92, 96, 94, 91, 93, 93, 92, 96, 85, 70, 75, 86, 83, 90, 87, 77, 75, 79, 87, 80, 82, 73, 94, 92, 97, 93, 93, 91, 92, 97, 100, 37],
                name: 'Athena',
                artistName: 'LukHash',
                artistWebsite: 'https://www.lukhash.com/',
                license: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
            },
            {
                source: [
                    {
                        url: 'Athena_-_Karl_Casey.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Athena_-_Karl_Casey.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [22, 26, 26, 24, 32, 35, 43, 89, 92, 96, 96, 94, 93, 98, 94, 94, 95, 85, 83, 84, 91, 91, 94, 100, 91, 94, 95, 49, 12, 12, 14, 31, 32, 34, 34, 36, 35, 61, 93, 90, 98, 92, 91, 90, 56, 13, 13, 14, 1, 0],
                name: 'Athena',
                artistName: 'Karl Casey aka "White Bat Audio"',
                artistWebsite: 'https://whitebataudio.com',
                license: 'https://creativecommons.org/licenses/by/3.0/',
            },
            {
                source: [
                    {
                        url: 'Double_Dragon_Neon_City_Streets_1_-_Jake_Kaufman.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Double_Dragon_Neon_City_Streets_1_-_Jake_Kaufman.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [82, 90, 84, 85, 89, 85, 87, 86, 81, 83, 86, 86, 86, 85, 90, 87, 90, 97, 100, 99, 91, 91, 80, 64, 62, 77, 80, 81, 83, 84, 84, 87, 85, 82, 80, 80, 82, 83, 81, 85, 89, 86, 86, 85, 86, 88, 88, 74, 31, 5],
                name: 'City Streets 1 (Double Dragon 1)',
                artistName: 'Jake Kaufman aka "Virt"',
                artistWebsite: 'https://virt.bandcamp.com/',
                license: 'https://creativecommons.org/licenses/by-nc-sa/3.0/',
            },
            {
                source: [
                    {
                        url: '50_Million_Year_Trip_-_Karl_Casey.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: '50_Million_Year_Trip_-_Karl_Casey.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [16, 20, 32, 76, 81, 80, 69, 46, 75, 76, 78, 55, 40, 39, 41, 65, 75, 85, 100, 81, 76, 75, 79, 37, 73, 76, 79, 68, 39, 48, 78, 79, 90, 82, 80, 76, 86, 59, 52, 73, 75, 76, 76, 74, 77, 76, 32, 25, 30, 26],
                name: '50 Million Year Trip',
                artistName: 'Karl Casey aka "White Bat Audio"',
                artistWebsite: 'https://whitebataudio.com',
                license: 'https://creativecommons.org/licenses/by/3.0/',
            }
        ]

        setCreditsState(mixTape[0])

        return mixTape

    }

    const onWaveClickHandler: IWaveClickCallback = useCallback((clickHorizontalPositionInPercent) => {

        playerRef.current.setPosition(clickHorizontalPositionInPercent)

    }, [playerRef])

    const initializeWaveform = useCallback(() => {

        const waveLayoutOptions: IWaveLayoutOptions = {
            waveHeightInPixel: 40,
            waveTopPercentage: 50,
        }

        const waveCoreOptions: IWaveCoreOptions = {
            layout: waveLayoutOptions,
            data: getMixTape()[0].wave,
            waveformClickCallback: onWaveClickHandler,
        }

        const waveform = new Waveform(waveCoreOptions)

        waveformRef.current = waveform

        waveform.setCanvasElement(waveCanvasRef.current)

        /*const waveCanvasContext = waveform.getCanvasContext()

        const linearGradiantTopPeaks = waveCanvasContext.createLinearGradient(0,0,0,25)

        linearGradiantTopPeaks.addColorStop(0, 'yellow')
        linearGradiantTopPeaks.addColorStop(1, 'red')

        const linearGradiantBottomPeaks = waveCanvasContext.createLinearGradient(0,25,0,50)

        linearGradiantBottomPeaks.addColorStop(0, 'orange')
        linearGradiantBottomPeaks.addColorStop(1, 'yellow')*/

        /*const solidColorTopProgressFillStyle = 'red'
        const solidColorBottomProgressFillStyle = 'orange'

        waveform.setLayoutOptions({
            peakTopFillStyle: linearGradiantTopPeaks,
            peakBottomFillStyle: linearGradiantBottomPeaks,
            peakTopProgressFillStyle: solidColorTopProgressFillStyle,
            peakBottomProgressFillStyle: solidColorBottomProgressFillStyle,
        })*/

        waveform.setLayoutOptions({
            peakTopFillStyle: 'rgba(255,255,255,0.7)',
            peakBottomFillStyle: 'rgba(255,255,255,0.5)',
            peakTopProgressFillStyle: 'white',
            peakBottomProgressFillStyle: 'white',
        })

        waveform.draw(0)

    }, [onWaveClickHandler])

    const onClickTogglePlayPauseCallback = () => {
        if (isPlayingState) {
            playerRef.current.pause()
        } else {
            playerRef.current.play()
        }
    }

    const onClickNextHandler = useCallback(async () => {
        await playerRef.current.next()
    }, [playerRef])

    const onClickEjectHandler = () => {
        if (!isEjectedState) {
            // if the volume modal is open, close it first
            if (isVolumeModalOpenState) {
                setIsVolumeModalOpenState(false)
            }
            setIsEjectedState(true)
        } else {
            setIsEjectedState(false)
        }
    }

    const onClickVolumeHandler = () => {
        if (!isVolumeModalOpenState) {
            // if the casette is open, close it first
            if (isEjectedState) {
                setIsEjectedState(false)
            }
            setIsVolumeModalOpenState(true)
        } else {
            setIsVolumeModalOpenState(false)
        }
    }

    const onInputVolumeHandler = () => {
        if (typeof volumeSliderRef.current !== 'undefined') {
            const volume = volumeSliderRef.current.value
            playerRef.current.setVolume(parseInt(volume))
        }
    }

    useEffect(() => {
        initializePlayer()
        initializeWaveform()
        return () => {
            if (playerRef.current !== null) {
                // tell the player to remove it's listeners
                playerRef.current.disconnect()
            }
            if (waveformRef.current !== null) {
                // tell the waveform to remove it's listeners
                waveformRef.current.destroy()
            }
        }
    }, [initializePlayer, initializeWaveform, playerRef, waveformRef])

    return (
        <>
            <div className={styles.playerUI}>
                <div className={styles.audioWaveForm}>
                    <canvas ref={waveCanvasRef} width="200px" height="60px" />
                </div>
                <div className={styles.playerButtons}>
                    <RippleButton clickCallback={onClickTogglePlayPauseCallback}>
                        <FontAwesomeIcon icon={isPlayingState ? faPause : faPlay} size="xl" color='white' />
                    </RippleButton>
                    <RippleButton clickCallback={onClickNextHandler}>
                        <FontAwesomeIcon icon={faForwardStep} size="xl" color='white' />
                    </RippleButton>
                    <RippleButton clickCallback={onClickVolumeHandler} className="volume">
                        <FontAwesomeIcon icon={faVolumeHigh} size="xl" color='white' />
                    </RippleButton>
                    <RippleButton clickCallback={onClickEjectHandler}>
                        <FontAwesomeIcon icon={faEject} size="xl" color='white' />
                    </RippleButton>
                </div>
            </div>
            <div className={`${styles.walkman} ${isEjectedState ? styles.ejected : styles.inserted}`}>
                <div className={`${styles.cassette} ${isEjectedState ? styles.slideIn : styles.slideOut}`}>
                    <div className={`${styles.face} ${styles.front}`}>
                        <a href={creditsState !== null ? creditsState.license : ''} target="_blank" rel="noreferrer" tabIndex={-1} className={styles.songTitle}>{creditsState !== null ? creditsState.name : ''} <FontAwesomeIcon icon={faCreativeCommons} color='white' /></a>
                        <a href={creditsState !== null ? creditsState.artistWebsite : ''} target="_blank" rel="noreferrer" tabIndex={-1} className={styles.artistName}>{creditsState !== null ? creditsState.artistName : ''} <FontAwesomeIcon icon={faArrowUpRightFromSquare} color='white' /></a>
                        <div className={styles.spoolLeft}></div>
                        <div className={styles.spoolRight}></div>
                        <div className={styles.shield}></div>
                    </div>
                    <div className={`${styles.face} ${styles.back}`}></div>
                    <div className={`${styles.face} ${styles.right}`}></div>
                    <div className={`${styles.face} ${styles.left}`}></div>
                    <div className={`${styles.face} ${styles.top}`}></div>
                    <div className={`${styles.face} ${styles.bottom}`}></div>
                </div>
            </div>
            <div className={`${styles.volumeModal} ${isVolumeModalOpenState ? styles.openVolume : styles.closeVolume}`}>
                <input type="range" id="volume" name="volume" min="0" max="100" className={styles.volumeSlider} ref={volumeSliderRef} onInput={onInputVolumeHandler} />
            </div>
        </>
    )
})

PlayerUI.displayName = 'PlayerUI'

export default PlayerUI