import Head from 'next/head'
import { Provider } from 'react-redux';

import styles from '@/styles/Home.module.css'
import Frame from './Container';
import RowProvider from '../store/RowProvider';
import SolutionsProvider from '@/store/SolutionsProvider';
import FramelessSolutionsProvider from '@/store/FramelessSolutionsProvider';
import store from '../store/index';

export default function Home() {
  return (
    <Provider store={store}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Seems like this is a messy way to do have all these providers -
          could prob put them all in separate component */}
        <RowProvider>
          <SolutionsProvider>
            <FramelessSolutionsProvider>

              <Frame />

            </FramelessSolutionsProvider>
          </SolutionsProvider>
        </RowProvider>
      </main>
    </Provider>
  )
}
