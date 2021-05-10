import React, {useState} from "react"
import axios from "axios"

const BASE_URL = "https://file-metadata-micro-s.herokuapp.com"

const App = () => {

    const [file, setFile] = useState(null)
    const [fileDate, setFileDate] = useState("")
    const [name, setName] = useState("")
    const [result, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (Event) => {

        const {lastModifiedDate, name} = Event.target.files[0]

        setFile(Event.target.files[0])
        setFileDate(lastModifiedDate)
        setName(name)
        
    }


    const handleSubmit = () => {
        const formData = new FormData()
        formData.append("file", file)

        setIsLoading(true)

        axios.post(`${BASE_URL}/api/fileanalyse`, formData).then(response => {
            const {data} = response
            if (data.hasOwnProperty("error")) {
                setResult([`Error: ${data.error}`])
            } else {
                let arr = []
                arr.push(`Name: ${data.name}`)
                arr.push(`Type: ${data.type}`)
                arr.push(`Size: ${parseFloat(data.size)/1000} Kb`)
                arr.push(`Last modified: ${fileDate}`)

                setResult(arr)
            }

            setIsLoading(false)
        })
    }

    return (
        <div>
            {isLoading ? (
                <div className="loading">
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div className="container">
                    <h1> File Metadata Micro Service</h1>
                    <div className="input-area">
                        <label htmlFor="input-file" className="input-label">Select file</label>
                        <input id="input-file" type="file" name="file" onChange={handleChange} className="input" />
                        <h3>{name}</h3>
                    </div>
                    
                    <button onClick={handleSubmit} className="btn">submit</button>

                    <div className="result">
                        <ul>
                            {
                                result.map(item => {
                                    return (
                                        <li key={Math.random() * Math.random()}> {item} </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            )}

        </div>
    )
}

export default App