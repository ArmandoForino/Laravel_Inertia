import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import TagsList from './components/TagsList';
import Form from './features/Form';

import { CONFIRMS } from './../../constants/texts';

const FORM_INITIAL_VALUE = {
    name: '',
    description: '',
    type: ''
};

const Index = ({auth, errors, tags, domain}) => {
    const typesArr = Object.keys(tags)
    const [editingTag, setEditingTag] = useState(FORM_INITIAL_VALUE);

    const [editingMode, setEditingMode] = useState(false)
    const [addingMode, setAddingMode] = useState(false)

    const optionsObj = {
        types: typesArr,
        taggable: domain
    }

    const handleEdit = (tag) => {
        setEditingTag((prevState)=>{
            return tag ? {
                ...prevState,
                ...tag
            } : FORM_INITIAL_VALUE;
        });
        setEditingMode(tag?true:false);

    }

    const handleDelete = (tag) => {
        if (confirm(CONFIRMS.DELETE)) {
            Inertia.delete(route('tags.destroy', {domain: domain, tag: tag.id}));
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tags</h2>}
        >
        
        <Head title="Tags" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            {!addingMode&&!editingMode&&<TagsList setAddingMode={setAddingMode} editTag={handleEdit} deleteTag={handleDelete} tags={tags}/>}
                            
                            {addingMode&&!editingMode&&<Form {...optionsObj} setAddingMode={setAddingMode} domain="tags" action='store'/>}

                            {!addingMode&&editingMode&&<Form {...optionsObj} tag={editingTag} setTag={handleEdit} domain="tags"  action='update' />}

                        </div>
                    </div>
                </div>
            </div>

            


            
        </AuthenticatedLayout>
    );
}

export default Index;
