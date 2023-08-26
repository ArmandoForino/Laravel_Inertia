import React from 'react'
import Category from './Category'
import PrimaryButton from '@/components/PrimaryButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const CategoriesList = (props) => {
  const {categories, setAddingMode, ...categoriesFunctions} = props;
  return <>
    <PrimaryButton onClick={()=>setAddingMode(true)}>Aggiungi <FontAwesomeIcon className="ml-2" icon={faPlus} /></PrimaryButton> 
    {categories.map((category, i)=>{
        return <Category {...categoriesFunctions} key={i} category={category}/>
    })}
  </>
}

export default CategoriesList