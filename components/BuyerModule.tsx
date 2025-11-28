import React, { useState } from 'react';
import { Button, VoiceInput } from './Shared';
import { Product, Recipe, Order, OrderStatus } from '../types';

export const BuyerHome = ({ navigate, products, recipes }: any) => {
  return (
    <div className="pb-24">
      {/* Hero Banner */}
      <div className="bg-milletGold text-white p-6 pb-12 rounded-b-[2rem] shadow-lg relative">
        <h1 className="text-2xl font-heading font-bold mb-2">Shree Anna at your fingertips</h1>
        <p className="text-white/90 text-sm">Direct from farmers to your kitchen.</p>
        
        {/* Quick Search Overlay */}
        <div className="absolute -bottom-6 left-6 right-6 bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
           <span className="text-earthBrown font-medium text-sm">Find Millets</span>
           <button onClick={() => navigate('buyer_marketplace')} className="bg-agriGreen text-white px-4 py-2 rounded-lg text-sm font-bold">Go to Market</button>
        </div>
      </div>

      <div className="mt-12 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-heading font-bold text-earthBrown text-lg">Featured Recipes</h2>
          <button onClick={() => navigate('buyer_recipes')} className="text-accentBlue text-sm font-medium">View All</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {recipes.slice(0, 3).map((r: Recipe) => (
             <div key={r.id} onClick={() => navigate('buyer_recipes')} className="min-w-[200px] bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer">
                <img src={r.imageUrl} alt={r.title} className="w-full h-32 object-cover" />
                <div className="p-3">
                   <h3 className="font-bold text-earthBrown text-sm truncate">{r.title}</h3>
                   <span className="text-xs text-gray-500">{r.cookTimeMinutes} mins</span>
                </div>
             </div>
          ))}
        </div>
      </div>

      <div className="mt-6 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-heading font-bold text-earthBrown text-lg">Fresh from Farm</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((p: Product) => (
              <div key={p.id} className="bg-white rounded-xl shadow-sm p-3 border border-gray-100">
                 <img src={p.imageUrl} alt={p.milletType} className="w-full h-24 object-cover rounded-lg mb-2" />
                 <h3 className="font-bold text-earthBrown text-sm">{p.milletType}</h3>
                 <div className="flex justify-between items-center mt-2">
                    <span className="text-agriGreen font-bold text-sm">₹{p.pricePerKg}/kg</span>
                    <button onClick={() => navigate('buyer_marketplace')} className="bg-softBeige text-earthBrown p-1 rounded hover:bg-milletGold hover:text-white transition">+</button>
                 </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const Marketplace = ({ products, onProductClick }: any) => {
  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-heading font-bold text-earthBrown mb-6">Marketplace</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product: Product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <img src={product.imageUrl} alt={product.milletType} className="w-full h-32 object-cover" />
            <div className="p-3 flex flex-col flex-1">
              <h3 className="font-heading font-bold text-earthBrown">{product.milletType}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.availableQuantity}kg available</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-lg font-bold text-agriGreen">₹{product.pricePerKg}</span>
                <button onClick={() => onProductClick(product)} className="bg-agriGreen text-white text-xs px-3 py-1.5 rounded-lg">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProductDetail = ({ product, addToCart, goBack }: any) => {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="relative">
         <img src={product.imageUrl} className="w-full h-64 object-cover" />
         <button onClick={goBack} className="absolute top-4 left-4 bg-white/80 p-2 rounded-full text-earthBrown shadow">←</button>
      </div>
      <div className="p-6 -mt-6 bg-white rounded-t-[2rem] relative z-10">
        <h1 className="text-3xl font-heading font-bold text-earthBrown mb-2">{product.milletType}</h1>
        <p className="text-2xl font-bold text-agriGreen mb-4">₹{product.pricePerKg} <span className="text-sm text-gray-400 font-normal">/ kg</span></p>
        
        <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
        
        <div className="flex items-center gap-4 mb-8">
           <span className="font-bold text-earthBrown">Quantity (kg):</span>
           <div className="flex items-center border rounded-lg">
             <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-earthBrown">-</button>
             <span className="px-3 font-bold">{qty}</span>
             <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-earthBrown">+</button>
           </div>
        </div>

        <Button onClick={() => addToCart(product, qty)} className="w-full text-lg shadow-lg">Buy Now - ₹{product.pricePerKg * qty}</Button>
      </div>
    </div>
  );
};

export const OrderTracking = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="p-6 pb-24">
       <h1 className="text-2xl font-heading font-bold text-earthBrown mb-6">My Orders</h1>
       <div className="space-y-6">
         {orders.map(order => (
           <div key={order.id} className="bg-white p-5 rounded-xl shadow-md">
              <div className="flex justify-between mb-4">
                 <span className="font-bold text-earthBrown">Order #{order.id.slice(-4)}</span>
                 <span className="font-bold text-agriGreen">₹{order.totalAmount}</span>
              </div>
              
              {/* Simple Stepper */}
              <div className="relative pl-4 border-l-2 border-dashed border-gray-300 space-y-6">
                 {Object.values(OrderStatus).map((status, idx) => {
                   const isCurrent = order.status === status;
                   const isPast = Object.values(OrderStatus).indexOf(order.status) >= idx;
                   return (
                     <div key={status} className="relative">
                        <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${isPast ? 'bg-agriGreen' : 'bg-gray-300'}`}></div>
                        <p className={`text-sm ${isCurrent ? 'font-bold text-earthBrown' : 'text-gray-400'}`}>{status}</p>
                        {isCurrent && <p className="text-xs text-agriGreen mt-1">Estimated: Today</p>}
                     </div>
                   )
                 })}
              </div>
           </div>
         ))}
         {orders.length === 0 && <p className="text-center text-gray-400">No orders placed yet.</p>}
       </div>
    </div>
  );
};

export const RecipesList = ({ recipes, onBuyIngredients, onAddRecipe }: any) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({ title: '', ingredients: [], steps: [] });
  const [ingredientsText, setIngredientsText] = useState('');
  const [stepsText, setStepsText] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRecipe({
      ...newRecipe,
      ingredients: ingredientsText.split('\n'),
      steps: stepsText.split('\n'),
    });
    setShowAddForm(false);
    setNewRecipe({ title: '' });
    setIngredientsText('');
    setStepsText('');
  };

  if (showAddForm) {
    return (
      <div className="p-6 pb-24">
        <h1 className="text-2xl font-heading font-bold text-earthBrown mb-4">Share Your Recipe</h1>
        <form onSubmit={handleAddSubmit} className="space-y-4 bg-white p-5 rounded-xl shadow-sm">
           <VoiceInput label="Recipe Title" value={newRecipe.title || ''} onChange={(v) => setNewRecipe({...newRecipe, title: v})} placeholder="e.g. Millet Porridge" />
           <VoiceInput label="Ingredients (one per line)" value={ingredientsText} onChange={setIngredientsText} multiline placeholder="1 cup millet..." />
           <VoiceInput label="Steps (one per line)" value={stepsText} onChange={setStepsText} multiline placeholder="1. Boil water..." />
           <div className="flex gap-4 mt-6">
             <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">Cancel</Button>
             <Button type="submit" className="flex-1">Post Recipe</Button>
           </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-earthBrown">Recipes</h1>
        <button onClick={() => setShowAddForm(true)} className="bg-accentBlue text-white px-3 py-1.5 rounded-lg text-sm font-medium">
          + Add Yours
        </button>
      </div>

      <div className="space-y-6">
        {recipes.map((r: Recipe) => (
          <div key={r.id} className="bg-white rounded-xl shadow-md overflow-hidden">
             <img src={r.imageUrl} alt={r.title} className="w-full h-48 object-cover" />
             <div className="p-4">
               <div className="flex justify-between items-start">
                  <h3 className="font-heading font-bold text-lg text-earthBrown mb-2">{r.title}</h3>
                  <span className="text-xs bg-softBeige text-earthBrown px-2 py-1 rounded">{r.cookTimeMinutes} min</span>
               </div>
               
               <div className="mb-4">
                 <h4 className="font-bold text-sm text-gray-500 mb-1">Ingredients:</h4>
                 <p className="text-sm text-gray-600 line-clamp-2">{r.ingredients.join(', ')}</p>
               </div>

               <Button onClick={onBuyIngredients} variant="secondary" className="w-full text-sm py-2">Buy Millets for This Recipe</Button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
