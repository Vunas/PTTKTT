import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.default?.pdfMake?.vfs || {};
import dayjs from "dayjs";

const exportPhieuCheBienPDF = (cheBien, selectedProducts, ingredientList) => {
  // 🏭 Thông tin công ty và tiêu đề
  const content = [
    { text: "PHIẾU CHẾ BIẾN", style: "header", alignment: "center" },
    { text: "Cửa Hàng FastFood XYZ", style: "subheader" },
    { text: "123 Đường ABC, Phường DEF, Thành phố GHI" },
    { text: "ĐT: 090xxxxxxx", margin: [0, 0, 0, 10] },
  ];

  // 📝 Thông tin phiếu chế biến
  const phieuCheBienInfo = [
    ["Mã phiếu:", cheBien?.maCheBien || "Không có"],
    ["Ngày chế biến:", dayjs(cheBien?.ngayCheBien).format("DD/MM/YYYY HH:mm") || "Không có"],
    ["Người chế biến:", cheBien?.nguoiCheBien?.maNhanVien || "Không xác định"], // Bạn có thể cần hiển thị tên người chế biến nếu có
  ];

  content.push({
    table: {
      body: phieuCheBienInfo.map(([key, value]) => [
        { text: key, bold: true },
        value,
      ]),
    },
    margin: [0, 10, 0, 10],
  });

  // 🍳 Danh sách sản phẩm chế biến
  const productColumns = ["Tên sản phẩm", "Số lượng"];
  const productRows = selectedProducts.map((product) => [
    product.tenSanPham || "Không xác định",
    product.soLuong || 0,
  ]);

  content.push({
    text: "Danh sách sản phẩm chế biến:",
    style: "subheader",
    margin: [0, 10, 0, 5],
  });

  content.push({
    table: {
      headerRows: 1,
      widths: ["*", "auto"],
      body: [productColumns, ...productRows],
    },
    margin: [0, 0, 0, 10],
  });

  // 🍎 Danh sách nguyên liệu cần
  const ingredientColumns = ["Tên nguyên liệu", "Số lượng cần"];
  const ingredientRows = ingredientList.map((ingredient) => [
    ingredient.ten || "Không xác định",
    ingredient.soLuong || 0,
  ]);

  content.push({
    text: "Danh sách nguyên liệu cần:",
    style: "subheader",
    margin: [0, 10, 0, 5],
  });

  content.push({
    table: {
      headerRows: 1,
      widths: ["*", "auto"],
      body: [ingredientColumns, ...ingredientRows],
    },
    margin: [0, 0, 0, 10],
  });

  // 📄 Định dạng PDF
  const pdfDoc = {
    content,
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 14, bold: true, margin: [0, 5, 0, 5] },
      total: { fontSize: 14, bold: true },
    },
  };

  pdfMake.createPdf(pdfDoc).download(`phieu_che_bien_${cheBien?.maCheBien || dayjs().format("YYYYMMDD_HHmmss")}.pdf`);
};

export default exportPhieuCheBienPDF;