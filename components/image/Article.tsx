import Image, { ImageProps } from 'next/image'

const ImageArticle: React.FC<ImageProps> = (props): JSX.Element => {

    let placeholder = true

    // something is weird because
    // src is of type StaticImport, but somehow ts thinks it has no properties
    // @ts-expect-error: because the library definition is wrong
    if (props.src?.src.slice(-3) === 'gif') {
        placeholder = false
    }

    return (
        <>
            {props.alt.startsWith('banner') ? (
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="100vw"
                    priority
                    placeholder={ placeholder ? 'blur' : 'empty' }
                    //quality={90} // default is 75
                    {...(props as ImageProps)}
                />
            ) : (props.alt.startsWith('photo') || props.alt.startsWith('screenshot')) ? (
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="100vw"
                    placeholder={ placeholder ? 'blur' : 'empty' }
                    {...(props as ImageProps)}
                />
            ) : (
                <Image
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                    placeholder={ placeholder ? 'blur' : 'empty' }
                    {...(props as ImageProps)}
                />
            )}
        </>
    )
}

export default ImageArticle