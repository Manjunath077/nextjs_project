'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <svg
                                className="h-8 w-8 text-purple-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                />
                            </svg>
                            <span className="ml-2 text-2xl font-bold">GameZone</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your ultimate gaming destination. Play, compete, and connect with gamers worldwide.
                        </p>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Newsletter</h3>
                        <p className="text-gray-400 text-sm">
                            Subscribe to get updates on new games and tournaments.
                        </p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} GameZone. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer