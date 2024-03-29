import Head from 'next/head'
import { Provider } from 'react-redux';

import styles from '@/styles/Home.module.css'
import Container from '../components/Container';
import Controls from '../components/Controls';
import Header from '../components/Header';
import SolutionsProvider from '@/store/solutions/SolutionsProvider';
import FramelessSolutionsProvider from '@/store/solutions/FramelessSolutionsProvider';
import store from '../store/store';

export default function Home() {
  return (
    <Provider store={store}>
      <Head>
        <title>Triangle Puzzle Solver</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        {/* Seems like this is a messy way to do have all these providers -
          could prob put them all in separate component */}
        <SolutionsProvider>
          <FramelessSolutionsProvider>

            <Header />
            <Container />
            <Controls />

          </FramelessSolutionsProvider>
        </SolutionsProvider>
      </main>
    </Provider>
  )
}
