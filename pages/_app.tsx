import type { AppProps } from 'next/app'
import '@patternfly/react-core/dist/styles/base.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
