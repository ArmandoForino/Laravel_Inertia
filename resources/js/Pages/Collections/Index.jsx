import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import CategoriesList from './components/CategoriesList';
import Form from './features/Form';

const FORM_INITIAL_VALUE = {
    name: '',
    description: '',
    type: ''
};

const Index = ({auth, errors, categories}) => {
    const types = Object.keys(categories)
    const [editingCategory, setEditingCategory] = useState(FORM_INITIAL_VALUE);

    const [editingMode, setEditingMode] = useState(false)
    const [addingMode, setAddingMode] = useState(false)

    const handleEdit = (category) => {
        setEditingCategory((prevState)=>{
            return category ? {
                ...prevState,
                ...category
            } : FORM_INITIAL_VALUE;
        });
        setEditingMode(category?true:false);

    }

    const handleDelete = (category) => {
        if (confirm("Are you sure you want to Delete")) {
            Inertia.delete(route('categories.destroy', category.id));
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Index</h2>}
        >

        <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {!addingMode&&!editingMode&&<CategoriesList setAddingMode={setAddingMode} editCategory={handleEdit} deleteCategory={handleDelete} categories={categories}/>}

                            {addingMode&&!editingMode&&<Form types={types} setAddingMode={setAddingMode} domain="categories" action='store'/>}

                            {!addingMode&&editingMode&&<Form category={editingCategory} setCategory={handleEdit} types={types} domain="categories"  action='update' />}

                        </div>
                    </div>
                </div>
            </div>





        </AuthenticatedLayout>
    );
}

export default Index;
