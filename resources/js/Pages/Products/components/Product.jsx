
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import DangerButton from '@/components/DangerButton'
import PrimaryButton from '@/components/PrimaryButton'
import { groupBy } from '@/utils/functions'

const Product = ({product, editProduct, deleteProduct}) => {
    const groupedTags = groupBy(product.tags, 'type');
    
    return <>
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
                {/*
                <h4>{product.price}</h4>
                <h4>{product.quantity}</h4>
                <h4>{product.measure}</h4>
                */}
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {product.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {product.description}
                </p>
                
                {Object.keys(groupedTags).map((type, i)=>{
                    return <p key={i}>
                        <small className="font-bold mr-1">{type}:</small>
                        {groupedTags[type].map((tag, i)=>{
                            return <span key={i} className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{tag.name}</span>
                        })}
                    </p>
                })}
                
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <PrimaryButton onClick={()=>editProduct(product)}><FontAwesomeIcon icon={faPenToSquare} /></PrimaryButton> 
                <DangerButton className="ml-2" onClick={()=>deleteProduct(product)}><FontAwesomeIcon icon={faTrash} /></DangerButton>
            </div>
          </div>
      </li>
    </>
}

export default Product