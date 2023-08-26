import React from 'react'
import Product from './Product'
import PrimaryButton from '@/components/PrimaryButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ProductsList = (props) => {
  const {products, setAddingMode, ...productsFunctions} = props;
  return <>
    <PrimaryButton onClick={()=>setAddingMode(true)}>Aggiungi <FontAwesomeIcon className="ml-2" icon={faPlus} /></PrimaryButton> 
    
    {Object.keys(products).map((category,i)=>{
      return <div key={i}>
        <h2 className="text-3xl font-bold dark:text-white mt-8">{category}</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {products[category].map((product, i)=>{
              return <Product {...productsFunctions} key={i} product={product}/>
          })}
        </ul>
      </div>
    })}
    
      
    
    
  </>
}

export default ProductsList