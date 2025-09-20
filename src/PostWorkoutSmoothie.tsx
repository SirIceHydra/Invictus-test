import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

const PostWorkoutSmoothie = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">POST-WORKOUT SMOOTHIE</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span>MARCH 10, 2024</span>
            </div>
          </header>

          <img
            src="https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80"
            alt="Post-Workout Smoothie"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-12"
          />

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                <li>• 1 scoop (30g) Invictus Whey Protein</li>
                <li>• 1 banana (frozen for thickness)</li>
                <li>• 1 cup mixed berries</li>
                <li>• 1 cup spinach</li>
                <li>• 1 tbsp chia seeds</li>
                <li>• 1 cup almond milk</li>
                <li>• 1/2 cup Greek yogurt</li>
                <li>• Ice cubes (optional)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4">
                <li>1. Add almond milk to blender first</li>
                <li>2. Add protein powder, frozen banana, and berries</li>
                <li>3. Add spinach, chia seeds, and Greek yogurt</li>
                <li>4. Blend until smooth (add ice if desired)</li>
                <li>5. Serve immediately for best results</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nutrition Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Calories</h3>
                  <p>350</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Protein</h3>
                  <p>35g</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Carbs</h3>
                  <p>45g</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <h3 className="font-bold text-rose-400">Fat</h3>
                  <p>8g</p>
                </div>
              </div>
            </section>

            <section className="bg-amber-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Benefits</h2>
              <ul className="space-y-2">
                <li>• Quick protein absorption for muscle recovery</li>
                <li>• Antioxidants from berries</li>
                <li>• Healthy fats from chia seeds</li>
                <li>• Natural electrolytes and potassium</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostWorkoutSmoothie;