import FindUser from "./components/FindUser";
import { users } from "./components/fakeUsr";

function App() {
  return (
    <>
      <FindUser users={users} />
    </>
  );
}

export default App;
