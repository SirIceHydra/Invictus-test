import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

const ProteinPancakes = () => {
  // Scroll restoration is now handled globally by ScrollRestoration component

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">PROTEIN PANCAKES RECIPE</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span>MARCH 15, 2024</span>
            </div>
          </header>

          <img
            src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80"
            alt="Protein Pancakes"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-12"
          />

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                <li>• 1 scoop (30g) Invictus Vanilla Whey Protein</li>
                <li>• 1 cup oat flour</li>
                <li>• 1 ripe banana</li>
                <li>• 2 whole eggs</li>
                <li>• 1/4 cup Greek yogurt</li>
                <li>• 1/2 cup almond milk</li>
                <li>• 1 tsp baking powder</li>
                <li>• 1 tsp vanilla extract</li>
                <li>• Pinch of salt</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4">
                <li>1. In a blender, combine banana, eggs, Greek yogurt, and almond milk. Blend until smooth.</li>
                <li>2. In a large bowl, mix oat flour, protein powder, baking powder, and salt.</li>
                <li>3. Pour wet ingredients into dry ingredients and mix until just combined.</li>
                <li>4. Heat a non-stick pan over medium heat.</li>
                <li>5. Pour 1/4 cup batter for each pancake. Cook until bubbles form, then flip.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nutrition Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Calories</h3>
                  <p>320</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Protein</h3>
                  <p>30g</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Carbs</h3>
                  <p>35g</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Fat</h3>
                  <p>12g</p>
                </div>
              </div>
            </section>

            <section className="bg-amber-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Pro Tips</h2>
              <ul className="space-y-2">
                <li>• Don't overmix the batter - some lumps are okay!</li>
                <li>• Let the batter rest for 5 minutes before cooking</li>
                <li>• Keep pancakes warm in a low-temperature oven while cooking the rest</li>
                <li>• Top with fresh berries and sugar-free syrup for extra flavor</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProteinPancakes;