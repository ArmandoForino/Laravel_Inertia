import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import ProductsList from './components/ProductsList';
import Form from './features/Form';

const FORM_INITIAL_VALUE = {
    name: '',
    description: '',
    price: '',
    quantity: '',
    measure: '',
    category_id: '',
    tagsIds:[]
};

const Index = ({auth, errors, products, measures, categories, tags}) => {
    const measuresArray = Object.keys(measures);

    const [editingProduct, setEditingProduct] = useState(FORM_INITIAL_VALUE);

    const [editingMode, setEditingMode] = useState(false)
    const [addingMode, setAddingMode] = useState(false)

    const optionsObj = {
        measures: measuresArray,
        categories,
        tags
    }

    const handleEdit = (product) => {
        setEditingProduct((prevState)=>{
            return product ? {
                ...prevState,
                ...product,
                tagsIds: product?.tags?.map((tag, i)=>{
                    return tag.id
                })||[]
            } : FORM_INITIAL_VALUE;
        });
        setEditingMode(product?true:false);

    }

    const handleDelete = (product) => {
        if (confirm("Are you sure you want to Delete")) {
            Inertia.delete(route('products.destroy', product.id));
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Index</h2>}
        >

        <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {!addingMode&&!editingMode&&<ProductsList setAddingMode={setAddingMode} editProduct={handleEdit} deleteProduct={handleDelete} products={products}/>}

                            {addingMode&&!editingMode&&<Form {...optionsObj} setAddingMode={setAddingMode} domain="products" action='store'/>}

                            {!addingMode&&editingMode&&<Form {...optionsObj} product={editingProduct} setProduct={handleEdit} domain="products" action='update' />}

                        </div>
                    </div>
                </div>
            </div>





        </AuthenticatedLayout>
    );
}

export default Index;
