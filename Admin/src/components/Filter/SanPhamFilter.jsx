import React from "react";
import { TextField } from "@mui/material";

const SanPhamFilter = ({ FilterParams, onFilterParamsChange }) => {
  return (
    <div className="flex flex-wrap justify-center mt-4 gap-4">
      {/* Tên Sản Phẩm */}
      <TextField
        label="Tên Sản Phẩm"
        value={FilterParams.tenSanPham}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            tenSanPham: e.target.value,
          })
        }
        size="small"
        className="w-40"
      />

      {/* Giá Bán Tối Thiểu */}
      <TextField
        label="Giá Bán Tối Thiểu"
        type="number"
        value={FilterParams.giaBanMin}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            giaBanMin: e.target.value,
          })
        }
        size="small"
        className="w-32"
      />

      {/* Giá Bán Tối Đa */}
      <TextField
        label="Giá Bán Tối Đa"
        type="number"
        value={FilterParams.giaBanMax}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            giaBanMax: e.target.value,
          })
        }
        size="small"
        className="w-32"
      />

      {/* Số Lượng Tối Thiểu */}
      <TextField
        label="Số Lượng Tối Thiểu"
        type="number"
        value={FilterParams.soLuongMin}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            soLuongMin: e.target.value,
          })
        }
        size="small"
        className="w-32"
      />

      {/* Số Lượng Tối Đa */}
      <TextField
        label="Số Lượng Tối Đa"
        type="number"
        value={FilterParams.soLuongMax}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            soLuongMax: e.target.value,
          })
        }
        size="small"
        className="w-32"
      />
    </div>
  );
};

export default SanPhamFilter;
