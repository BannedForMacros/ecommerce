'use client'
import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react'
import type { Product } from '@/components/sections/ProductSection'

export interface CartItem extends Product {
  qty: number
}

interface CartCtx {
  items: CartItem[]
  totalQty: number
  totalPrice: number
  add: (p: Product, qty?: number) => void
  changeQty: (id: CartItem['id'], qty: number) => void
  remove: (id: CartItem['id']) => void
  clear: () => void
  /* sidebar */
  isOpen: boolean
  open: () => void
  close: () => void
}

const Ctx = createContext<CartCtx | undefined>(undefined)
export const useCart = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be inside <CartProvider>')
  return c
}

export function CartProvider ({ children }: { children: ReactNode }) {
  const [items, setItems]       = useState<CartItem[]>([])
  const [isOpen, setIsOpen]     = useState(false)

  const add = (p: Product, qty = 1) =>
    setItems(prev => {
      const i = prev.find(x => x.id === p.id)
      if (i) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + qty } : x)
      return [...prev, { ...p, qty }]
    })

  const changeQty = (id: CartItem['id'], qty: number) =>
    setItems(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(1, qty) } : x))

  const remove = (id: CartItem['id']) =>
    setItems(prev => prev.filter(x => x.id !== id))

  const clear  = () => setItems([])

  const totalQty   = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])
  const totalPrice = useMemo(() => items.reduce((s, i) => s + i.qty * i.price, 0), [items])

  const value: CartCtx = {
    items, totalQty, totalPrice,
    add, changeQty, remove, clear,
    isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false),
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
