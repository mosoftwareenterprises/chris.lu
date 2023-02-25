import { IPageSlug } from '@interfaces/page'

const getPost = async (slug: string) => {

    console.log('getPost, slug:', slug)

    return '# post'

}

export async function generateStaticParams() {

    //const MDXContent = dynamic(() => import(`./${params.slug}.mdx`))
  
    /*return posts.map((post) => ({
      slug: post.slug,
    }))*/

    return [{ slug: 'foo' }, { slug: 'bar' } ]

  }

export default async function Article({ params }: IPageSlug) {

    const { slug } = params

    const ArticleContent = await getPost(slug)

    return (
        <>
            <ArticleContent />
        </>
    )
}