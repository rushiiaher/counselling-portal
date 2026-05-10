'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type UserRole = 'client' | 'counselor' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock authentication - in real app, this would call an API
      const mockUsers: Record<string, User> = {
        'client@example.com': { id: '1', email: 'client@example.com', name: 'John Doe', role: 'client' },
        'counselor@example.com': { id: '2', email: 'counselor@example.com', name: 'Dr. Jane Smith', role: 'counselor' },
        'admin@example.com': { id: '3', email: 'admin@example.com', name: 'Admin User', role: 'admin' },
      }

      if (mockUsers[email] && password === 'password') {
        setUser(mockUsers[email])
      } else {
        throw new Error('Invalid credentials')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Mock signup
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
      }
      setUser(newUser)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
