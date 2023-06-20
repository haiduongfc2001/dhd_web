const convertMovieTitle = (title) => {
    return title
        .toLowerCase() // Chuyển đổi thành chữ thường
        .replace(/[^a-z0-9\s]/g, '') // Loại bỏ các ký tự không phải chữ cái, số và khoảng trắng
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
}

export default convertMovieTitle;
