import React from 'react';

export function EmailTemplate({
    name,
    email,
    message,
}) {
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px', border: '1px solid #eee' }}>
            <h2>来自个人网站的新咨询 📨</h2>
            <p><strong>姓名:</strong> {name}</p>
            <p><strong>邮箱:</strong> {email}</p>
            <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9' }}>
                <strong>内容:</strong>
                <p>{message}</p>
            </div>
        </div>
    );
}
