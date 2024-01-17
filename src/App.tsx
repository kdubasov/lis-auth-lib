import { Providers, SignInForm, UserInfo } from '../lib/main.ts';

function App() {
  return (
    <Providers>
       <SignInForm />
       <UserInfo />
    </Providers>
  )
}

export default App
