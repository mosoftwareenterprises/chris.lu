'use client'

import { useRef/*, useMemo*/ } from 'react'
import type { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import PalmModel from './Palm'
import { moveFromAToBInLoop } from './lib/helpers'

interface ITreeModel {
    xPosition: number
    zPosition: number
}

function randomDegrees() {
    const min = 0
    const max = 360
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const Trees: React.FC = () => {

    // trees on the left side
    const leftSideTreesRefs = useRef<Group[]>([])

    // trees on the right side
    const rightSideTreesRefs = useRef<Group[]>([])

    // the three fiber render() will trigger useFrame()
    useFrame((state, delta /*, xrFrame*/) => {

        moveFromAToBInLoop({
            delta,
            objectsRef: leftSideTreesRefs,
            cameraZPosition: 1,
            distanceToNextObject: 0.2
        })

        moveFromAToBInLoop({
            delta,
            objectsRef: rightSideTreesRefs,
            cameraZPosition: 1,
            distanceToNextObject: 0.2
        })

    })

    const treesElements: React.ReactElement[] = []

    const sides = ['left', 'right']
    const amountOfTreesPerSide = 12

    sides.forEach((side) => {

        let positionChange = -1.5

        for (let i = 0; i < amountOfTreesPerSide; i++) {

            const treeModelSetup: ITreeModel = {
                xPosition: side === 'right' ? -0.21 : 0.21,
                zPosition: positionChange,
            }

            treesElements.push(
                <PalmModel
                    position={[treeModelSetup.xPosition, 0, treeModelSetup.zPosition]}
                    ref={ref => {
                        if (ref === null) return
                        side === 'right' ? rightSideTreesRefs.current[i] = ref : leftSideTreesRefs.current[i] = ref
                    }}
                    scale={[0.009, 0.009, 0.009]}
                    castShadow={true} // default is false
                    receiveShadow={false}
                    key={side + i}
                    rotation={[0, randomDegrees(), 0]}
                />
            )

            positionChange += 0.2

        }

    })

    return (<>{treesElements}</>)

}

export default Trees