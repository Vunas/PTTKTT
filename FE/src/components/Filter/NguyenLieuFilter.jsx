import React from "react";
import { TextField } from "@mui/material";

const NguyenLieuFilter = ({ FilterParams, onFilterParamsChange }) => {
  return (
    <div className="flex flex-wrap justify-center mt-4 gap-4">
      {/* Tên */}
      <TextField
        label="Tên"
        value={FilterParams.ten}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            ten: e.target.value,
          })
        }
        size="small"
        className="w-40"
      />

      {/* Đơn Vị */}
      <TextField
        label="Đơn Vị"
        value={FilterParams.donVi}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            donVi: e.target.value,
          })
        }
        size="small"
        className="w-40"
      />

      {/* Giá Nhập Tối Thiểu */}
      <TextField
        label="Giá Nhập Tối Thiểu"
        type="number"
        value={FilterParams.giaNhapMin}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            giaNhapMin: e.target.value,
          })
        }
        size="small"
        className="w-32"
      />

      {/* Giá Nhập Tối Đa */}
      <TextField
        label="Giá Nhập Tối Đa"
        type="number"
        value={FilterParams.giaNhapMax}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            giaNhapMax: e.target.value,
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

export default NguyenLieuFilter;