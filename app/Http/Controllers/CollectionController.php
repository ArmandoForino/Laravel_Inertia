<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;

use App\Models\Category;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // recupero tutte le collections e contestualmente prodotti e categorie e li ordino dall'ultimo inserito
        $collections = Collection::with('products.category')->where('user_id', auth()->id())->latest()->get();
        return view('pages.collections.index', [
            'collections' => $collections
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // recupero le categorie per poterle poi utilizzare per generare il form con i prodotti ordinati
        $categories = Category::with('products')->where('user_id', auth()->id())->get();
        /*if(count($categories)<1) { 
            return redirect()->route('products.create');
        }*/
        return view('pages.collections.form', [
            'categories'=>$categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // faccio una validazione dei dati inviati 
        $validated = $request->validate(Collection::$rules);
        // inserisco nel db i dati fillable
        $collection = $request->user()->collections()->create($validated);
        // inserisco le collezioni inserendo con sync un array di id
        // in questo modo verranno inserire nella tabella pivot le associazioni giuste
        $collection->products()->sync($validated['productsIds']);
        
        return redirect(route('collections.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function show(Collection $collection)
    {
        // recupero le categorie per poterle utilizzare nel form
        $categories = Category::with('products')->where('user_id', auth()->id())->get();
        // passo anche collection così riempio il form con i values necessari
        return view('pages.collections.detail', [
            'collection' => $collection,
            'categories'=>$categories
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function edit(Collection $collection)
    {
        // controllo se l'user ha i permessi per effettuare l'azione
        $this->authorize('update', $collection);
        // recupero le categorie per avere i prodotti ordinati per cat, e per poterle utilizzare nel form
        $categories = Category::with('products')->where('user_id', auth()->id())->get();
        // mi servono gli id dei prodotti associati alla collezione
        $collectionProducts =  $collection->products->pluck('id')->toArray(); // ->all()
        // passo anche product così riempio il form con i values necessari
        return view('pages.collections.form', [
            'collection' => $collection,
            'collectionProducts' => $collectionProducts,
            'categories'=>$categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Collection $collection)
    {
        // controllo se l'user ha i permessi per effettuare l'azione
        $this->authorize('update', $collection);
        // faccio una validazione dei dati inviati
        $validated = $request->validate(Collection::$rules);
        // modifico il prodotto presente nel db
        $collection->update($validated);
        // gli id presenti nell'array saranno gli unici a formare le varie associazioni 
        // nella tabella pivot, in questo modo posso comodamente modificare le categorie associate al prodotto
        $collection->products()->sync($validated['productsIds']);
        
        return redirect(route('collections.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function destroy(Collection $collection)
    {
        // controllo se l'user ha i permessi per effettuare l'azione
        $this->authorize('delete', $collection);
        // cancello dal db
        $collection->delete();
        return redirect(route('collections.index'));
    }
}
