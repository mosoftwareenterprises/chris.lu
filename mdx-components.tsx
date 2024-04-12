import type { MDXComponents } from 'mdx/types'
import HeadingsObserver from '@/components/headings/Observer'
import BaseLink from '@/components/base/Link'
import ImageDispatch from '@/components/base/image/Dispatch'
import { ImageProps } from 'next/image'
import Image from 'next/image'
import type { Route } from 'next'
import ShareButton from '@/components/base/button/Share'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children, ...props }) => (
            <h1 className="h1" {...props}>
                {children}
            </h1>
        ),
        h2: ({ children, ...props }) => (
            <h2 className="h2" {...props}>
                {children}
            </h2>
        ),
        h3: ({ children, ...props }) => (
            <h3 className="h3" {...props}>
                {children}
            </h3>
        ),
        h4: ({ children, ...props }) => (
            <h4 className="h4" {...props}>
                {children}
            </h4>
        ),
        h5: ({ children, ...props }) => (
            <h5 className="h5" {...props}>
                {children}
            </h5>
        ),
        h6: ({ children, ...props }) => (
            <h6 className="h6" {...props}>
                {children}
            </h6>
        ),
        a: ({ children, href, ...props }) => (
            <BaseLink href={href as Route} {...props}>
                {children}
            </BaseLink>
        ),
        img: (props) => (<ImageDispatch {...props as ImageProps} />),
        aside: ({ children, ...props }) => (
            <>
                {props['id'] === 'articleToc' ? (
                    <aside>
                        <div className='asideCore sticky'>
                            <HeadingsObserver>
                                {children}
                            </HeadingsObserver>
                            <div className="asideContainer">
                                <ShareButton />
                                <a href="https://www.buymeacoffee.com/chriswwweb" className='shake'>
                                    <Image src="/assets/images/buy_me_a_coffee_button.png" alt="button buy me a coffee" width="240" height="67" />
                                </a>
                                <br />
                                <span className="fontDarker">* Please 😉</span>
                                <p className="fontSmall fontDarker alignLeft">Donations are not mandatory but greatly appreciated, as they allow me to work on more content (like the one on this page)</p>
                                <p className="fontSmall fontDarker alignLeft">If you find a bug / typo or you want to suggest a new feature, then please open an <BaseLink href="https://github.com/chrisweb/chris.lu/issues">Issue</BaseLink> on GitHub. Suggestions and Ideas are appricated, please use the <BaseLink href="https://github.com/chrisweb/chris.lu/discussions">discussion board</BaseLink> to leave feedback or ask a question.</p>
                            </div>
                        </div>
                    </aside>
                ) : (
                    <aside>
                        {children}
                    </aside>
                )
                }
            </>
        ),
        ...components,
    }
}