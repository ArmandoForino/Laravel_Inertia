import React from 'react'
import User from './User'
import PrimaryButton from '@/components/PrimaryButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const UsersList = (props) => {
  const {users, setAddingMode, ...usersFunctions} = props;
  return <>
    <PrimaryButton onClick={()=>setAddingMode(true)}>Aggiungi <FontAwesomeIcon className="ml-2" icon={faPlus} /></PrimaryButton> 
     
    <div className="relative overflow-x-auto mt-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Nome
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Ruolo
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Azioni
                    </th>
                </tr>
            </thead>
            <tbody>
            {users.map((user, i)=>{
                return <User {...usersFunctions} key={i} user={user}/>
            })}
            </tbody>
        </table>
    </div>
  </>
}

export default UsersList