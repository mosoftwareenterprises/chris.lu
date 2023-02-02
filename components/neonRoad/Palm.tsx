'use client'

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { forwardRef, Ref } from 'react'
import { Mesh, MeshStandardMaterial, Group } from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'

type GLTFResult = GLTF & {
    nodes: {
        tronc_tronc1_0: Mesh
        Feuille_1_feuilles_0: Mesh
        Feuille_2_feuilles_0: Mesh
        Feuille_3_feuilles_0: Mesh
        Feuille_4_feuilles_0: Mesh
        Feuille_5_feuilles_0: Mesh
        Feuille_6_feuilles_0: Mesh
        Feuille_7_feuilles_0: Mesh
        Feuille_8_feuilles_0: Mesh
        Feuille_1_feuilles_0001: Mesh
        Feuille_2_feuilles_0001: Mesh
        Feuille_3_feuilles_0001: Mesh
        Feuille_4_feuilles_0001: Mesh
        Feuille_5_feuilles_0001: Mesh
        Feuille_6_feuilles_0001: Mesh
        Feuille_7_feuilles_0001: Mesh
        Feuille_8_feuilles_0001: Mesh
        tronc_tronc1_0001: Mesh
    }
    materials: {
        tronc1: MeshStandardMaterial
        feuilles: MeshStandardMaterial
        ['feuilles.001']: MeshStandardMaterial
        ['tronc1.001']: MeshStandardMaterial
    }
}

const PALM_GLTF_PATH = '/assets/3d_models/palm/palm.gltf'

const PalmModel: React.FC<GroupProps> = forwardRef((props, ref: Ref<Group>) => {

    // types problem see: https://github.com/pmndrs/gltfjsx/issues/167
    const { nodes, materials } = useGLTF(PALM_GLTF_PATH) as unknown as GLTFResult

    return (
        <group name={'PalmModel'} {...props} ref={ref}>
            <mesh
                castShadow
                geometry={nodes.tronc_tronc1_0.geometry}
                material={materials.tronc1}
            />
            <mesh
                castShadow
                geometry={nodes.Feuille_1_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow
                geometry={nodes.Feuille_2_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow
                geometry={nodes.Feuille_3_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow
                geometry={nodes.Feuille_4_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow
                geometry={nodes.Feuille_5_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow
                geometry={nodes.Feuille_6_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow
                geometry={nodes.Feuille_7_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow
                geometry={nodes.Feuille_8_feuilles_0.geometry}
                material={materials.feuilles}
            />
        </group>
    )
})

PalmModel.displayName = 'PalmModel'

useGLTF.preload(PALM_GLTF_PATH)

export default PalmModel