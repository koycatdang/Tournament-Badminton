#!/usr/bin/env python3
from PIL import Image
import os

def crop_to_ratio(input_path, output_path, target_ratio_width, target_ratio_height):
    """
    Crop hình ảnh theo tỉ lệ mong muốn (width:height)
    """
    # Mở hình ảnh
    img = Image.open(input_path)
    original_width, original_height = img.size
    
    print(f"Kích thước gốc: {original_width}x{original_height}")
    
    # Tính tỉ lệ mục tiêu
    target_ratio = target_ratio_width / target_ratio_height
    current_ratio = original_width / original_height
    
    print(f"Tỉ lệ hiện tại: {current_ratio:.3f}")
    print(f"Tỉ lệ mục tiêu: {target_ratio:.3f}")
    
    if current_ratio > target_ratio:
        # Hình rộng hơn mục tiêu, cần crop width
        new_width = int(original_height * target_ratio)
        new_height = original_height
        left = (original_width - new_width) // 2
        top = 0
        right = left + new_width
        bottom = new_height
    else:
        # Hình cao hơn mục tiêu, cần crop height
        new_width = original_width
        new_height = int(original_width / target_ratio)
        left = 0
        top = (original_height - new_height) // 2
        right = new_width
        bottom = top + new_height
    
    print(f"Kích thước sau crop: {new_width}x{new_height}")
    print(f"Vùng crop: ({left}, {top}, {right}, {bottom})")
    
    # Crop hình ảnh
    cropped_img = img.crop((left, top, right, bottom))
    
    # Lưu hình ảnh đã crop
    cropped_img.save(output_path, quality=95)
    print(f"Đã lưu hình ảnh đã crop tại: {output_path}")
    
    return cropped_img

if __name__ == "__main__":
    input_file = "images/hanh.jpg"
    output_file = "images/hanh_cropped_3x4.jpg"
    
    if os.path.exists(input_file):
        crop_to_ratio(input_file, output_file, 3, 4)
        print("Hoàn thành crop hình ảnh theo tỉ lệ 3:4!")
    else:
        print(f"Không tìm thấy file: {input_file}") 