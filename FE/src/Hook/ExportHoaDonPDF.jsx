import dayjs from "dayjs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.default?.pdfMake?.vfs || {};

const exportHoaDonPDF = (donHang, hoaDon, chiTietDonHang, KhuyenMaiList, tongTien) => {
  // 🏪 Thông tin công ty và tiêu đề
  const content = [
    { text: "HÓA ĐƠN BÁN HÀNG", style: "header", alignment: "center" },
    { text: "Cửa Hàng FastFood XYZ", style: "subheader" },
    { text: "123 Đường ABC, Phường DEF, Thành phố GHI" },
    { text: "ĐT: 090xxxxxxx", margin: [0, 0, 0, 10] },
  ];

  // 👤 Thông tin khách hàng
  const customerInfo = [
    ["Khách hàng:", donHang.maKhachHang? donHang.maKhachHang : ""],
    ["Địa chỉ:", donHang.diaChiGiaoHang || "nhận tại quầy"],
    ["Ngày đặt:", dayjs(donHang.ngayDat).format("DD/MM/YYYY HH:mm")],
    ["Ngày xuất HĐ:", dayjs(hoaDon.ngayXuatHoaDon).format("DD/MM/YYYY HH:mm")],
    ["Mã đơn hàng:", donHang.maDonHang],
  ];

  content.push({
    table: {
      body: customerInfo.map(([key, value]) => [
        { text: key, bold: true },
        value,
      ]),
    },
    margin: [0, 10, 0, 10],
  });

  // 🛒 Danh sách sản phẩm
  const productColumns = ["Tên sản phẩm", "Số lượng", "Đơn giá", "Thành tiền"];

  // Sử dụng chiTietDonHang để tạo productRows
  const productRows = chiTietDonHang.map((item) => [
    item.sanPham?.tenSanPham || "Không xác định", // Tên sản phẩm
    item.soLuong || 0, // Số lượng
    `${item.donGia.toLocaleString()} VND`, // Đơn giá
    `${item.thanhTien.toLocaleString()} VND`, // Thành tiền
  ]);

  content.push({
    table: {
      headerRows: 1,
      widths: ["*", "auto", "auto", "auto"],
      body: [productColumns, ...productRows],
    },
    margin: [0, 10, 0, 10],
  });

  // 💰 Tổng tiền
  content.push({
    text: "Tổng tiền:" + donHang.tongGia,
    style: "total",
    alignment: "right",
    margin: [0, 10, 0, 0],
  });
  const khuyenMai = KhuyenMaiList.find(
    (km) => km.maKhuyenMai === hoaDon.maKhuyenMai
  ) || { tenKhuyenMai: "Không có khuyến mãi" };

  if (hoaDon.maKhuyenMai) {
    content.push({
      text: `Mã giảm giá: ${hoaDon.maKhuyenMai || ""} Tên: ${khuyenMai.tenKhuyenMai}`,
      style: "total",
      alignment: "right",
      margin: [0, 10, 0, 0],
    });
  }

  content.push({
    text: "Tổng thanh toán:" + tongTien,
    style: "total",
    alignment: "right",
    margin: [0, 10, 0, 0],
  });

  // 📥 Xuất file PDF
  const pdfDoc = {
    content,
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 12, bold: true, margin: [0, 5, 0, 5] },
      total: { fontSize: 14, bold: true },
    },
  };

  pdfMake.createPdf(pdfDoc).download("hoa_don_mau.pdf");
};

export default exportHoaDonPDF;
