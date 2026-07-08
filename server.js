const PORT = 3000;
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// خدمة الملفات الثابتة (واجهة المستخدم)
app.use(express.static('public'));

// عند اتصال مستخدم جديد
io.on('connection', (socket) => {
    console.log('✅ مستخدم جديد متصل');

    // استقبال رسالة من المستخدم
    socket.on('sendMessage', (data) => {
        // إرسال الرسالة إلى جميع المستخدمين
        io.emit('receiveMessage', {
            user: data.user || 'مجهول',
            message: data.message,
            time: new Date().toLocaleTimeString()
        });
    });

    // عند انقطاع الاتصال
    socket.on('disconnect', () => {
        console.log('❌ مستخدم غير متصل');
    });
});

// تشغيل الخادم على المنفذ 3000
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 الخادم يعمل على http://0.0.0.0:${PORT}`);
});
