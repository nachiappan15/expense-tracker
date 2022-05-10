
import './App.css';
import Details from './components/Details';
import Main from './components/Main';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
const LargeScreen = () => {
  return <>

    <Details type="Income" />
    <Main />
    <Details type="Expense" />


  </>
}

function App() {
  return (
    <div className="lg:h-screen w-full  bg-bground flex  " >
      <div className='w-full lg:hidden flex flex-col gap-7 items-center justify-center py-4'>
        <Main />
        <Details type="Income" />
        <Details type="Expense" />

      </div>
      <div className='hidden lg:flex items-center justify-center gap-7  w-full '>
        <LargeScreen />
      </div>
      <div id="talk">
        <PushToTalkButtonContainer >
          <PushToTalkButton />
          <ErrorPanel />
        </PushToTalkButtonContainer>
      </div>
    </div>
  );
}

export default App;
