
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import DangerButton from '@/components/DangerButton'
import PrimaryButton from '@/components/PrimaryButton'

const Tag = ({tag, editTag, deleteTag}) => {
    const [removed, setRemoved] = useState(false)
    return <>
        {!removed&&<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {tag.id}
            </th>
            <td className="px-6 py-4">
                {tag.name}
            </td>
            <td className="px-6 py-4">
                {tag.description}
            </td>
            <td className="px-6 py-4">
                <div className="flex-none">
                    <PrimaryButton onClick={()=>editTag(tag)}><FontAwesomeIcon icon={faPenToSquare} /></PrimaryButton> 
                    <DangerButton className="ml-2" onClick={()=>{deleteTag(tag); setRemoved(true)}}><FontAwesomeIcon icon={faTrash} /></DangerButton>
                </div>
            </td>
        </tr>}


    </>
}

export default Tag