import { useState } from 'react'
import './App.css'
import instance from './axios.config'
import { Button, FormSelect } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NormalSearch } from './components/NormalSearch';

function App() {
  const [search, setSearch] = useState("normal")

  function ShowForm() {
    switch (search) {
      case "normal":
        return <NormalSearch />
      default:
        return <></>
    }
  }
  return (
    <div className="App">
      <div className="container">
        <br />
        <h3>
          Select the type of search that you want to perform
        </h3>
        <FormSelect onChange={(e) => {
          setSearch(e.target.value)
          ShowForm();
        }} >
          <option value="normal">Normal Search</option>
          <option value="advanced">Advanced Search</option>
          <option value="similar">Similar Search</option>
        </FormSelect>
        <br />
        {search == "normal" ? <NormalSearch></NormalSearch> : ""}
      </div>
    </div>
  )
}

export default App;
