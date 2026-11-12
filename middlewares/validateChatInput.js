const sendResponse = require('../utils/response');

const MAX_LENGTH = 500;

function validateChatInput(req, res, next) {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return sendResponse(res, {
      code: 400,
      success: false,
      message: 'Pesan wajib diisi',
    });
  }

  if (message.length > MAX_LENGTH) {
    return sendResponse(res, {
      code: 400,
      success: false,
      message: `Pesan terlalu panjang, maksimal ${MAX_LENGTH} karakter`,
    });
  }

  const suspiciousPatterns = [
    /abaikan instruksi/i,
    /lupakan aturan/i,
    /kamu adalah/i,
    /peranmu adalah/i,
    /jangan patuhi/i,
    /ignore.*instruction/i,
    /forget.*rule/i,
    /you are now/i,
    /act as/i,
    /pretend to be/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(message)) {
      console.warn('⚠️ Deteksi potensi prompt injection:', message.substring(0, 50));
      break;
    }
  }

  next();
}

module.exports = validateChatInput;