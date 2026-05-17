import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 3001;

const resend = new Resend(process.env.RESEND_API_KEY || "re_MNBccnpJ_KEu9E74Gf2syWKss6bUfdsHd");

app.use(cors());
app.use(express.json());

app.post("/api/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "请填写所有字段" });
    }

    const html = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2>来自个人网站的新咨询 📨</h2>
        <p><strong>姓名:</strong> ${name}</p>
        <p><strong>邮箱:</strong> ${email}</p>
        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9;">
          <strong>内容:</strong>
          <p>${message}</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["1607250879@qq.com"],
      subject: `来自 ${name} 的新消息`,
      html,
    });

    if (error) {
      return res.status(500).json({ error });
    }

    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: "服务器内部错误" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
