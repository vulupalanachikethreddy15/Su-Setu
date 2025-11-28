import React, { useState, useEffect } from 'react';
import { User, UserRole, Submission, Product, Order, Recipe, Payment, OrderStatus, SubmissionStatus } from './types';
import { MOCK_USERS, MOCK_PRODUCTS, MOCK_RECIPES, MOCK_SUBMISSIONS, MOCK_PAYMENTS } from './constants';
import { Button, Input, BottomNav } from './components/Shared';
import { FarmerDashboard, AddMillet, SubmissionsList, PaymentHistory } from './components/FarmerModule';
import { BuyerHome, Marketplace, ProductDetail, OrderTracking, RecipesList } from './components/BuyerModule';

// --- Auth Component ---
const AuthScreen = ({ onLogin, onSignup }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('farmer@susetu.com');
  const [password, setPassword] = useState('pass');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.FARMER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password, role);
    }
  };

  return (
    <div className="min-h-screen bg-milletGold flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-4 rounded-full shadow-xl mb-6 w-24 h-24 flex items-center justify-center text-4xl">
        🌾
      </div>
      <h1 className="text-3xl font-heading font-bold text-white mb-2">Su-Setu <span className="font-devanagari font-normal">(粟सेतु)</span></h1>
      <p className="text-white/90 font-medium mb-8">Connecting Millets to the World.</p>

      <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-bold text-earthBrown mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && <Input placeholder="Full Name" value={name} onChange={(e:any) => setName(e.target.value)} required />}
          <Input placeholder="Email" type="email" value={email} onChange={(e:any) => setEmail(e.target.value)} required />
          <Input placeholder="Password" type="password" value={password} onChange={(e:any) => setPassword(e.target.value)} required />
          
          {!isLogin && (
            <div className="flex gap-4 mb-4">
               <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center ${role === UserRole.FARMER ? 'bg-softBeige border-milletGold text-earthBrown font-bold' : 'border-gray-200 text-gray-500'}`}>
                 <input type="radio" className="hidden" name="role" checked={role === UserRole.FARMER} onChange={() => setRole(UserRole.FARMER)} />
                 Farmer
               </label>
               <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center ${role === UserRole.BUYER ? 'bg-softBeige border-milletGold text-earthBrown font-bold' : 'border-gray-200 text-gray-500'}`}>
                 <input type="radio" className="hidden" name="role" checked={role === UserRole.BUYER} onChange={() => setRole(UserRole.BUYER)} />
                 Buyer
               </label>
            </div>
          )}

          <Button type="submit" className="w-full">{isLogin ? 'Login' : 'Sign Up'}</Button>
        </form>
        <div className="mt-4 text-sm text-gray-500">
          {isLogin ? "New to Su-Setu? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-agriGreen font-bold underline">
            {isLogin ? 'Create Account' : 'Login'}
          </button>
        </div>
        {isLogin && <div className="mt-4 text-xs text-gray-400">Demo: farmer@susetu.com / buyer@susetu.com (pw: pass)</div>}
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [screen, setScreen] = useState('splash');
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  
  // Navigation State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Splash Effect
  useEffect(() => {
    const timer = setTimeout(() => setScreen('auth'), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (email: string, pass: string) => {
    const user = MOCK_USERS.find(u => u.email === email && u.password_hash === pass);
    if (user) {
      setCurrentUser(user);
      setScreen(user.role === UserRole.FARMER ? 'farmer_dashboard' : 'buyer_home');
    } else {
      alert("Invalid credentials. Try demo accounts.");
    }
  };

  const handleSignup = (name: string, email: string, pass: string, role: UserRole) => {
    const newUser: User = { id: `u_${Date.now()}`, name, email, role, password_hash: pass };
    MOCK_USERS.push(newUser);
    setCurrentUser(newUser);
    setScreen(role === UserRole.FARMER ? 'farmer_dashboard' : 'buyer_home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen('auth');
  };

  const handleAddSubmission = (sub: Submission) => {
    setSubmissions([sub, ...submissions]);
    
    // Simulate auto-approval for demo after 5 seconds
    setTimeout(() => {
       const approvedSub = { ...sub, status: SubmissionStatus.APPROVED, approvedAt: Date.now() };
       setSubmissions(prev => prev.map(s => s.id === sub.id ? approvedSub : s));
       
       // Create Product
       const newProduct: Product = {
         id: `prod_${Date.now()}`,
         sourceSubmissionId: sub.id,
         milletType: sub.milletType,
         pricePerKg: sub.marketPricePerKg + 2, // Margin
         availableQuantity: sub.quantity,
         imageUrl: sub.photoUrl,
         description: `Freshly harvested ${sub.milletType}.`,
       };
       setProducts(prev => [newProduct, ...prev]);

    }, 8000);
  };

  const handleAddToCart = (product: Product, qty: number) => {
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      buyerId: currentUser?.id || '',
      items: [{ productId: product.id, qtyKg: qty }],
      totalAmount: product.pricePerKg * qty,
      status: OrderStatus.PICKUP_SCHEDULED,
      createdAt: Date.now(),
    };
    setOrders([newOrder, ...orders]);
    alert("Order Placed Successfully!");
    setScreen('buyer_home'); // Reset to home for simplicity
    
    // Simulate Status Updates
    setTimeout(() => {
        setOrders(prev => prev.map(o => o.id === newOrder.id ? {...o, status: OrderStatus.IN_TRANSIT} : o));
    }, 5000);
  };

  const handleAddRecipe = (r: Partial<Recipe>) => {
    const newR: Recipe = {
      id: `r_${Date.now()}`,
      title: r.title!,
      ingredients: r.ingredients || [],
      steps: r.steps || [],
      imageUrl: 'https://picsum.photos/400/300?random=100',
      cookTimeMinutes: 30,
      createdBy: currentUser?.id
    };
    setRecipes([newR, ...recipes]);
  };

  // --- Render Routing ---
  
  if (screen === 'splash') {
    return (
      <div className="min-h-screen bg-milletGold flex flex-col items-center justify-center">
        <div className="text-6xl mb-4 animate-bounce">🌾</div>
        <h1 className="text-4xl font-heading font-bold text-white tracking-wide">Su-Setu</h1>
        <p className="text-white mt-2 font-devanagari">粟सेतु</p>
        <div className="mt-8 w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (screen === 'auth') {
    return <AuthScreen onLogin={handleLogin} onSignup={handleSignup} />;
  }

  // Wrappers for Layouts
  const isFarmer = currentUser?.role === UserRole.FARMER;

  const renderContent = () => {
    switch (screen) {
      // Farmer Routes
      case 'farmer_dashboard': return <FarmerDashboard user={currentUser} navigate={setScreen} submissions={submissions} payments={payments} />;
      case 'farmer_add': return <AddMillet user={currentUser} navigate={setScreen} addSubmission={handleAddSubmission} />;
      case 'farmer_submissions': return <SubmissionsList submissions={submissions} />;
      case 'farmer_payments': return <PaymentHistory payments={payments} />;
      
      // Buyer Routes
      case 'buyer_home': return <BuyerHome navigate={setScreen} products={products} recipes={recipes} />;
      case 'buyer_marketplace': return <Marketplace products={products} onProductClick={(p: Product) => { setSelectedProduct(p); setScreen('product_detail'); }} />;
      case 'product_detail': return <ProductDetail product={selectedProduct} goBack={() => setScreen('buyer_marketplace')} addToCart={handleAddToCart} />;
      case 'buyer_recipes': return <RecipesList recipes={recipes} onBuyIngredients={() => setScreen('buyer_marketplace')} onAddRecipe={handleAddRecipe} />;
      // Shared Profile (Using Order Tracking for Buyer Profile for demo simplicity)
      case 'profile': 
        if (!isFarmer) return <OrderTracking orders={orders} />;
        return (
           <div className="p-6">
             <h1 className="text-2xl font-bold mb-4">Profile</h1>
             <div className="bg-white p-6 rounded-xl shadow-md">
                <p><strong>Name:</strong> {currentUser?.name}</p>
                <p><strong>Email:</strong> {currentUser?.email}</p>
                <Button onClick={handleLogout} className="mt-6 bg-red-500 w-full text-white">Logout</Button>
             </div>
           </div>
        );
        
      default: return <div>Screen not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-softBeige font-sans text-earthBrown">
      {renderContent()}
      <BottomNav role={currentUser?.role!} currentScreen={screen} navigate={setScreen} />
    </div>
  );
}
