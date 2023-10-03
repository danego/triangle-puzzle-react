import Head from 'next/head'
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import classes from '@/styles/Home.module.scss'
import Bank from '../components/Bank';
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

      <main className={classes.main}>
        {/* Seems like this is a messy way to do have all these providers -
          could prob put them all in separate component */}
        <SolutionsProvider>
          <FramelessSolutionsProvider>
            <DndProvider backend={HTML5Backend}>

              <Header />
              <div className={classes.horizontal}>
                <div className={classes.vertical}>
                  <Bank />
                </div>
                <Container />
              </div>
              <Controls />

            </DndProvider>
          </FramelessSolutionsProvider>
        </SolutionsProvider>
      </main>
    </Provider>
  )
}
