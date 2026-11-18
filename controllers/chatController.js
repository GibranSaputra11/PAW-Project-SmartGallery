const { askAI } = require('../services/ai.service');
const sendResponse = require('../utils/response');

async function chat(req, res) {
  try {
    const { message } = req.body;

    const reply = await askAI(message);

    return sendResponse(res, {
      message: 'Berhasil mendapatkan balasan',
      data: { reply },
    });
  } catch (err) {
    console.error('AI error:', err.message);
    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal menghubungi AI, coba lagi nanti',
    });
  }
}

module.exports = { chat };