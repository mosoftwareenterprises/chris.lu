'use client'

import { useRef/*, Suspense, useState*/ } from 'react'
import type { PerspectiveCamera as PerspectiveCameraType } from 'three'
import { Canvas } from '@react-three/fiber'
import { Sparkles, PerspectiveCamera, /*OrbitControls, PerformanceMonitor, PerformanceMonitorApi, StatsGl, Hud, useDetectGPU, useProgress*/ } from '@react-three/drei'
import Sun from './Sun'
import City from './City'
import Trees from './Trees'
import Terrains from './Terrains'
//import Loop from './Loop'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

interface IProps extends React.PropsWithChildren {
    altText: string
    containerRef: React.MutableRefObject<HTMLDivElement>
}

const NeonRoadCanvas: React.FC<IProps> = (props) => {

    //const [canPlayState, setCanPlayState] = useState(false)

    // uncomment if you want to see what useDetectGPU returns
    //const gpuInfo = useDetectGPU()
    //console.log('useDetectGPU: ', gpuInfo)

    //const canvasRef = useRef<HTMLCanvasElement>(null)
    const cameraRef = useRef<PerspectiveCameraType>(null)

    /*const sceneSetup = () => {

        if (typeof window !== 'undefined') {

            // basic camera
            cameraRef.current = new PerspectiveCamera(90, (window.innerHeight / window.innerWidth), 0.01, 20)

            cameraRef.current.position.x = 0
            cameraRef.current.position.y = 0.05
            cameraRef.current.position.z = 0.6


        }

    }

    sceneSetup()*/

    function Sunshine() {

        // uncomment the next lines to use the spotlight helper
        // which helps to visualize the size and direction of your light
        // uncomment also the line that sets the ref, inside of spotLight
        // put the two imports on top
        /*import { SpotLightHelper, SpotLight } from 'three'
        import { useHelper } from '@react-three/drei'
        // three.js three shaking
        extend({ SpotLightHelper, SpotLight })
        const spotLightRef = useRef<SpotLight>(null)
        useHelper(spotLightRef, SpotLightHelper, '#fff400')*/
        return (
            <spotLight
                color="#cc8000"
                intensity={100}
                position={[0, 1, -2]}
                distance={20}
                angle={Math.PI / 9} // default is Math.PI/3
                //ref={spotLightRef}
                castShadow={true} // default is false
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
        )
    }

    // https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide#expanded-gl-prop
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer
    //import { RenderProps } from '@react-three/fiber'
    /*const renderOptions: RenderProps = {
        gl: {}
    }*/

    /*const onCanvasCreatedHandler = (state: RootState) => {
        
        //console.log(state)
        
    }*/

    /*const onPerformanceChangeHandler = (api: PerformanceMonitorApi) => {
        console.log(api.averages)
        console.log(api.fps)
        console.log(api.refreshrate)
        console.log(api.frames)
    }*/

    /*function Loader() {
        //const { active, progress, errors, item, loaded, total } = useProgress()
        //console.log(active, progress, errors, item, loaded, total)
        if (progress === 100) {
            //setCanPlayState(true)
        }
        return <></>
    }*/

    const Fallback = () => {

        return (<>3D Canvas not supported on this device</>)

    }

    return (
        <>
            <Canvas
                // https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide#new-pixel-ratio-default
                //dpr={Math.min(window.devicePixelRatio, 2)} // pixel ratio, should be 1 or 2
                // https://docs.pmnd.rs/react-three-fiber/api/canvas#render-defaults
                shadows={true} // true will set shadows to PCFsoft
                fallback={<Fallback />}
                aria-label={props.altText}
                role="img"
                gl={{ antialias: false }}
                style={{
                    //zIndex: -30,
                }}
                //frameloop="never"
                //onCreated={onCanvasCreatedHandler}
                //ref={canvasRef}
                camera={cameraRef.current}
            >
                {/*<Suspense fallback={<Loader />}>*/}
                    <PerspectiveCamera
                        makeDefault={true}
                        ref={cameraRef}
                        fov={75}
                        near={0.01}
                        far={3}
                        position={[0, 0.06, 1]}
                        aspect={props.containerRef.current.clientWidth / props.containerRef.current.clientHeight}
            />
                    {/*<PerformanceMonitor onChange={onPerformanceChangeHandler} />*/}
                    <color attach="background" args={['#2f0f30']} />
                    <Sparkles
                        count={400}
                        size={1}
                        position={[0, 1, -2.1]}
                        scale={[30, 5, 1]}
                        speed={0}
                    />
                    <ambientLight color={'#ffecec'} intensity={20} />
                    <Sun />
                    <City />
                    <Trees />
                    <Terrains />
                    <Sunshine />
                    {/*<Loop />*/}
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.01}
                            intensity={0.4}
                        />
                    </EffectComposer>
                    {/*<axesHelper />*/}{/*enable for development*/}

                    {/*<OrbitControls camera={cameraRef.current} />*/}{/*enable for development*/}
                    {/*<StatsGl />*/}{/*enable for development*/}
                    {/*GUI: https://github.com/pmndrs/leva*/}
                {/*</Suspense>*/}
            </Canvas>
        </>

    )
}

export default NeonRoadCanvas