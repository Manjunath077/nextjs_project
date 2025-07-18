'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Master <span className="text-purple-400">Chess</span> Like Never Before
              </h1>
              <p className="text-lg text-gray-300 max-w-lg">
                Join thousands of players improving their game daily with our interactive chess platform. Play, learn, and compete in tournaments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg">
                  <Link href="/sign-in">Play Now</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Interactive Chess Board */}
              <div className="aspect-square max-w-md mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                  {Array(64).fill(0).map((_, i) => {
                    const row = Math.floor(i / 8);
                    const col = i % 8;
                    const isDark = (row + col) % 2 === 1;

                    // Determine if this square should have a piece
                    let piece = null;

                    // Black pieces (top rows)
                    if (row === 0) {
                      const pieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
                      piece = pieces[col];
                    } else if (row === 1) {
                      piece = '♟'; // Black pawns
                    }

                    // White pieces (bottom rows)
                    if (row === 6) {
                      piece = '♙'; // White pawns
                    } else if (row === 7) {
                      const pieces = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
                      piece = pieces[col];
                    }

                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-center ${isDark ? 'bg-purple-900' : 'bg-gray-700'} hover:bg-opacity-80 transition-all cursor-pointer`}
                        onClick={() => console.log(`Clicked square ${String.fromCharCode(97 + col)}${8 - row}`)}
                      >
                        {piece && (
                          <div className={`text-3xl ${row < 4 ? 'text-gray-900' : 'text-white'}`}>
                            {piece}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Why Choose <span className="text-purple-400">Chess GameZone</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Interactive Lessons",
                description: "Learn from grandmaster-curated lessons with instant feedback",
                icon: "📚"
              },
              {
                title: "AI Opponents",
                description: "Play against AI at any skill level from beginner to master",
                icon: "🤖"
              },
              {
                title: "Live Tournaments",
                description: "Compete in daily tournaments with cash prizes",
                icon: "🏆"
              },
              {
                title: "Puzzle Training",
                description: "Solve thousands of chess puzzles to sharpen your tactics",
                icon: "🧩"
              },
              {
                title: "Community",
                description: "Join a thriving community of chess enthusiasts",
                icon: "👥"
              },
              {
                title: "Analysis Tools",
                description: "Get detailed analysis of your games with engine evaluation",
                icon: "📊"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg hover:bg-gray-850 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Active Players" },
              { number: "500+", label: "Daily Games" },
              { number: "100+", label: "Tournaments" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">{stat.number}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Elevate Your <span className="text-purple-400">Chess Game</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join now and get access to all our premium features for free during your first month.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700 px-10 py-7 text-lg">
            <Link href="/signup">Start Playing - It's Free</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Page