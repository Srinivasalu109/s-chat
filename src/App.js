import { BrowserRouter, Route, Switch } from "react-router-dom"
import Auth from "./routes/auth"
import Chat from "./routes/chat"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { newtoken } from "./api/api"
function App() {
  // const selector=useSelector(state=>{
  //   console.log(state)
  //   return state.data})
  const dispatch = useDispatch()
  const id = useSelector(state => state.userId)

  useEffect(() => {
    const getnewtoken = () => {
      dispatch(newtoken({ refreshtoken: localStorage.getItem("refreshtoken"), id }))
    }
    setInterval(getnewtoken, 100000000000000)
  })
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/chat" exact component={Chat} />
          <Route path="/" exact component={Auth} />
        </Switch>
      </BrowserRouter>
  );
}
export default App;
