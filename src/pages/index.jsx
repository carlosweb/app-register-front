
import { useEffect, useState, useRef } from 'react'
import api from '../services/api'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify';


function Home() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const inputName = useRef()
    const inputAge = useRef()
    const inputEmail = useRef()

    const getUsers = async () => {
        try {
            const usersApi = await api.get('/users')
            setUsers(usersApi.data)
        } catch (err) {
            console.log(err, 'Error to find users')
        }
    }

    const createUser = async () => {

        const name = inputName.current.value
        const age = inputAge.current.value;
        const email = inputEmail.current.value;

        setLoading(true)
        await api.post('/user', { name, age, email })

        toast.success(' User created!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setLoading(false)
        getUsers()
    }

    const deleteUser = async (id) => {
        await api.delete(`/user/${id}`)
        toast.info(' User removed!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        getUsers()
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <ToastContainer />
            <div className='max-w-screen-md mx-auto mt-10 bg-gray-50 p-5 shadow-md'>
                <h2 className='text-cyan-800 text-2xl font-bold text-center font-sans'>Users Register</h2>
                <form className="flex flex-col  p-10 gap-3">
                    <input className='border border-slate-300 rounded-md p-2' name="" placeholder='Name' type='text' ref={inputName} />
                    <input className='border border-slate-300 rounded-md p-2' age="" placeholder='Age' type='number' ref={inputAge} />
                    <input className='border border-slate-300 rounded-md p-2' email="" placeholder='Email' type='email' ref={inputEmail} />
                    <button className='bg-teal-700 rounded-md p-2 text-white duration-200 hover:bg-teal-500' type='button' onClick={createUser}>Send</button>
                </form>

                {loading
                    ? <Skeleton count={users.length} height={50} />
                    : (users.map(({ name, age, email, id }) => (
                        <div key={id}>
                            <div className='bg-slate-100 p-3 flex flex-row mb-3 shadow-md hover:translate-x-2 duration-150'>
                                <p className='mr-5'><span className='font-bold text-gray-500'>Name:</span> {name}</p>
                                <p className='mr-5'><span className='font-bold text-gray-500'>Age: </span>{age}</p>
                                <p className='mr-5'><span className='font-bold text-gray-500'>Email:</span> {email}</p>
                                <button onClick={() => deleteUser(id)}><TrashIcon className="size-4 text-red-400" /></button>
                            </div>

                        </div>
                    )))}
            </div>
        </>
    )
}

export default Home
