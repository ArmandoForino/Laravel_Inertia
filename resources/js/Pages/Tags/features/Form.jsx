import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import CreatableSelect from 'react-select/creatable';

import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { makeOptions, optionByValue } from '@/utils/functions';

const Form = ({tag, setTag, setAddingMode, domain, action, types, taggable}) => {
    
    const editMode = (action=='update') ? true : false;
    const addMode = (action=='store') ? true : false;

    const optionsTypeSelect = makeOptions(types);

    const {data, setData, processing, reset, errors, clearErrors, post, patch} = useForm({
        ...tag
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        switch(action) {
            case 'update':
                patch(route(`${domain}.update`, {domain: taggable, tag: tag.id}), { onSuccess: () => { reset(); setTag(false) } });
                break;
            case 'store':
                post(route(`${domain}.store`, {domain: taggable}), { onSuccess: () => { reset(); setAddingMode(false); } });
                break;
            default:
                return;
        }
        
    };
    
    return (
        <div className="mx-auto p-4 sm:p-6 lg:p-8">
            <form onSubmit={submit}>
                <div>
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
                    <InputLabel htmlFor="type" value="Tipologia" />
                    <CreatableSelect 
                        isClearable 
                        id="type"
                        name="type"
                        options={optionsTypeSelect} 
                        value={data.type&&optionByValue(data.type, optionsTypeSelect)} 
                        onChange={e => {setData('type', e.value)}}
                    />
                    <InputError message={errors.type} className="mt-2" />
                </div>
                
                <div className="space-x-2">
                    <PrimaryButton className="mt-4" disabled={(!editMode)&&processing} {...(!editMode)&&processing}>{editMode ? 'Salva' : 'Aggiungi'}</PrimaryButton>
                    {editMode&&<button className="mt-4" onClick={(e) => { e.preventDefault(); setTag(false); reset(); clearErrors(); }}>Cancel</button>}
                    {addMode&&<button className="mt-4" onClick={(e) => { e.preventDefault(); setAddingMode(false); }}>Cancel</button>}
                </div>
            </form>
        </div>
    );
}

export default Form