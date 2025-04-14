import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideBarQLK from '../components/SideBarQLK'
import NhapKho from '../pages/warehouse/NhapKho'
import KhoHang from '../pages/admin/KhoHang'

const WarehouseRoutes = () => {
  return (
  <div className='flex'>
    {/* Sidebar */}
    <SideBarQLK />

    {/* Nội dung chính */}
    <div className='flex-1 p-4'>
      <Routes>
        {/* <Route path="khohang" element={ />} /> */}
        <Route path="nhacungcap" element={<KhoHang />} />
        {/* <Route path="sanpham" element={<NhaCungCap />} /> */}
        {/* <Route path="nguyenlieu" element={<SanPham />} /> */}
        <Route path="nhapkho" element={<NhapKho />} />
        {/* <Route path="xuatkho" element={<NhanVien />} /> */}
      </Routes>
    </div>
  </div>
  )
}

export default WarehouseRoutes