import { Button, Label, Input } from '../lib/main.ts';

function App() {
  return (
    <>
       <Label>My Label</Label><br />
       <Input placeholder="Custom count" />
       <br />
       <Button>
          count is 123
       </Button>
    </>
  )
}

export default App
