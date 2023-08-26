import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from 'react-select';

import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import makeAnimated from 'react-select/animated';
import { makeOptions, optionByValue } from '@/utils/functions';

const Form = ({user, setUser, setAddingMode, domain, action, roles}) => {
    

    const [selectedRoles, setSelectedRoles] = useState(user?.roles?.map((role, i)=>{
        return { value: role.id, label: role.name }
    })||[]);

    const editMode = (action=='update') ? true : false;
    const addMode = (action=='store') ? true : false;
    
    const optionsRoleSelect =  makeOptions(roles, {value:'id', label:'name'})
    
    const animatedComponents = makeAnimated();

    const {data, setData, processing, reset, errors, clearErrors, post, patch} = useForm({
        ...user
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        switch(action) {
            case 'update':
                console.log(data)
                patch(route(`${domain}.update`, user.id), { onSuccess: () => { reset(); setUser(false) } });
                break;
            case 'store':
                post(route(`${domain}.store`), { onSuccess: () => { reset(); setAddingMode(false); } });
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
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        name="email"
                        value={data.email||''}
                        onChange={onHandleChange}
                        className="mt-1 block w-full"
                        autoComplete="email"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="rolesIds" value="Ruoli" />
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        id="rolesIds"
                        name="rolesIds"
                        value={selectedRoles} 
                        options={optionsRoleSelect}
                        onChange={e => {setSelectedRoles(e);setData('rolesIds', e.map((item)=>{return item.value}))}}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                
                <div className="space-x-2">
                    <PrimaryButton className="mt-4" disabled={(!editMode)&&processing} {...(!editMode)&&processing}>{editMode ? 'Salva' : 'Aggiungi'}</PrimaryButton>
                    {editMode&&<button className="mt-4" onClick={(e) => { e.preventDefault(); setUser(false); reset(); clearErrors(); }}>Cancel</button>}
                    {addMode&&<button className="mt-4" onClick={(e) => { e.preventDefault(); setAddingMode(false); }}>Cancel</button>}
                </div>
            </form>
        </div>
    );
}

export default Form