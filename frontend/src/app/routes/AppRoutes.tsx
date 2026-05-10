import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/app/layouts/MainLayout/MainLayout'
import { ProductListPage } from '@/products/pages/ProductListPage'
import { ProductDetailPage } from '@/products/pages/ProductDetailPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  )
}
