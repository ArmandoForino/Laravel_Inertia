import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import UsersList from './components/UsersList';
import Form from './features/Form';

import { CONFIRMS } from './../../constants/texts';

const FORM_INITIAL_VALUE = {
    name: '',
    email: '',
    password: '',
    rolesIds: []
};

const Index = ({auth, errors, users, roles}) => {
    const [editingUser, setEditingUser] = useState(FORM_INITIAL_VALUE);

    const [editingMode, setEditingMode] = useState(false)
    const [addingMode, setAddingMode] = useState(false)

    const optionsObj = {
        roles
    }

    const handleEdit = (user) => {
        setEditingUser((prevState)=>{
            return user ? {
                ...prevState,
                ...user,
                rolesIds: user?.roles?.map((role, i)=>{
                    return role.id
                })||[]
            } : FORM_INITIAL_VALUE;
        });
        setEditingMode(user?true:false);

    }

    const handleDelete = (user) => {
        if (confirm(CONFIRMS.DELETE)) {
            Inertia.delete(route('users.destroy', user.id));
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Utenti</h2>}
        >
        
        <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            {!addingMode&&!editingMode&&<UsersList setAddingMode={setAddingMode} editUser={handleEdit} deleteUser={handleDelete} users={users}/>}
                            
                            {addingMode&&!editingMode&&<Form {...optionsObj} setAddingMode={setAddingMode} domain="users" action='store'/>}

                            {!addingMode&&editingMode&&<Form {...optionsObj} user={editingUser} setUser={handleEdit} domain="users"  action='update' />}

                        </div>
                    </div>
                </div>
            </div>

            


            
        </AuthenticatedLayout>
    );
}

export default Index;
