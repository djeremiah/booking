import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Masthead, MastheadBrand, MastheadMain, Page } from '@patternfly/react-core'
import SchoolName from '../components/gpetns.svg'


type Props = {
    children?: ReactNode
    title?: string
}

const Header = (
    <Masthead>
        <MastheadMain>
            <MastheadBrand><SchoolName height={30}/></MastheadBrand>
        </MastheadMain>
    </Masthead>
)

const Layout = ({ children, title = 'This is the default title' }: Props) => (
    <>
        <style jsx global>{`
        #__next {
          height: 100%;
          width: 100%;
        }
      `}</style>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Page header={Header}>
            {children}
        </Page>
    </>
)

export default Layout