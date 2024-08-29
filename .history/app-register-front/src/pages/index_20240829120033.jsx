
import { useEffect, useState, useRef } from 'react'
import api from '../../services/api'

function Home() {

    const [users, setUsers] = useState([])

    const inputName = useRef()
    const inputAge = useRef()
    const inputEmail = useRef()

    const getUsers = async () => {
        const usersApi = await api.get('/users')
        setUsers(usersApi.data)
    }

    const createUser = async () => {
        await api.post('/user', {
            name: inputName.current.value,
            age: inputAge.current.value,
            email: inputEmail.current.value
        })
        getUsers()
    }

    const deleteUser = async (id) => {
        await api.delete(`/user/${id}`)
        getUsers()
    }


    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <form>
                <h2>Users Register</h2>

                <input name="" placeholder='Name' type='text' ref={inputName} />
                <input age="" placeholder='Age' type='number' ref={inputAge} />
                <input email="" placeholder='Email' type='email' ref={inputEmail} />
                <button type='button' onClick={createUser}>Send</button>

            </form>

            {users.map(({ name, age, email, id }) => (
                <div key={id}>
                    <div>
                        <p>{name}</p>
                        <p>{age}</p>
                        <p>{email}</p>
                    </div>
                    <button onClick={() => deleteUser(id)}>Delete</button>
                </div>
            ))}


        </div>
    )
}

export default Home
