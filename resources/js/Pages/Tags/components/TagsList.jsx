import React from 'react'
import Tag from './Tag'
import PrimaryButton from '@/components/PrimaryButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const TagsList = (props) => {
  const {tags, setAddingMode, ...tagsFunctions} = props;
  return <>
    <PrimaryButton onClick={()=>setAddingMode(true)}>Aggiungi <FontAwesomeIcon className="ml-2" icon={faPlus} /></PrimaryButton> 
    {Object.keys(tags).map((type, i)=>{
        return <div key={i}>
            <h2 className="text-3xl mt-4">{type}</h2>
            
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
                              Descrizione
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Azioni
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                  {tags[type].map((tag, i)=>{
                      return <Tag {...tagsFunctions} key={i} tag={tag}/>
                  })}
                  </tbody>
              </table>
          </div>  
        </div>
    })}
  </>
}

export default TagsList