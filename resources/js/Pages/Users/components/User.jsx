
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import DangerButton from '@/components/DangerButton'
import PrimaryButton from '@/components/PrimaryButton'

const User = ({user, editUser, deleteUser}) => {
    const [removed, setRemoved] = useState(false)
    return <>
        {!removed&&<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.id}
            </th>
            <td className="px-6 py-4">
                {user.name}
            </td>
            <td className="px-6 py-4">
                {user.email}
            </td>
            <td className="px-6 py-4">
                {user.roles.map((role,i)=>{
                    return <small key={i}>{role.name}</small>
                })}
            </td>
            <td className="px-6 py-4">
                <div className="flex-none">
                    <PrimaryButton onClick={()=>editUser(user)}><FontAwesomeIcon icon={faPenToSquare} /></PrimaryButton> 
                    <DangerButton className="ml-2" onClick={()=>{deleteUser(user); setRemoved(true)}}><FontAwesomeIcon icon={faTrash} /></DangerButton>
                </div>
            </td>
        </tr>}


    </>
}

export default User