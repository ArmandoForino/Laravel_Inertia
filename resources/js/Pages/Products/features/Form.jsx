import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'

import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import makeAnimated from 'react-select/animated';
import { groupBy, makeOptions, optionByValue } from '@/utils/functions';

const Form = ({product, setProduct, setAddingMode, domain, action, measures, categories, tags}) => {
   

    const [selectedTags, setSelectedTags] = useState(product?.tags?.map((tag, i)=>{
        return { value: tag.id, label: tag.name }
    })||[]);

    const editMode = (action=='update') ? true : false;
    const addMode = (action=='store') ? true : false;

    const optionsMeasureSelect = makeOptions(measures);

    const optionsCategorySelect = makeOptions(categories, {value:'id', label:'name'});

    const groupedTags = groupBy(tags, 'type');
    const optionsTagsSelect = Object.keys(groupedTags).map((type, i)=>{
        return {
            label: type,
            options: makeOptions(groupedTags[type], {value:'id', label:'name'})
        }
    })

    const animatedComponents = makeAnimated();

    const {data, setData, processing, reset, errors, clearErrors, post, patch} = useForm({
        ...product
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data)
        switch(action) {
            case 'update':
                patch(route(`${domain}.update`, product.id), { onSuccess: () => { reset(); setProduct(false) } });
                break;
            case 'store':
                post(route(`${domain}.store`), { onSuccess: () => { reset(); setAddingMode(false); } });
                break;
            default:
                return;
        }
        
    };
    
    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="category_id" value="Categoria" />
                    <Select  
                        id="category_id"
                        name="category_id"
                        defaultValue={optionsCategorySelect[0]}
                        options={optionsCategorySelect} 
                        value={data.category?.id&&optionByValue(data.category_id,optionsCategorySelect)} 
                        onChange={e => {setData('category_id', e.value)}}
                    />
                    <InputError message={errors.category_id} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="name" value="Nome" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name||''}
                        onChange={onHandleChange}
                        className="mt-1 block w-full"
                        autoComplete="name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="description" value="Descrizione" />
                    <TextInput
                        id="description"
                        name="description"
                        value={data.description||''}
                        onChange={onHandleChange}
                        className="mt-1 block w-full"
                        autoComplete="description"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="price" value="Prezzo" />
                    <TextInput
                        id="price"
                        name="price"
                        value={data.price||''}
                        onChange={onHandleChange}
                        className="mt-1 block w-full"
                        autoComplete="price"
                    />
                    <InputError message={errors.price} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="quantity" value="Quantità" />
                    <TextInput
                        id="quantity"
                        name="quantity"
                        value={data.quantity||''}
                        onChange={onHandleChange}
                        className="mt-1 block w-full"
                        autoComplete="quantity"
                    />
                    <InputError message={errors.quantity} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="measure" value="Misura" />
                    <CreatableSelect 
                        isClearable 
                        id="measure"
                        name="measure"
                        options={optionsMeasureSelect} 
                        value={data.measure&&optionByValue(data.measure, optionsMeasureSelect)} 
                        onChange={e => {setData('measure', e?.value||null)}}
                    />
                    <InputError message={errors.measure} className="mt-2" />
                </div>
               <div className="mt-2">
                    <InputLabel htmlFor="tagsIds" value="Tags" />
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        id="tagsIds"
                        name="tagsIds"
                        value={selectedTags} 
                        options={optionsTagsSelect}
                        onChange={e => {setSelectedTags(e);setData('tagsIds', e.map((item)=>{return item.value}))}}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="space-x-2">
                    <PrimaryButton className="mt-4" disabled={(!editMode)&&processing} {...(!editMode)&&processing}>{editMode ? 'Salva' : 'Aggiungi'}</PrimaryButton>
                    {editMode&&<button className="mt-4" onClick={(e) => { e.preventDefault(); setProduct(false); reset(); clearErrors(); }}>Cancel</button>}
                    {addMode&&<button className="mt-4" onClick={(e) => { e.preventDefault(); setAddingMode(false); }}>Cancel</button>}
                </div>
            </form>
        </div>
    );
}

export default Form