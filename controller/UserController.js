const express = require("express");
const jwt = require("jsonwebtoken");
// const passport = require("passport");
const UserChema = require("../models/User");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
    const { username, password, role } = req.body;
    // const hash = bcrypt.hashSync(password,10);
    try {
        // Kiểm tra user có tồn tại không
        console.log({ username,password});

        const result = await UserChema.find({ username: username });

        // console.log(result);

        if (!result || result.length == 0) {
        const result = await UserChema.create({ username: username, password: password});
            return res.json({
                mes: 'Đăng ký thành công'
                
            });
        }

        return res.json({
            mes: 'Đã có tài khoản'
        });
        // Thực hiện các công việc khác liên quan đến tìm thấy user ở đây
    } catch (error) {
        console.error("Lỗi khi tìm kiếm user:", error);
        // Xử lý lỗi ở đây
    }
};

const login = async (req, res) => {
    const { username, password } = req.body; // Lấy tên người dùng và mật khẩu từ yêu cầu HTTP body

    try {
        // Tìm một người dùng với username tương ứng trong cơ sở dữ liệu
        const user = await UserChema.findOne({ username : username ,password : password });

        if (!user) {
            return res.status(404).json({ mes: "Đăng nhập không thành công"}); // Nếu không tìm thấy người dùng, trả về mã trạng thái 404
            
       
        }
        return res.json({
            mes: "Đăng nhập thành công",
            usename: username,
            id: user._id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred"); // Xử lý lỗi và trả về mã trạng thái 500 nếu có lỗi xảy ra
    }
}
module.exports = {getUser,login}; 