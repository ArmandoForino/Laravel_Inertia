import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

const Form = ({category, setCategory, setAddingMode, domain, action, types}) => {
    
    const editMode = (action=='update') ? true : false;
    const addMode = (action=='store') ? true : false;

    const optionsTypeSelect = types.map((type, i)=>{
        return { value: type, label: type }
    })

    const {data, setData, processing, reset, errors, clearErrors, post, patch} = useForm({
        ...category
    });

    const optionByValue = (val) => {
        if(val!='') {
            const option = optionsTypeSelect.find(e => e.value==val); 
            return option || {value:val, label:val};
        }
        return false;
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        switch(action) {
            case 'update':
                patch(route(`${domain}.update`, category.id), { onSuccess: () => { reset(); setCategory(false) } });
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

                
                
                <div className="space-x-2">
                    <PrimaryButton className="mt-4" disabled={(!editMode)&&processing} {...(!editMode)&&processing}>{editMode ? 'Salva' : 'Aggiungi'}</PrimaryButton>
                    {editMode&&<button className="mt-4" onClick={(e) => { e.preventDefault(); setCategory(false); reset(); clearErrors(); }}>Cancel</button>}
                    {addMode&&<button className="mt-4" onClick={(e) => { e.preventDefault(); setAddingMode(false); }}>Cancel</button>}
                </div>
            </form>
        </div>
    );
}

export default Form