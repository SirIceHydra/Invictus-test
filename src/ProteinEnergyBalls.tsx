import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

const ProteinEnergyBalls = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Section */}
      <nav className="fixed w-full z-50 bg-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/">
            <img src="/assets/Invictus.svg" alt="Invictus Nutrition Logo" className="max-h-8" />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-500 transition-colors mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">PROTEIN ENERGY BALLS</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span>MARCH 5, 2024</span>
            </div>
          </header>

          <img
            src="https://images.unsplash.com/photo-1596723455658-72ebb0d12edd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Protein Energy Balls"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-12"
          />

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                <li>• 1 cup rolled oats</li>
                <li>• 1/2 cup Invictus Whey Protein (vanilla)</li>
                <li>• 1/2 cup natural peanut butter</li>
                <li>• 1/3 cup honey</li>
                <li>• 1/4 cup mini dark chocolate chips</li>
                <li>• 2 tbsp chia seeds</li>
                <li>• 1 tsp vanilla extract</li>
                <li>• Pinch of salt</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4">
                <li>1. Mix oats, protein powder, and chia seeds in a bowl</li>
                <li>2. Add peanut butter, honey, and vanilla extract</li>
                <li>3. Mix well until combined</li>
                <li>4. Fold in chocolate chips</li>
                <li>5. Roll into 1-inch balls</li>
                <li>6. Refrigerate for at least 1 hour</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nutrition Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Calories</h3>
                  <p>120</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Protein</h3>
                  <p>8g</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Carbs</h3>
                  <p>15g</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Fat</h3>
                  <p>6g</p>
                </div>
              </div>
            </section>

            <section className="bg-amber-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Storage Tips</h2>
              <ul className="space-y-2">
                <li>• Store in an airtight container in the refrigerator</li>
                <li>• Will keep fresh for up to 1 week</li>
                <li>• Can be frozen for up to 3 months</li>
                <li>• Perfect for meal prep and on-the-go snacks</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProteinEnergyBalls;