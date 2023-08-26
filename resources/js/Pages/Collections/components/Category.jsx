
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import DangerButton from '@/components/DangerButton'
import PrimaryButton from '@/components/PrimaryButton'

const Category = ({category, editCategory, deleteCategory}) => {
    return <>
        <li className="flex items-center mb-2">
            <div className="flex-auto">
                <h3>{category.name}</h3>
                <h4>{category.description}</h4>
            </div>
            <div className="flex-none">
                <PrimaryButton onClick={()=>editCategory(category)}><FontAwesomeIcon icon={faPenToSquare} /></PrimaryButton> 
                <DangerButton className="ml-2" onClick={()=>deleteCategory(category)}><FontAwesomeIcon icon={faTrash} /></DangerButton>
            </div>
        </li>
    </>
}

export default Category